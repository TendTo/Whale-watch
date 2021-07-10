import { DockerRemoteData, FetchMethod, QueryParams } from '../types/DockerTypes'
import { ImageInfo, NetworkInspectInfo, ImageRemoveInfo, ImageInspectInfo, ServiceCreateResponse, ContainerInfo, ContainerInspectInfo, VolumeInspectInfo, VolumeList } from '../types/DockerApiTypes'

class DockerApi {
    private force = { force: "true" };
    private all = { all: "true" };
    private allLogs = { stderr: "true", stdout: "true", tail: 100 };
    host: string
    port: number
    ca?: string
    cert?: string
    key?: string
    setLoading: (isLoading: boolean) => void

    static fromDockerRemoteData(data: DockerRemoteData, setLoading: (isLoading: boolean) => void) {
        return new DockerApi(data.host, data.port, setLoading, data.ca, data.cert, data.key);
    }

    constructor(host: string, port: number, setLoading: (isLoading: boolean) => void, ca?: string, cert?: string, key?: string) {
        this.host = host;
        this.port = port;
        this.ca = ca;
        this.cert = cert;
        this.key = key;
        this.setLoading = setLoading;
    }

    get baseAddr(): string {
        return `${this.host}:${this.port}`;
    }

    get protocol(): string {
        return this.ca && this.cert && this.key ? "https" : "http";
    }

    get baseUrl(): string {
        return `${this.protocol}://${this.baseAddr}`;
    }

    private async _apiRequest(endpoint: string, method: FetchMethod = "GET", body?: object, queyParams?: QueryParams) {
        try {
            this.setLoading(true);
            const url = queyParams
                ? `${this.baseUrl}/${endpoint}?${(Object.entries(queyParams)).map(([key, value]) => `${key}=${value}`).join("&")}`
                : `${this.baseUrl}/${endpoint}`
            console.debug(`Request to ${url} endpoint`);
            const result = await fetch(url, {
                method: method,
                headers: body ? {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                } : {},
                body: body ? JSON.stringify(body) : undefined
            });
            return result;
        } catch (e) {
            this.setLoading(false);
            console.error(e);
            return null;
        }
    }

    async apiRequest(endpoint: string, method: FetchMethod = "GET", body?: object, queyParams?: QueryParams) {
        const result = await this._apiRequest(endpoint, method, body, queyParams);
        this.setLoading(false);
        if (result === null || result?.status >= 400)
            throw Error(`${result?.status} - apiRequest failed`);
    }

    async apiRequestJson(endpoint: string, method: FetchMethod = "GET", body?: object, queyParams?: QueryParams) {
        const result = await this._apiRequest(endpoint, method, body, queyParams);
        if (result === null || result?.status >= 400)
            throw Error(`${result?.status} - apiRequestJson failed`);
        const resultObj = await result?.json();
        this.setLoading(false);
        return resultObj;
    }

    async apiRequestText(endpoint: string, method: FetchMethod = "GET", body?: object, queyParams?: QueryParams) {
        const result = await this._apiRequest(endpoint, method, body, queyParams);
        if (result === null || result?.status >= 400)
            throw Error(`${result?.status} - apiRequestText failed`);
        const resultObj = await result?.text();
        this.setLoading(false);
        return resultObj;
    }

    async imageCreate(nameTag: string, ...params: { key: string, value: string }[]): Promise<void> {
        const matches = nameTag.match(/(.*?)(:[^:]+)?$/);        
        if (matches === null || matches.length < 2) {
            throw Error("404 - imageCreate has failed");
        }
        let fromImage = matches[1] || "";
        fromImage = fromImage.endsWith(":") ? fromImage.slice(0, -1) : fromImage;
        const tag = matches[2] || "latest";
        await this.apiRequest("images/create", "POST", undefined, { fromImage: fromImage, tag: tag });
    }

    async imageLs(...params: { key: string, value: string }[]): Promise<ImageInfo[]> {
        const result = await this.apiRequestJson("images/json");
        if (result === null)
            throw Error('imageLs has failed');
        return result;
    }

