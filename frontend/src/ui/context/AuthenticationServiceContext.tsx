import { AuthenticationService, IAuthenticationService } from '@/services/AuthenticationService';
import { PropsWithChildren, createContext, useContext } from 'react';
import { useHttpClient } from './HttpClientContext';
import {
    AuthenticationRepository,
    IAuthenticationRepository,
} from '@/infrastructure/repository/AuthenticationRepository';
import { BACKEND_HOST } from '@/utils/constants';
import { BackendRoute } from '@/utils/BackendRoute';

export interface IAuthenticationServiceContext {
    authenticationService: IAuthenticationService;
}

const AuthenticationServiceContext = createContext<IAuthenticationServiceContext>({} as IAuthenticationServiceContext);

export const AuthenticationServiceProvider = ({ children }: PropsWithChildren) => {
    const { httpClient } = useHttpClient();
    const authenticationURL = BACKEND_HOST + BackendRoute.LOGIN;
    const authenticationRepository: IAuthenticationRepository = new AuthenticationRepository(
        httpClient,
        authenticationURL
    );
    const authenticationService: IAuthenticationService = new AuthenticationService(authenticationRepository);

    const value = { authenticationService };

    return <AuthenticationServiceContext.Provider value={value}>{children}</AuthenticationServiceContext.Provider>;
};

export const useAuthenticationService = () => {
    return useContext(AuthenticationServiceContext);
};
