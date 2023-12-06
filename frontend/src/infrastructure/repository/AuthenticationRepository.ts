import { IUserSession, UserSession } from '@/domain/Authentication/UserSession';
import { IHttpClient } from '../httpClient/IHttpClient';
import { plainToClass } from 'class-transformer';

export interface IAuthenticationRepository {
    login(userName: string, password: string): Promise<IUserSession>;
}
export class AuthenticationRepository implements IAuthenticationRepository {
    private readonly httpClient;
    private readonly authenticationUrl;

    constructor(httpClient: IHttpClient, authenticationUrl: string) {
        this.httpClient = httpClient;
        this.authenticationUrl = authenticationUrl;
    }

    async login(userName: string, password: string): Promise<IUserSession> {
        const authenticaitonResponse = await this.httpClient.post(this.authenticationUrl, { userName, password });

        const session = plainToClass(UserSession, authenticaitonResponse);

        return session;
    }
}
