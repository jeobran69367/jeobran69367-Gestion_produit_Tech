import { render, screen } from '@testing-library/react';
import App from './App';

test('renders product management interface', () => {
  render(<App />);
  const titleElement = screen.getByText(/Gestion de produit/i);
  expect(titleElement).toBeInTheDocument();
});
