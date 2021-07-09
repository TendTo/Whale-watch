import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainNavbar from './MainNavbar';

test('MainNavbar renders', () => {
  render(
    <Router>
      <MainNavbar />
    </Router>);
  expect(screen.getByText(/Whale watch/i)).toBeInTheDocument();
});
