import { BackendRoute } from '../BackendRoutes/BackendRoute';
import { IHttpClient } from './IHttpClient';
import { AxiosInstance } from 'axios';

export class AxiosClient implements IHttpClient {
    private readonly axios: AxiosInstance;

    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async get(url: string): Promise<unknown> {
        const headers = this.getHeaderWithToken();
        const response = await this.axios.get(url, { headers });

        return response.data;
    }

    async post(url: string, body: unknown): Promise<unknown> {
        if (String(url).includes(BackendRoute.LOGIN))
            return await this.axios.post(url, body).then((response) => response.data);

        const headers = this.getHeaderWithToken();

        const response = await this.axios.post(url, body, { headers });
        return response.data;
    }
    put(url: string, body: unknown): Promise<unknown> {
        throw new Error('Method not implemented.');
    }
    delete(url: string): Promise<unknown> {
        throw new Error('Method not implemented.');
    }

    private getHeaderWithToken() {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('No token found');
        }
        const headers = { Authorization: `Bearer ${token}` };
        return headers;
    }
}
