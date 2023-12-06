import { IgApiClient } from 'instagram-private-api';
import { AuthenticationOptions, UserSession } from '../../domain.model';
import { IAuthenticationService } from './IAuthenticationService';
import { inject, injectable } from 'inversify';
import { CLIENTS } from '../../config/identifiers';
import jwt from 'jsonwebtoken';
import { EnvExporter, ErrorWithCode, StatusCode } from '../../utils';

const AccesToken = EnvExporter.export('ACCESS_TOKEN');
const RefreshToken = EnvExporter.export('REFRESH_TOKEN');

@injectable()
export class AuthenticationServiceInstgram implements IAuthenticationService {
    private ig: IgApiClient;

    constructor(@inject(CLIENTS.IgApiClient) ig: IgApiClient) {
        this.ig = ig;
    }

    async authenticate(options: AuthenticationOptions): Promise<UserSession> {
        if (options.userName === undefined)
            throw new Error('Instgram account cannot be authenticated without username');

        const authenticatedUser = await this.login(options.userName, options.password);

        const userSession: UserSession = {
            userID: authenticatedUser.pk,
            accessToken: jwt.sign(authenticatedUser, AccesToken, { expiresIn: '1h' }),
            refreshToken: jwt.sign(authenticatedUser, RefreshToken, { expiresIn: '30m' }),
            isVerified: true,
        };

        return userSession;
    }

    private async login(igUserName: string, igPassword: string) {
        try {
            this.ig.state.generateDevice(igUserName);
            return await this.ig.account.login(igUserName, igPassword);
        } catch (err: any) {
            throw new ErrorWithCode(
                `user '${igUserName}' could not be authenticated.${err.message}`,
                StatusCode.UNAUTHORIZED
            );
        }
    }
}
