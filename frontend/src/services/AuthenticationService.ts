import { IUserSession } from '@/domain/Authentication/UserSession';
import { IAuthenticationRepository } from '@/infrastructure/repository/AuthenticationRepository';

export interface IAuthenticationService {
    login(userName: string, password: string): Promise<IUserSession>;
}

export class AuthenticationService implements IAuthenticationService {
    private readonly authenticationRepository: IAuthenticationRepository;

    constructor(authenticationRepository: IAuthenticationRepository) {
        this.authenticationRepository = authenticationRepository;
    }

    async login(userName: string, password: string): Promise<IUserSession> {
        const loginSuccessful = await this.authenticationRepository.login(userName, password);
        return loginSuccessful;
    }
}
