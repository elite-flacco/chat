# Next.js Project

[![CI](https://github.com/user/repo/workflows/CI/badge.svg)](https://github.com/user/repo/actions)
[![codecov](https://codecov.io/gh/user/repo/branch/main/graph/badge.svg)](https://codecov.io/gh/user/repo)
[![TypeScript](https://badgen.net/badge/icon/typescript?icon=typescript&label)](https://typescriptlang.org)

A modern Next.js application built with TypeScript, featuring a comprehensive development setup including testing, linting, and CI/CD pipeline.

## 🚀 Features

- ⚡ **Next.js 15** with App Router
- 🎯 **TypeScript** with strict configuration
- 🎨 **Tailwind CSS** for styling
- 🧪 **Jest** and **React Testing Library** for testing
- 📏 **ESLint** and **Prettier** for code quality
- 🔄 **GitHub Actions** CI/CD pipeline
- 🎣 **Husky** pre-commit hooks
- 📦 **Automatic dependency updates** with Dependabot

## 📋 Prerequisites

- Node.js 18.x or later
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

3. Set up git hooks:

```bash
npm run prepare
```

## 🏃‍♂️ Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

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
├── .github/           # GitHub workflows and config
├── .next/             # Next.js build output
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js app directory
│   └── __tests__/     # Test files
├── .editorconfig      # Editor configuration
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

### TypeScript

- Strict mode enabled
- Path mapping configured (`@/*` → `src/*`)
- Additional strict checks enabled

### ESLint

- Next.js recommended rules
- TypeScript integration
- Prettier integration
- Custom rules for code quality

### Prettier

- Consistent code formatting
- Integrated with ESLint
- Pre-commit hook integration

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
