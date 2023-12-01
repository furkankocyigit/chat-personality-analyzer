import { IHttpClient } from './IHttpClient';
import { AxiosInstance } from 'axios';

export class AxiosClient implements IHttpClient {
    private readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async get(url: string): Promise<unknown> {
        const response = await this.axios.get(url);
        return response.data;
    }
    post(url: string, body: unknown): Promise<unknown> {
        throw new Error('Method not implemented.');
    }
    put(url: string, body: unknown): Promise<unknown> {
        throw new Error('Method not implemented.');
    }
    delete(url: string): Promise<unknown> {
        throw new Error('Method not implemented.');
    }
}
