'use client';

import { useState } from 'react';
import Chat from '@/components/Chat';
import ModelSelector from '@/components/ModelSelector';
import ToolSelector from '@/components/ToolSelector';
import ThemeToggle from '@/components/ThemeToggle';
import { Model, Tool, AVAILABLE_MODELS, AVAILABLE_TOOLS } from '@/types/chat';

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<Model>(
    AVAILABLE_MODELS[0]
  );
  const [tools, setTools] = useState<Tool[]>(AVAILABLE_TOOLS);
  const [chatKey, setChatKey] = useState<number>(0);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const handleModelChange = (model: Model) => {
    setSelectedModel(model);

    // Disable web search if switching away from OpenAI
    if (model.provider !== 'openai') {
      setTools(prevTools =>
        prevTools.map(tool =>
          tool.name === 'web_search' ? { ...tool, enabled: false } : tool
        )
      );
    }
  };

  const handleNewChat = () => {
    setChatKey(prev => prev + 1);
  };

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
        <header className="mb-4 sm:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleSettings}
              className="btn btn-ghost btn-sm xl:hidden min-w-[40px] min-h-[40px] p-2"
              title="Toggle settings"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                Chat
              </h1>
              <p className="text-muted-foreground text-sm hidden sm:block">
                Chat with different AI models and use various tools
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleNewChat}
              className="btn btn-outline btn-sm min-w-[40px] min-h-[40px] px-2 sm:px-3"
              title="Start a new conversation"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="hidden sm:inline">New Chat</span>
            </button>
            <ThemeToggle />
          </div>
        </header>

        {/* Mobile Settings Overlay */}
        {showSettings && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 xl:hidden">
            <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-background border-r border-border shadow-lg animate-in slide-in-from-left-full duration-200">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">
                  Settings
                </h2>
                <button
                  onClick={toggleSettings}
                  className="btn btn-ghost btn-sm"
                  title="Close settings"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4 space-y-4">
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelChange={handleModelChange}
                />

                <ToolSelector
                  tools={tools}
                  onToolChange={setTools}
                  selectedModel={selectedModel}
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6 h-[calc(100vh-100px)] sm:h-[calc(100vh-180px)]">
          <aside className="hidden xl:block xl:col-span-1 space-y-6 xl:max-h-full xl:overflow-y-auto">
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-foreground">
                  Settings
                </h2>
              </div>
              <div className="card-body space-y-4">
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelChange={handleModelChange}
                />

                <ToolSelector
                  tools={tools}
                  onToolChange={setTools}
                  selectedModel={selectedModel}
                />
              </div>
            </div>
          </aside>

          <main className="xl:col-span-4">
            <div className="card h-full flex flex-col">
              <Chat
                key={chatKey}
                selectedModel={selectedModel}
                enabledTools={tools}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
