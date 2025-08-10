# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `npm run dev` - Start development server (usually on port 3000, falls back to next available)
- `npm run build` - Build for production and validate the build
- `npm test` - Run all tests with Jest
- `npm run test:watch` - Run tests in watch mode for active development
- `npm run test:coverage` - Run tests and generate coverage report
- `npm run typecheck` - Run TypeScript compiler checks without emitting files
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint with automatic fixes
- `npm run format` - Format all code with Prettier
- `npm run format:check` - Check if code is properly formatted

### Pre-commit Setup

- `npm run prepare` - Initialize Husky git hooks (run once after clone)

## Project Architecture

### AI Chatbot Application

This is a Next.js-based AI chatbot that supports multiple providers:

**Core Architecture:**

- **Frontend**: React components with TypeScript, styled with TailwindCSS
- **Backend**: Next.js API routes that directly call AI provider APIs
- **State Management**: React useState for local component state
- **API Integration**: Direct API calls to OpenAI and Anthropic services

**Key Components:**

- `Chat.tsx` - Main chat interface with message history and input
- `ModelSelector.tsx` - Dropdown for switching between AI models
- `ToolSelector.tsx` - Checkboxes for enabling optional tools
- `/api/chat/route.ts` - API endpoint that handles requests to different AI providers

**AI Provider Integration:**

- OpenAI integration supports GPT-4o, GPT-4o Mini, GPT-3.5 Turbo
- Anthropic integration supports Claude 3.5 Sonnet, Claude 3.5 Haiku
- API clients are conditionally initialized based on environment variables
- Graceful error handling when API keys are missing

**Types System:**

- `src/types/chat.ts` contains all TypeScript interfaces for messages, models, tools
- Strong typing throughout the application with minimal use of `any`

### Environment Setup

- Copy `.env.example` to `.env.local` and add API keys:
  - `OPENAI_API_KEY` - Required for OpenAI models
  - `ANTHROPIC_API_KEY` - Required for Anthropic/Claude models
- Application functions without API keys but shows appropriate error messages

### Code Quality Standards

- TypeScript strict mode enabled with comprehensive type checking
- ESLint configured with Next.js and TypeScript rules
- Prettier for consistent code formatting
- Pre-commit hooks via Husky ensure code quality before commits
- Conventional commit format: `type(scope): description`

### Testing Strategy

- Jest + React Testing Library for component testing
- Tests located in `src/__tests__/` directory
- Coverage reports available via `npm run test:coverage`

## Development Notes

### API Route Patterns

The `/api/chat` route demonstrates the pattern for handling multiple AI providers:

- Conditional client initialization based on environment variables
- Provider-specific message formatting and API calls
- Consistent error handling and response formatting
- Graceful degradation when API keys are unavailable

### Component State Flow

- App-level state in `page.tsx` manages selected model and enabled tools
- Chat component maintains message history and handles API communication
- Model/tool selectors update parent state via callbacks
- All state changes trigger re-renders and API calls as needed
