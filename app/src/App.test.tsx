import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders page', () => {
  render(<App />);
  const titleElement = screen.getByText(/All the Pokemon!/i);
  expect(titleElement).toBeInTheDocument();
});