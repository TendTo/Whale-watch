import { render, screen } from '@testing-library/react';
import React, { useContext } from 'react';
import { DockerRemoteContext } from '../../context/DockerRemoteContext';
import { DockerRemoteData, DockerRemoteContextValue } from '../../types/DockerTypes';
import DockerRemote from './DockerRemote';


const contextRender = (ui: JSX.Element, ...values: DockerRemoteData[]) => {
  const contextData: DockerRemoteContextValue = { dockerRemotes: {}, addDockerRemote: (element: DockerRemoteData) => console.log(element) };
  values.forEach(e => contextData.dockerRemotes[`${e.host}:${e.port}`] = e);
  return render(
    <DockerRemoteContext.Provider value={contextData}> {ui}</DockerRemoteContext.Provider >
  );
}

test('DockerRemote shows default value', () => {
  render(<DockerRemote />)
  expect(screen.getByText(/No remote Docker instances found/)).toBeInTheDocument();
})

test('DockerRemote shows one item', () => {
  contextRender(<DockerRemote />, {
    isLocal: false,
    protocol: "http",
    host: "localhost",
    port: 2375
  });
  expect(screen.getByText(/localhost:2375/i)).toBeInTheDocument();
  //expect(screen.getByText(/remotehost:2375/i)).toBeInTheDocument();
});

test('DockerRemote shows more items', () => {
  contextRender(<DockerRemote />, {
    isLocal: false,
    protocol: "http",
    host: "localhost",
    port: 2375
  },
  {
    isLocal: false,
    protocol: "https",
    host: "remotehost",
    port: 2375,
    ca: "ca",
    cert: "cert",
    key: "key"
  });
  expect(screen.getByText(/localhost:2375/i)).toBeInTheDocument();
  expect(screen.getByText(/remotehost:2375/i)).toBeInTheDocument();
});
