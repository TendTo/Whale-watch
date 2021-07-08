import React from 'react';
import { render, screen } from '@testing-library/react';
import MainNavbar from './MainNavbar';

test('MainNavbar renders', () => {
  render(<MainNavbar />);
  expect(screen.getByText(/Whale watch/i)).toBeInTheDocument();
});
