import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';  // Adjust the path if necessary

test('renders app without crashing', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to my React App!/i);  // Adjust based on your content
  expect(linkElement).toBeInTheDocument();
});