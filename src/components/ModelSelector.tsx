'use client';

import { Model, AVAILABLE_MODELS } from '@/types/chat';

interface ModelSelectorProps {
  selectedModel: Model;
  onModelChange: (model: Model) => void;
}

export default function ModelSelector({
  selectedModel,
  onModelChange,
}: ModelSelectorProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor="model-select"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        AI Model
      </label>
      <select
        id="model-select"
        value={`${selectedModel.provider}:${selectedModel.name}`}
        onChange={e => {
          const [provider, name] = e.target.value.split(':');
          const model = AVAILABLE_MODELS.find(
            m => m.provider === provider && m.name === name
          );
          if (model) {
            onModelChange(model);
          }
        }}
        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {AVAILABLE_MODELS.map(model => (
          <option
            key={`${model.provider}:${model.name}`}
            value={`${model.provider}:${model.name}`}
          >
            {model.displayName}
          </option>
        ))}
      </select>

      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Provider: {selectedModel.provider}
      </div>
    </div>
  );
}
