import { DockerRemoteData, FetchMethod } from '../types/DockerTypes'
import { ImageInfo, ImageRemoveInfo, ImageInspectInfo, ServiceCreateResponse, ContainerInfo, ContainerInspectInfo } from '../types/DockerApiTypes'

class DockerApi {
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

    private async _apiRequest(endpoint: string, method: FetchMethod = "GET", body?: object, ...params: { key: string, value: string }[]) {
        try {
            this.setLoading(true);
            const url = params.length > 0
                ? `${this.baseUrl}/${endpoint}?${params.map(({ key, value }) => `${key}=${value}`).join("&")}`
                : `${this.baseUrl}/${endpoint}`
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

    async apiRequest(endpoint: string, method: FetchMethod = "GET", body?: object, ...params: { key: string, value: string }[]) {
        await this._apiRequest(endpoint, method, body, ...params);
        this.setLoading(false);
    }

    async apiRequestJson(endpoint: string, method: FetchMethod = "GET", body?: object, ...params: { key: string, value: string }[]) {
        const result = await this._apiRequest(endpoint, method, body, ...params);
        let resultObj
        try {
            resultObj = await result?.json();
        } catch (e) {
            console.error(e);
        }
        this.setLoading(false);
        return resultObj;
    }

    async apiRequestText(endpoint: string, method: FetchMethod = "GET", body?: object, ...params: { key: string, value: string }[]) {
        const result = await this._apiRequest(endpoint, method, body, ...params);
        let resultObj
        try {
            resultObj = await result?.text();
        } catch (e) {
            console.error(e);
        }
        this.setLoading(false);
        return resultObj;
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
        const result = await this.apiRequestJson(`images/${image.Id.replace("sha256:", "")}`, "DELETE", undefined, { key: "force", value: "true" });
        if (result === null)
            throw Error('imageRm has failed');
        return result;
    }

    async containerCreate(image: ImageInfo, ...params: { key: string, value: string }[]): Promise<ServiceCreateResponse> {
        const imageName = image.RepoTags ? image.RepoTags[0] : image.Id.replace("sha256:", "");
        const result = await this.apiRequestJson(`containers/create`, "POST", { Image: imageName });
        if (result === null)
            throw Error('containerRun has failed');
        return result;
    }

    async containerRun(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<void> {
        await this.apiRequest(`containers/${container.Id}/start`, "POST");
    }

    async containerLs(...params: { key: string, value: string }[]): Promise<ContainerInfo[]> {
        const result = await this.apiRequestJson(`containers/json`, undefined, undefined, { key: "all", value: "true" });
        if (result === null)
            throw Error('containerRun has failed');
        return result;
    }

    async containerInspect(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<ContainerInspectInfo> {
        const result = await this.apiRequestJson(`containers/${container.Id}/json`);
        if (result === null)
            throw Error('containerRun has failed');
        return result;
    }

    async containerRestart(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<void> {
        await this.apiRequest(`containers/${container.Id}/restart`, "POST");
    }

    async containerStop(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<void> {
        await this.apiRequest(`containers/${container.Id}/stop`, "POST");
    }

    async containerRm(container: ContainerInfo, ...params: { key: string, value: string }[]): Promise<void> {
        await this.apiRequest(`containers/${container.Id}`, "DELETE", undefined, { key: "force", value: "true" });
    }

    async ping(): Promise<boolean> {
        const result = await this.apiRequestText(`_ping`);
        return result === "OK";
    }
}

export default DockerApi;