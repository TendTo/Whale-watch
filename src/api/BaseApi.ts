export type genericObject = {
    [key: string]: any
};

class BaseApi {
    constructor(public protocol: "https" | "http", public host: string, public port: number) { }

    get baseUrl(): string {
        return `${this.protocol}://${this.host}${this.port ? ":" + this.port : ""}`
    }

    protected apiRequest(path?: string, method: string = "GET", queryParams?: genericObject, body?: genericObject) {
        let url = path ? `${this.baseUrl}/${path}` : this.baseUrl;
        if (queryParams) {
            url += `?${this.queryStringify(queryParams)}`;
        }
        return this.request(url, method, body);
    }

    private request(url: string, method: string = "GET", body?: genericObject) {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        let options: RequestInit = { headers: headers, method: method };
        if (body) {
            options.body = JSON.stringify(body);
        }

        console.debug(`Fetch - ${method} - ${url}`);
        return fetch(url, options);
    }

    protected handleError(error: Response) {
        if (error === undefined || error === null) throw Error("No response");
        const errMsg = error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        throw Error(errMsg);
    }

    private queryStringify(obj: genericObject) {
        let str = [];
        for (let p in obj) {
            if (obj.hasOwnProperty(p) && obj[p] !== null && obj[p] !== undefined) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    }
}
export default BaseApi;