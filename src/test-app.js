// src/GifExpertApp.test.jsx
import { render, screen } from '@testing-library/react';
import { GifExpertApp } from './GifExpertApp';

test('renders without crashing', () => {
  render(<GifExpertApp />);
});

test('contains expected text', () => {
  render(<GifExpertApp />);
  const element = screen.getByText(/welcome/i); // ajusta el texto real que tengas en tu componente
  expect(element).toBeInTheDocument();
});
