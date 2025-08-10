'use client';

import { useState } from 'react';
import Chat from '@/components/Chat';
import ModelSelector from '@/components/ModelSelector';
import ToolSelector from '@/components/ToolSelector';
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            AI Chatbot
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Chat with different AI models and use various tools
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Settings
              </h2>

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
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[600px] flex flex-col">
              <Chat selectedModel={selectedModel} enabledTools={tools} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
