import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('renders the main heading', () => {
    render(<Home />);

    const heading = screen.getByRole('main');
    expect(heading).toBeInTheDocument();
  });

  it('renders the get started text', () => {
    render(<Home />);

    const text = screen.getByText(/get started by editing/i);
    expect(text).toBeInTheDocument();
  });
});
