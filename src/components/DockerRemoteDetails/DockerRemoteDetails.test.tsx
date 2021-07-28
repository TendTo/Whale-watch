import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { DockerRemoteContext } from '../../context/DockerRemoteContext';
import { DockerRemoteContextValue, DockerRemoteData } from '../../types/DockerTypes';
import DockerRemoteDetails from './DockerRemoteDetails';


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

test('DockerRemoteDetails shows default value', () => {
    render(<Router initialEntries={[`/localhost:2375`]}>
              <Route exact path="/:dockerRemoteKey" children={<DockerRemoteDetails />} />
    </Router>)
    expect(screen.getByText(/ERROR 404/i)).toBeInTheDocument();
})

test('DockerRemoteDetails shows the docker remote details', () => {
    contextRender(
        <Router initialEntries={[`/localhost:2375`]}>
              <Route exact path="/:dockerRemoteKey" children={<DockerRemoteDetails />} />
        </Router>, {
        protocol: "http",
        host: "localhost",
        port: 2375
    }
    );
    expect(screen.getByText(/localhost:2375/i)).toBeInTheDocument();
});
