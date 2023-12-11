import { IUserService, UserService } from '@/services/UserService';
import { useHttpClient } from '.';
import { IUserRepository, UserRepository } from '@/infrastructure/repository/UserRepository';
import { BACKEND_HOST } from '@/utils/constants';
import { BackendRoute } from '@/utils/BackendRoute';
import { PropsWithChildren, createContext, useContext } from 'react';

export interface IUserServiceContext {
    userService: IUserService;
}

const UserServiceContext = createContext<IUserServiceContext>({} as IUserServiceContext);

export const UserServiceProvider = ({ children }: PropsWithChildren) => {
    const { httpClient } = useHttpClient();
    const userURL = BACKEND_HOST + BackendRoute.USERS;
    const userRepository: IUserRepository = new UserRepository(httpClient, userURL);
    const userService: IUserService = new UserService(userRepository);

    const value = { userService };

    return <UserServiceContext.Provider value={value}>{children}</UserServiceContext.Provider>;
};

export const useUserService = () => {
    return useContext(UserServiceContext);
};
