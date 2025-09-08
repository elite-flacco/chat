# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-09-08

### Added

- **Initial Release**: AI Chat Application with multi-provider support
- **AI Provider Integration**: OpenAI and Anthropic API integration
  - GPT-4o, GPT-4o Mini, GPT-5, GPT-5 Mini support via OpenAI
  - Claude 4 Sonnet support via Anthropic
- **Model Selection**: Dynamic model switching between providers
- **Web Search Tool**: Optional web search capabilities for OpenAI models
- **Real-time Chat Interface**: Modern React-based chat interface with message history
- **TypeScript Support**: Full TypeScript implementation with strict configuration
- **Testing Infrastructure**: Jest and React Testing Library setup
- **Code Quality Tools**: ESLint, Prettier, and Husky pre-commit hooks
- **CI/CD Pipeline**: GitHub Actions workflow with automated testing
- **Development Tools**: Hot reloading, type checking, and formatting commands
- **Graceful Error Handling**: Application functions without API keys with helpful messages
- **Environment Configuration**: Support for OpenAI and Anthropic API keys
- **Modern Tech Stack**: Next.js 15, React 19.1, Tailwind CSS 4
- **Responsive Design**: Mobile-friendly chat interface

### Technical

- Next.js App Router architecture
- OpenAI Responses API integration
- Anthropic Messages API integration
- Tailwind CSS styling system
- Comprehensive type definitions in `src/types/chat.ts`
- Husky git hooks for code quality enforcement
- Lint-staged for pre-commit formatting