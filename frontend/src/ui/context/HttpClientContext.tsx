import { AxiosClient } from '@/infrastructure/httpClient/AxiosClient';
import { IHttpClient } from '@/infrastructure/httpClient/IHttpClient';
import axios from 'axios';
import React, { PropsWithChildren, useContext, createContext } from 'react';

const baseURL = '';

export interface IHttpClientContext {
    httpClient: IHttpClient;
}

const HttpClientContext = createContext<IHttpClientContext>({} as IHttpClientContext);

const axiosInstance = axios.create({ baseURL: baseURL });
const httpClient: IHttpClient = new AxiosClient(axiosInstance);

export const HTTPClientProvider = ({ children }: PropsWithChildren) => {
    const value = { httpClient };

    return <HttpClientContext.Provider value={value}>{children}</HttpClientContext.Provider>;
};

export const useHttpClient = () => useContext(HttpClientContext);
