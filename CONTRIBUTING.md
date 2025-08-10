# Contributing to Next.js Project

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/project-name.git
   cd project-name
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up git hooks:
   ```bash
   npm run prepare
   ```

## 🔧 Development Workflow

1. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the coding standards below

3. Run tests to ensure everything works:

   ```bash
   npm test
   npm run typecheck
   npm run lint
   ```

4. Commit your changes with a descriptive message:

   ```bash
   git commit -m "feat: add new feature description"
   ```

5. Push to your fork and create a pull request

## 📏 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Follow strict TypeScript rules
- Provide proper type annotations
- Avoid `any` type when possible

### Code Style

- Use Prettier for formatting (runs automatically on save)
- Follow ESLint rules (configured in `.eslint.config.mjs`)
- Use meaningful variable and function names
- Write self-documenting code with clear logic

### Git Commits

- Use conventional commit format: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- Keep commits atomic and focused
- Write clear commit messages

Examples:

```
feat(auth): add user authentication
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
test(utils): add tests for helper functions
```

## 🧪 Testing

- Write tests for new features and bug fixes
- Use Jest and React Testing Library
- Aim for good test coverage (run `npm run test:coverage`)
- Test both happy paths and edge cases

### Test Structure

```typescript
describe('Component/Function Name', () => {
  it('should do something specific', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

## 📝 Documentation

- Update README.md if you change functionality
- Add JSDoc comments for complex functions
- Update type definitions when needed
- Include examples in your documentation

## 🐛 Bug Reports

When reporting bugs, please include:

- Steps to reproduce the issue
- Expected vs actual behavior
- Browser/environment information
- Screenshots if applicable
- Error messages or console logs

## ✨ Feature Requests

For feature requests:

- Describe the problem you're trying to solve
- Explain your proposed solution
- Consider backward compatibility
- Provide use cases or examples

## 📋 Pull Request Checklist

Before submitting a PR, make sure:

- [ ] Code follows the project's coding standards
- [ ] Tests pass (`npm test`)
- [ ] TypeScript compilation passes (`npm run typecheck`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation is updated if needed
- [ ] Commit messages follow the conventional format
- [ ] PR description clearly explains the changes
- [ ] Tests are included for new features/bug fixes

## 🔍 Code Review Process

1. All PRs require at least one approval
2. Address reviewer feedback promptly
3. Keep discussions constructive and professional
4. Update your PR based on feedback
5. Squash commits before merging if requested

## 📞 Getting Help

- Create an issue for questions
- Use GitHub Discussions for broader topics
- Check existing issues before creating new ones
- Be patient and respectful in all interactions

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

Thank you for contributing! 🎉
