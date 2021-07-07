import React from 'react';
import { render, screen } from '@testing-library/react';
import DockerRemoteForm from './DockerRemoteForm';
import { DockerRemoteFormData } from '../../types/DockerTypes';

test('renders learn react link', () => {
  const onFetch = async (e: DockerRemoteFormData) => console.log(e);
  render(<DockerRemoteForm onFetch={onFetch} />);
  expect(screen.getByText(/Whale watch/i)).toBeInTheDocument();
});
