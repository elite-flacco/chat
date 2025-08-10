'use client';

import { Tool } from '@/types/chat';

interface ToolSelectorProps {
  tools: Tool[];
  onToolChange: (tools: Tool[]) => void;
}

export default function ToolSelector({
  tools,
  onToolChange,
}: ToolSelectorProps) {
  const handleToolToggle = (toolName: string) => {
    const updatedTools = tools.map(tool =>
      tool.name === toolName ? { ...tool, enabled: !tool.enabled } : tool
    );
    onToolChange(updatedTools);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Available Tools
      </label>
      <div className="space-y-2">
        {tools.map(tool => (
          <div key={tool.name} className="flex items-start space-x-3">
            <input
              type="checkbox"
              id={tool.name}
              checked={tool.enabled}
              onChange={() => handleToolToggle(tool.name)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex-1">
              <label
                htmlFor={tool.name}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {tool.displayName}
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {tool.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {tools.some(tool => tool.enabled) && (
        <div className="mt-2 text-xs text-green-600 dark:text-green-400">
          ✓ {tools.filter(tool => tool.enabled).length} tool(s) enabled
        </div>
      )}
    </div>
  );
}
