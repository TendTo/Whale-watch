import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DockerRemoteForm from './DockerRemoteForm';

test('DockerRemoteForm renders', () => {
  render(<Router><DockerRemoteForm /></Router>);
  expect(screen.getByText(/Add Docker remote/i)).toBeInTheDocument();
});
