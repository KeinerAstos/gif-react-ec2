// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';
test('renders without crashing', () => {
render(<App />);
});
test('contains expected text', () => {
render(<App />);
const element = screen.getByText(/welcome/i);
expect(element).toBeInTheDocument();
});