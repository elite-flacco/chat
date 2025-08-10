export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date | string;
}

export type ModelProvider = 'openai' | 'anthropic';

export interface Model {
  provider: ModelProvider;
  name: string;
  displayName: string;
}

export const AVAILABLE_MODELS: Model[] = [
  { provider: 'openai', name: 'gpt-4o', displayName: 'GPT-4o' },
  { provider: 'openai', name: 'gpt-4o-mini', displayName: 'GPT-4o Mini' },
  { provider: 'openai', name: 'gpt-3.5-turbo', displayName: 'GPT-3.5 Turbo' },
  {
    provider: 'anthropic',
    name: 'claude-3-5-sonnet-20241022',
    displayName: 'Claude 3.5 Sonnet',
  },
  {
    provider: 'anthropic',
    name: 'claude-3-5-haiku-20241022',
    displayName: 'Claude 3.5 Haiku',
  },
];

export interface Tool {
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
}

export const AVAILABLE_TOOLS: Tool[] = [
  {
    name: 'web_search',
    displayName: 'Web Search',
    description: 'Search the web for current information',
    enabled: false,
  },
  {
    name: 'function_calling',
    displayName: 'Function Calling',
    description: 'Use structured function calls',
    enabled: false,
  },
];

export interface ChatRequest {
  messages: Message[];
  model: Model;
  tools: Tool[];
}

export interface ChatResponse {
  message: Message;
  error?: string;
}
