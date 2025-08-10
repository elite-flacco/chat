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
      <label htmlFor="model-select" className="label">
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
        className="select"
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

      <div className="mt-2 text-xs text-muted-foreground">
        Provider: {selectedModel.provider}
      </div>
    </div>
  );
}
