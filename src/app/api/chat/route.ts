import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { ChatRequest, Message, Model, Tool } from '@/types/chat';

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { messages, model, tools, stream = false } = body;

    if (model.provider === 'openai') {
      return await handleOpenAIRequest(messages, model, tools, stream);
    } else if (model.provider === 'anthropic') {
      return await handleAnthropicRequest(messages, model, tools);
    }

    return NextResponse.json(
      { error: 'Unsupported model provider' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleOpenAIRequest(
  messages: Message[],
  model: Model,
  tools: Tool[],
  stream: boolean = false
) {
  try {
    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Convert messages to Responses API format
    const responseInput = messages.map(msg => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    // Check if web search is enabled
    const webSearchEnabled = tools.some(
      tool => tool.name === 'web_search' && tool.enabled
    );

    // Prepare tools array for Responses API
    const responseTools = webSearchEnabled
      ? [{ type: 'web_search_preview' as const }]
      : [];

    // Configure request parameters
    const requestConfig: any = {
      model: model.name,
      input: responseInput,
      max_output_tokens: 4000,
      stream,
    };

    if (responseTools.length > 0) {
      requestConfig.tools = responseTools;
    }

    // Add GPT-5 specific parameters
    if (model.name.startsWith('gpt-5')) {
      Object.assign(requestConfig, {
        reasoning: {
          effort: 'medium',
        },
      });
    }

    if (stream) {
      // Handle streaming response
      const stream = await (openai as OpenAI).responses.stream(requestConfig);

      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const event of stream) {
              if (event.type === 'response.output_text.delta') {
                const chunk = `data: ${JSON.stringify({ content: event.delta })}\n\n`;
                controller.enqueue(encoder.encode(chunk));
              } else if (event.type === 'response.completed') {
                const chunk = `data: ${JSON.stringify({ done: true })}\n\n`;
                controller.enqueue(encoder.encode(chunk));
                controller.close();
                break;
              } else if (event.type === 'error') {
                const chunk = `data: ${JSON.stringify({ error: (event as any).error })}\n\n`;
                controller.enqueue(encoder.encode(chunk));
                controller.close();
                break;
              }
            }
          } catch {
            const chunk = `data: ${JSON.stringify({ error: 'Stream error' })}\n\n`;
            controller.enqueue(encoder.encode(chunk));
            controller.close();
          }
        },
      });

      return new NextResponse(readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    // Non-streaming response
    const response = await (openai as OpenAI).responses.create(requestConfig);

    // Extract content using the recommended approach
    const content = (response as any).output_text || 'No response';

    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content,
      timestamp: new Date(),
    };

    return NextResponse.json({ message: assistantMessage });
  } catch (error: unknown) {
    console.error('OpenAI API error:', error);

    let errorMessage = 'OpenAI API error';
    let statusCode = 500;

    if (error && typeof error === 'object') {
      // Handle OpenAI SDK specific errors
      if ('status' in error) {
        statusCode = error.status as number;
        if (statusCode === 401) {
          errorMessage = 'Invalid OpenAI API key';
        } else if (statusCode === 429) {
          errorMessage =
            'OpenAI API rate limit exceeded. Please try again later.';
        } else if (statusCode === 500) {
          errorMessage = 'OpenAI API server error. Please try again.';
        }
      }

      // Extract error message
      if (
        'error' in error &&
        error.error &&
        typeof error.error === 'object' &&
        'message' in error.error
      ) {
        errorMessage = String(error.error.message);
      } else if ('message' in error) {
        errorMessage = String(error.message);
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

async function handleAnthropicRequest(
  messages: Message[],
  model: Model,
  _tools: Tool[]
) {
  try {
    if (!anthropic) {
      return NextResponse.json(
        { error: 'Anthropic API key not configured' },
        { status: 500 }
      );
    }

    const anthropicMessages = messages
      .filter(msg => msg.role === 'user' || msg.role === 'assistant')
      .map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

    const response = await anthropic.messages.create({
      model: model.name,
      max_tokens: 4000,
      messages: anthropicMessages,
    });

    const content = response.content[0];
    const responseText = content.type === 'text' ? content.text : 'No response';

    const assistantMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date(),
    };

    return NextResponse.json({ message: assistantMessage });
  } catch (error: unknown) {
    console.error('Anthropic API error:', error);

    let errorMessage = 'Anthropic API error';
    if (error && typeof error === 'object') {
      if (
        'error' in error &&
        error.error &&
        typeof error.error === 'object' &&
        'message' in error.error
      ) {
        errorMessage = String(error.error.message);
      } else if ('message' in error) {
        errorMessage = String(error.message);
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
