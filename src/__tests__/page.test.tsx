import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

// Mock the child components
jest.mock('@/components/Chat', () => {
  return function MockChat() {
    return <div data-testid="mock-chat">Chat Component</div>;
  };
});

jest.mock('@/components/ModelSelector', () => {
  return function MockModelSelector() {
    return <div data-testid="mock-model-selector">Model Selector</div>;
  };
});

jest.mock('@/components/ToolSelector', () => {
  return function MockToolSelector() {
    return <div data-testid="mock-tool-selector">Tool Selector</div>;
  };
});

jest.mock('@/components/ThemeToggle', () => {
  return function MockThemeToggle() {
    return <div data-testid="mock-theme-toggle">Theme Toggle</div>;
  };
});

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />);

    const heading = screen.getByText('Chat');
    expect(heading).toBeInTheDocument();
  });

  it('renders the chat description', () => {
    render(<Home />);

    const text = screen.getByText(
      /Chat with different AI models and use various tools/i
    );
    expect(text).toBeInTheDocument();
  });

  it('renders the mocked components', () => {
    render(<Home />);

    expect(screen.getByTestId('mock-chat')).toBeInTheDocument();
    expect(screen.getByTestId('mock-model-selector')).toBeInTheDocument();
    expect(screen.getByTestId('mock-tool-selector')).toBeInTheDocument();
    expect(screen.getByTestId('mock-theme-toggle')).toBeInTheDocument();
  });
});
