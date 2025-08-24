'use client';

import { useState, useRef, useEffect } from 'react';
import { Message, Model, Tool, ChatRequest } from '@/types/chat';

interface ChatProps {
  selectedModel: Model;
  enabledTools: Tool[];
  onClearChat?: () => void;
}

export default function Chat({
  selectedModel,
  enabledTools,
  onClearChat: _onClearChat,
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Prepare assistant message ID for streaming
    const assistantMessageId = Date.now().toString() + '_assistant';

    try {
      const chatRequest: ChatRequest = {
        messages: [...messages, userMessage],
        model: selectedModel,
        tools: enabledTools.filter(tool => tool.enabled),
        stream: selectedModel.provider === 'openai', // Only stream for OpenAI
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chatRequest),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (
        chatRequest.stream &&
        response.headers.get('content-type')?.includes('text/event-stream')
      ) {
        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('Failed to get response reader');
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));

                if (data.error) {
                  throw new Error(data.error);
                }

                if (data.content) {
                  // Hide loading indicator once streaming starts
                  setIsLoading(false);

                  // Create or update the assistant message
                  setMessages(prev => {
                    const existingMessage = prev.find(
                      msg => msg.id === assistantMessageId
                    );
                    if (existingMessage) {
                      // Update existing message
                      return prev.map(msg =>
                        msg.id === assistantMessageId
                          ? { ...msg, content: msg.content + data.content }
                          : msg
                      );
                    } else {
                      // Create new assistant message
                      const assistantMessage: Message = {
                        id: assistantMessageId,
                        role: 'assistant',
                        content: data.content,
                        timestamp: new Date(),
                      };
                      return [...prev, assistantMessage];
                    }
                  });
                }

                if (data.done) {
                  break;
                }
              } catch (parseError) {
                // Ignore parse errors for partial chunks
                console.warn('Failed to parse streaming chunk:', parseError);
              }
            }
          }
        }
      } else {
        // Handle non-streaming response
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        // Replace the placeholder message with the actual response
        setMessages(prev =>
          prev.map(msg => (msg.id === assistantMessageId ? data.message : msg))
        );
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
        timestamp: new Date(),
      };

      // Replace the placeholder message with error message
      setMessages(prev =>
        prev.map(msg => (msg.id === assistantMessageId ? errorMessage : msg))
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] px-3 py-1 sm:px-4 sm:py-2 rounded-xl shadow-sm ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-md'
                  : 'bg-muted text-foreground rounded-bl-md border border-border'
              }`}
            >
              <div className="whitespace-pre-wrap break-words leading-relaxed">
                {message.content}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[75%] px-4 py-2 sm:px-4 sm:py-2 rounded-xl rounded-bl-md bg-muted border border-border shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-border p-4 sm:p-6">
        <div className="flex space-x-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="textarea flex-1 min-h-[44px] max-h-32 overflow-hidden text-base sm:text-sm"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="btn btn-primary px-4 sm:px-6 shrink-0 min-w-[44px] min-h-[44px]"
            aria-label="Send message"
          >
            <svg
              className="w-5 h-5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
