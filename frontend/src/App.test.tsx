import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders blen sample project header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Blen Sample Project/i);
  expect(headerElement).toBeInTheDocument();
});