    async imageInspect(image: ImageInfo, ...params: { key: string, value: string }[]): Promise<ImageInspectInfo> {
        const result = await this.apiRequestJson(`images/${image.Id.replace("sha256:", "")}/json`);
        if (result === null)
            throw Error('imageInspect has failed');
        return result;
    }

    async imageRm(image: ImageInfo, ...params: { key: string, value: string }[]): Promise<ImageRemoveInfo[]> {
        const result = await this.apiRequestJson(`images/${image.Id.replace("sha256:", "")}`, "DELETE", undefined, this.force);
        if (result === null)
            throw Error('imageRm has failed');
        return result;
    }

    async containerCreate(image: ImageInfo, ...params: { key: string, value: string }[]): Promise<ServiceCreateResponse> {
        const imageName = image.RepoTags ? image.RepoTags[0] : image.Id.replace("sha256:", "");
        const result = await this.apiRequestJson(`containers/create`, "POST", { Image: imageName });
        if (result === null)
            throw Error('containerCreate has failed');
        return result;
    }

    async containerRun(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<void> {
        await this.apiRequest(`containers/${container.Id}/start`, "POST");
    }

    async containerLs(...params: { key: string, value: string }[]): Promise<ContainerInfo[]> {
        const result = await this.apiRequestJson(`containers/json`, undefined, undefined, this.all);
        if (result === null)
            throw Error('containerLs has failed');
        return result;
    }

    async containerInspect(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<ContainerInspectInfo> {
        const result = await this.apiRequestJson(`containers/${container.Id}/json`);
        if (result === null)
            throw Error('containerInspect has failed');
        return result;
    }

    async containerLogs(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<string> {
        const result = await this.apiRequestText(`containers/${container.Id}/logs`, "GET", undefined, this.allLogs);
        if (result === null)
            throw Error('containerInspect has failed');
        return result;
    }

    async containerRestart(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<void> {
        await this.apiRequest(`containers/${container.Id}/restart`, "POST");
    }

    async containerStop(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<void> {
        await this.apiRequest(`containers/${container.Id}/stop`, "POST");
    }

    async containerRm(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<void> {
        await this.apiRequest(`containers/${container.Id}`, "DELETE", undefined, this.force);
    }

    async volumeLs(...params: { key: string, value: string }[]): Promise<VolumeList> {
        const result = await this.apiRequestJson(`volumes`);
        if (result === null)
            throw Error('volumeLs has failed');
        return result;
    }

    async volumeInpect(volume: VolumeInspectInfo, ...params: { key: string, value: string }[]): Promise<VolumeInspectInfo> {
        const result = await this.apiRequestJson(`volumes/${volume.Name}`);
        if (result === null)
            throw Error('volumeInpect has failed');
        return result;
    }

    async volumeRm(volume: VolumeInspectInfo, ...params: { key: string, value: string }[]): Promise<void> {
        await this.apiRequest(`volumes/${volume.Name}`, "DELETE", undefined, this.force);
    }

    async ping(): Promise<boolean> {
        const result = await this.apiRequestText(`_ping`);
        return result === "OK";
    }

    async networkLs(...params: { key: string, value: string }[]): Promise<NetworkInspectInfo[]> {
        const result = await this.apiRequestJson(`networks`);
        if (result === null)
            throw Error('networkLs has failed');
        return result;
    }

    async networkInpect(network: NetworkInspectInfo, ...params: { key: string, value: string }[]): Promise<NetworkInspectInfo> {
        const result = await this.apiRequestJson(`networks/${network.Name}`);
        if (result === null)
            throw Error('networkInpect has failed');
        return result;
    }

    async networkRm(network: NetworkInspectInfo, ...params: { key: string, value: string }[]): Promise<void> {
        await this.apiRequest(`networks/${network.Name}`, "DELETE");
    }
}

export default DockerApi;