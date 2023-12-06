import { AuthenticationOptions, UserSession } from '../../domain.model';

export interface IAuthenticationService {
    authenticate(options: AuthenticationOptions): Promise<UserSession>;
    //logout(userID: string | number): Promise<void>;
}
