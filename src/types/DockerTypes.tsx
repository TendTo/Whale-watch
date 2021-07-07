export interface DockerImageLs {
    Id: string
    ParentId: string
    RepoTags: string[]
    RepoDigests: string[]
    Created: number
    Size: number
    SharedSize: number
    VirtualSize: number
    Labels: {}
    Containers: number
}

export interface DockerRemoteFormData {
    isLocal: boolean,
    protocol?: "https" | "http",
    host?: string,
    port?: number,
    ca?: string,
    cert?: string,
    key?: string,
    socket?: string,
}
