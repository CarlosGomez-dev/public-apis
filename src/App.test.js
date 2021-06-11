import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  test('matches snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
  test('renders learn react link', () => {
    render(<App />);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});
