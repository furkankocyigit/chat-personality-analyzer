import { AuthenticationOptions } from '../../domain.model/authentication/AuthenticationOptions';
import { UserSession } from '../../domain.model/authentication/UserSession';

export interface IAuthenticationService {
    authenticate(options: AuthenticationOptions): Promise<UserSession>;
    //logout(userID: string | number): Promise<void>;
}
