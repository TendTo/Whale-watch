import React from 'react';
import { render, screen } from '@testing-library/react';
import DockerRemote from './DockerRemote';
import { DockerRemoteFormData } from '../../types/DockerTypes';


test('renders learn react link', () => {
  const dataMap = new Map();
  dataMap.set('localhost:2375', {
    isLocal: false,
    protocol: "http",
    host: "localhost",
    port: 2375
  });
  dataMap.set('remotehost:2375', {
    isLocal: false,
    protocol: "https",
    host: "remotehost",
    port: 2375,
    cert: "cert",
    key: "key"
  });

  render(<DockerRemote data={dataMap} />);
  expect(screen.getByText(/localhost:2375/i)).toBeInTheDocument();
  expect(screen.getByText(/remotehost:2375/i)).toBeInTheDocument();
});
