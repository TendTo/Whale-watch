export interface DockerRemoteData {
    protocol: "https" | "http",
    host: string,
    port: number,
    ca?: string,
    cert?: string,
    key?: string
}

export interface DockerRemoteContextState {
    dockerRemotes: {
        [key: string]: DockerRemoteData
    }
}

export interface DockerRemoteContextValue {
    dockerRemotes: {
        [key: string]: DockerRemoteData
    }
    addDockerRemote: (newDockerRemote: DockerRemoteData) => void
    removeDockerRemote: (dockerRemoteKey: string) => void
}

export interface DockerRemoteKey {
    dockerRemoteKey: string
}

export type FetchMethod = "GET" | "POST" | "DELETE";

export interface QueryParams {
    [key: string]: string | number
}

export interface HttpsResponse {
    status?: number
    text: () => string
    json: () => any
}