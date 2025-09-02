import { render, screen } from '@testing-library/react';
import { GifExpertApp } from './GifExpertApp';

test('renders without crashing', () => {
  render(<GifExpertApp />);
});

test('contains expected text', () => {
  render(<GifExpertApp />);
  // 👇 ajusta el texto a lo que realmente muestra tu componente
  const element = screen.getByText(/gifexpertapp/i);
  expect(element).toBeInTheDocument();
});
