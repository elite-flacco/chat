# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2] - 2025-12-14

### Changed

- Updated README with specific Claude Code commands (`/update-changelog`, `/update-readme`)
- Expanded project structure documentation to show `.claude/commands/` directory with available slash commands
- Enhanced GitHub workflows documentation with complete list of available workflows (ci, auto-merge, changelogbot, cc-assistant, cc-auto-review)

## [0.1.1] - 2025-11-16

### Changed

- Updated `@tailwindcss/postcss` from 4.1.16 to 4.1.17
  - Fixed `@variant` substitution inside legacy JS APIs
  - Prevented occasional crash on Windows when loaded into a worker thread

## [0.1.0] - 2025-09-08

### Added

- **AI Chat Application** - Modern AI chatbot built with Next.js and TypeScript
- **Multiple AI Providers** - Support for OpenAI (GPT-4o, GPT-4o Mini, GPT-5, GPT-5 Mini) and Anthropic (Claude 4 Sonnet) models
- **Model Selection** - Dynamic model selector with provider-specific capabilities
- **Web Search Tool** - Optional web search functionality for OpenAI models
- **Real-time Chat** - Streaming responses with persistent message history
- **Dark Mode** - Theme toggle with system preference detection and local storage persistence
- **Tool System** - Extensible tool selector for enabling optional AI capabilities
- **Responsive Design** - Mobile-friendly interface with TailwindCSS v4 styling
- **Type Safety** - Comprehensive TypeScript definitions throughout the application
- **Testing Suite** - Jest and React Testing Library setup with coverage reporting
- **Code Quality** - ESLint and Prettier configuration with pre-commit hooks via Husky
- **CI/CD Pipeline** - GitHub Actions workflow for automated testing and linting
- **Dependency Management** - Dependabot configuration for automatic dependency updates
- **API Integration** - Next.js API routes handling multiple AI provider connections
- **Error Handling** - Graceful fallbacks when API keys are missing or invalid
- **Environment Configuration** - Secure environment variable management with example template

### Technical Features

- **Next.js 15.5** with App Router architecture
- **React 19.1** with modern hooks and state management
- **Strict TypeScript** configuration with comprehensive type checking
- **TailwindCSS v4** for responsive and modern styling
- **OpenAI Responses API** integration with tool support
- **Anthropic Messages API** integration
- **Auto-scrolling chat** interface with loading states
- **Lint-staged** pre-commit hooks for code quality
- **Jest configuration** with jsdom environment for component testing
