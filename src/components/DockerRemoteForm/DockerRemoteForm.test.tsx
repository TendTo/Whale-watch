import React from 'react';
import { render, screen } from '@testing-library/react';
import DockerRemoteForm from './DockerRemoteForm';

test('DockerRemoteForm renders', () => {
  render(<DockerRemoteForm />);
  expect(screen.getByText(/Add Docker remote/i)).toBeInTheDocument();
});
