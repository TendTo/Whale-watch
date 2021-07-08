import React from "react"
import { DockerRemoteData, DockerRemoteContextValue, DockerRemoteContextState } from '../types/DockerTypes';

export const DockerRemoteContext = React.createContext<DockerRemoteContextValue | null>(null);

class DockerRemoteContextProvider extends React.Component {
    static override contextType = DockerRemoteContext;

    override state: DockerRemoteContextState = {
        dockerRemotes: {}
    }

    addDockerRemote = (newDockerRemote: DockerRemoteData) => {
        const currentDockerRemotes = this.state.dockerRemotes;
        currentDockerRemotes[`${newDockerRemote.host}:${newDockerRemote.port}`] = newDockerRemote;
        this.setState({ dockerRemotes: currentDockerRemotes });
    }

    removeDockerRemote = (dockerRemoteKey: string) => {
        const currentDockerRemotes = this.state.dockerRemotes;
        delete currentDockerRemotes[dockerRemoteKey];
        this.setState({ dockerRemotes: currentDockerRemotes });
    }

    override render() {
        return (
            <DockerRemoteContext.Provider value={{
                dockerRemotes: this.state.dockerRemotes,
                addDockerRemote: this.addDockerRemote,
                removeDockerRemote: this.removeDockerRemote
            }}>
                {this.props.children}
            </DockerRemoteContext.Provider>
        );
    }
}

export default DockerRemoteContextProvider;