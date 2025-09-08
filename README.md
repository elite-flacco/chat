# AI Chat Application

[![CI](https://github.com/user/repo/workflows/CI/badge.svg)](https://github.com/user/repo/actions)
[![codecov](https://codecov.io/gh/user/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/user/repo)
[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)

A modern AI chatbot application built with Next.js and TypeScript, supporting multiple AI providers including OpenAI and Anthropic. Features a clean interface for conversing with various AI models including GPT-4o, GPT-5, and Claude 4 Sonnet.

## 🚀 Features

### AI Capabilities

- 🤖 **Multiple AI Providers** - OpenAI and Anthropic integration
- 🧠 **Model Selection** - GPT-4o, GPT-4o Mini, GPT-5, GPT-5 Mini, Claude 4 Sonnet
- 🔍 **Web Search Tool** - Optional web search capabilities (OpenAI models)
- 💬 **Real-time Chat** - Streaming responses with message history
- 🌙 **Dark Mode** - Toggle between light and dark themes with system preference detection
- ⚙️ **Graceful Fallbacks** - Functions without API keys with helpful error messages

### Technical Stack

- ⚡ **Next.js 15.5** with App Router
- ⚛️ **React 19.1** with modern features
- 🎯 **TypeScript** with strict configuration
- 🎨 **Tailwind CSS v4** for styling
- 🧪 **Jest** and **React Testing Library** for testing
- 📏 **ESLint** and **Prettier** for code quality
- 🔄 **GitHub Actions** CI/CD pipeline
- 🎣 **Husky** pre-commit hooks
- 📦 **Automatic dependency updates** with Dependabot

## 📋 Prerequisites

- Node.js 18.x or later (tested with Node.js 18.x and 20.x)
- npm, yarn, or pnpm

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-name>
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
# Add your API keys:
# OPENAI_API_KEY=your_openai_key_here
# ANTHROPIC_API_KEY=your_anthropic_key_here
```

4. Set up git hooks:

```bash
npm run prepare
```

## 🏃‍♂️ Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to start chatting with AI.

### Using the Chat Interface

1. **Select a Model** - Choose from available AI models (OpenAI or Anthropic)
2. **Enable Tools** - Optionally enable web search for OpenAI models
3. **Start Chatting** - Type your message and get AI responses
4. **View History** - All messages are preserved in your chat session

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run typecheck` - Run TypeScript type checking

## 🧪 Testing

This project uses Jest and React Testing Library for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📁 Project Structure

```
├── .github/           # GitHub workflows and dependabot config
├── .next/             # Next.js build output
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app directory
│   │   ├── api/chat/  # Chat API route
│   │   └── page.tsx   # Main chat interface
│   ├── components/    # React components
│   │   ├── Chat.tsx
│   │   ├── ModelSelector.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ToolSelector.tsx
│   ├── types/         # TypeScript definitions
│   │   └── chat.ts
│   └── __tests__/     # Test files
├── .editorconfig      # Editor configuration
├── .env.example       # Environment variables template
├── CLAUDE.md          # Claude Code project instructions
├── eslint.config.mjs  # ESLint configuration
├── .gitignore         # Git ignore rules
├── .prettierrc        # Prettier configuration
├── jest.config.js     # Jest configuration
├── next.config.ts     # Next.js configuration
├── package.json       # Dependencies and scripts
├── tailwind.config.ts # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

- `OPENAI_API_KEY` - Required for OpenAI models (GPT-4o, GPT-5, etc.)
- `ANTHROPIC_API_KEY` - Required for Anthropic models (Claude 4 Sonnet)

### AI Provider Integration

- **OpenAI**: Uses the Responses API with optional web search tool support
- **Anthropic**: Uses the Messages API with standard text generation
- **Graceful Error Handling**: Shows appropriate messages when API keys are missing
- **Model-Specific Features**: Web search automatically disabled for non-OpenAI models

### TypeScript

- Strict mode enabled
- Path mapping configured (`@/*` → `src/*`)
- Comprehensive type definitions in `src/types/chat.ts`

### ESLint & Prettier

- Next.js recommended rules with TypeScript integration
- Consistent code formatting with pre-commit hooks

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:

- Run `npm run lint` and `npm test` before committing
- Follow the existing code style
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and deployment
- All the open source contributors who make this possible
