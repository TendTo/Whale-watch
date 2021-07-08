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