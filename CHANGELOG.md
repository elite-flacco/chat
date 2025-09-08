# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2025-09-08

### Added

- Initial release of AI Chat Application
- Multiple AI provider support (OpenAI and Anthropic)
- Model selection with support for:
  - GPT-4o and GPT-4o mini
  - GPT-5 and GPT-5 mini  
  - Claude 4 Sonnet
- Web search tool integration (OpenAI models only)
- Real-time chat interface with message history
- Responsive design with Tailwind CSS
- Dark mode toggle with theme persistence
- TypeScript strict mode with comprehensive type definitions
- Comprehensive testing setup with Jest and React Testing Library
- ESLint and Prettier configuration with pre-commit hooks
- GitHub Actions CI/CD pipeline
- Automatic dependency updates with Dependabot
- Development tooling and scripts for build, test, lint, and format
- Graceful error handling when API keys are missing
- Tool selector for enabling/disabling optional features
- Auto-scrolling chat interface with loading states

### Changed

- Improved workflow automation and commands

### Security

- Environment variable configuration for secure API key management
- Input validation and error handling for API requests