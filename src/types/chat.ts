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
  { provider: 'openai', name: 'gpt-4o-mini', displayName: 'GPT-4o mini' },
  { provider: 'openai', name: 'gpt-5', displayName: 'GPT-5' },
  { provider: 'openai', name: 'gpt-5-mini', displayName: 'GPT-5 mini' },
  {
    provider: 'anthropic',
    name: 'claude-sonnet-4-20250514',
    displayName: 'Claude 4 Sonnet',
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
];

export interface ChatRequest {
  messages: Message[];
  model: Model;
  tools: Tool[];
  stream?: boolean;
}

export interface ChatResponse {
  message: Message;
  error?: string;
}
