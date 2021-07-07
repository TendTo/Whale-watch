import React from 'react';
import { render, screen } from '@testing-library/react';
import MainNavbar from './MainNavbar';
import { DockerRemoteFormData } from '../../types/DockerTypes';

test('renders learn react link', () => {
  const onFetch = async (e: DockerRemoteFormData) => console.log(e);
  render(<MainNavbar onFetch={onFetch} />);
  expect(screen.getByText(/Whale watch/i)).toBeInTheDocument();
});
