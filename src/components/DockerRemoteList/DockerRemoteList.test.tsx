import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DockerRemoteContext } from '../../context/DockerRemoteContext';
import { DockerRemoteContextValue, DockerRemoteData } from '../../types/DockerTypes';
import DockerRemoteList from './DockerRemoteList';


const contextRender = (ui: JSX.Element, ...values: DockerRemoteData[]) => {
  const contextData: DockerRemoteContextValue = {
    dockerRemotes: {},
    addDockerRemote: (element: DockerRemoteData) => console.log(element),
    removeDockerRemote: (element: string) => console.log(element)
  };
  values.forEach(e => contextData.dockerRemotes[`${e.host}:${e.port}`] = e);
  return render(
    <DockerRemoteContext.Provider value={contextData}> {ui}</DockerRemoteContext.Provider >
  );
}

test('DockerRemoteList shows default value', () => {
  render(<DockerRemoteList />)
  expect(screen.getByText(/No remote Docker instances found/)).toBeInTheDocument();
})

test('DockerRemoteList shows one item', () => {
  contextRender(
    <Router><DockerRemoteList /></Router>, {
    protocol: "http",
    host: "localhost",
    port: 2375
  }
  );
  expect(screen.getByText(/localhost/i)).toBeInTheDocument();
  expect(screen.getByText(/2375/i)).toBeInTheDocument();
  expect(screen.getByText(/http/i)).toBeInTheDocument();
  //expect(screen.getByText(/remotehost:2375/i)).toBeInTheDocument();
});

test('DockerRemoteList shows more items', () => {
  contextRender(<Router><DockerRemoteList /></Router>, {
    protocol: "http",
    host: "localhost",
    port: 2375
  },
    {
      protocol: "https",
      host: "remotehost",
      port: 2375,
    });
    expect(screen.getByText(/localhost/i)).toBeInTheDocument();
    expect(screen.getByText(/^http$/i)).toBeInTheDocument();
    expect(screen.getByText(/remotehost/i)).toBeInTheDocument();
    expect(screen.getByText(/^https$/i)).toBeInTheDocument();
});
