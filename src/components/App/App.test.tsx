import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render( <App />);
  expect(screen.getByText(/Whale watch/i)).toBeInTheDocument();
});
