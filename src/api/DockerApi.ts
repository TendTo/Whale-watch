import { DockerRemoteData } from '../types/DockerTypes'
import { ImageInfo, NetworkInspectInfo, ImageRemoveInfo, ImageInspectInfo, ServiceCreateResponse, ContainerInfo, ContainerInspectInfo, VolumeInspectInfo, VolumeList } from '../types/DockerApiTypes'
import BaseApi from './BaseApi';

type queryParams = {
    [key: string]: any
}

class DockerApi extends BaseApi {
    private readonly force = { force: "true" };
    private readonly all = { all: "true" };
    private readonly allLogs = { stderr: "true", stdout: "true", tail: 100 };

    static fromDockerRemoteData(data: DockerRemoteData, setLoading: (isLoading: boolean) => void) {
        return new DockerApi(data.protocol, data.host, data.port, data.ca, data.cert, data.key, setLoading);
    }

    constructor(
        protocol: "https" | "http",
        host: string,
        port: number,
        ca?: string,
        cert?: string,
        key?: string,
        public setLoading?: (isLoading: boolean) => void
    ) {
        super(protocol, host, port, ca, cert, key);
    }

    private async apiRequestWrapper(path: string, method: string = "GET", queryParams?: queryParams, body?: queryParams) {
        if (this.setLoading) this.setLoading(true);
        try {
            const res = await this.apiRequest(path, method, queryParams, body);
            if (res === undefined || res === null || !res.ok) this.handleError(res);
            if (this.setLoading) this.setLoading(false);
            return res;
        } catch (e) {
            if (this.setLoading) this.setLoading(false);
            throw e;
        }
    }

    async imageCreate(nameTag: string): Promise<void> {
        const matches = nameTag.match(/(.*?)(:[^:]+)?$/);
        if (matches === null || matches.length < 2) {
            throw Error("404 - imageCreate has failed");
        }
        let fromImage = matches[1] || "";
        let tag = matches[2] || "latest";
        fromImage = fromImage.endsWith(":") ? fromImage.slice(0, -1) : fromImage;
        tag = tag.startsWith(":") ? tag.slice(1) : tag;
        await this.apiRequestWrapper("images/create", "POST", { fromImage: fromImage, tag: tag });
    }

    async imageLs(): Promise<ImageInfo[]> {
        const result = await this.apiRequestWrapper("images/json");
        return await result.json();
    }

    async imageInspect(image: ImageInfo): Promise<ImageInspectInfo> {
        const result = await this.apiRequestWrapper(`images/${image.Id.replace("sha256:", "")}/json`);
        return await result.json();
    }

    async imageRm(image: ImageInfo): Promise<ImageRemoveInfo[]> {
        const result = await this.apiRequestWrapper(`images/${image.Id.replace("sha256:", "")}`, "DELETE", this.force);
        return await result.json();
    }

    async containerCreate(image: ImageInfo): Promise<ServiceCreateResponse> {
        const imageName = image.RepoTags ? image.RepoTags[0] : image.Id.slice(7);
        const result = await this.apiRequestWrapper(`containers/create`, "POST", undefined, { Image: imageName });
        return await result.json();
    }

    async containerRun(container: ContainerInfo): Promise<void> {
        await this.apiRequestWrapper(`containers/${container.Id}/start`, "POST");
    }

    async containerLs(...params: { key: string, value: string }[]): Promise<ContainerInfo[]> {
        const result = await this.apiRequestWrapper(`containers/json`, "GET", this.all);
        return await result.json();
    }

    async containerInspect(container: ContainerInfo): Promise<ContainerInspectInfo> {
        const result = await this.apiRequestWrapper(`containers/${container.Id}/json`);
        return await result.json();
    }

    async containerLogs(container: ContainerInfo): Promise<string> {
        const result = await this.apiRequestWrapper(`containers/${container.Id}/logs`, "GET", this.allLogs);
        return await result.text();
    }

    async containerRestart(container: ContainerInfo): Promise<void> {
        await this.apiRequestWrapper(`containers/${container.Id}/restart`, "POST");
    }

    async containerStop(container: ContainerInfo): Promise<void> {
        await this.apiRequestWrapper(`containers/${container.Id}/stop`, "POST");
    }

    async containerRm(container: ContainerInfo): Promise<void> {
        await this.apiRequestWrapper(`containers/${container.Id}`, "DELETE", this.force);
    }

    async volumeLs(...params: { key: string, value: string }[]): Promise<VolumeList> {
        const result = await this.apiRequestWrapper(`volumes`);
        return await result.json();
    }

    async volumeInpect(volume: VolumeInspectInfo): Promise<VolumeInspectInfo> {
        const result = await this.apiRequestWrapper(`volumes/${volume.Name}`);
        return await result.json();
    }

    async volumeRm(volume: VolumeInspectInfo): Promise<void> {
        await this.apiRequestWrapper(`volumes/${volume.Name}`, "DELETE", this.force);
    }

    async ping(): Promise<boolean> {
        const result = await this.apiRequestWrapper(`_ping`);
        const response = await result.text();
        return response === "OK";
    }

    async networkLs(...params: { key: string, value: string }[]): Promise<NetworkInspectInfo[]> {
        const result = await this.apiRequestWrapper(`networks`);
        return await result.json();
    }

    async networkInpect(network: NetworkInspectInfo): Promise<NetworkInspectInfo> {
        const result = await this.apiRequestWrapper(`networks/${network.Name}`);
        return await result.json();
    }

    async networkRm(network: NetworkInspectInfo): Promise<void> {
        await this.apiRequestWrapper(`networks/${network.Name}`, "DELETE");
    }
}

export default DockerApi;