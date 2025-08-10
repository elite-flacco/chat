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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              AI Chatbot
            </h1>
            <p className="text-muted-foreground">
              Chat with different AI models and use various tools
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 space-y-6">
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

          <main className="lg:col-span-3">
            <div className="card h-[600px] flex flex-col">
              <Chat selectedModel={selectedModel} enabledTools={tools} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
