import { Request, Response, NextFunction } from 'express';
import { IAuthenticationController } from './IAuthenticationController';
import { ErrorWithCode, StatusCode } from '../../../utils';
import { inject, injectable } from 'inversify';
import { SERVICES } from '../../../config/identifiers';
import { IAuthenticationService } from '../../../domain.services';
import { AuthenticationOptions } from '../../../domain.model';

@injectable()
export class AuthenticationController implements IAuthenticationController {
    constructor(@inject(SERVICES.AuthenticationService) private authenticationService: IAuthenticationService) {}

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userName, password } = req.body;
            if (!userName || !password) {
                throw new ErrorWithCode('Please provide username and password', StatusCode.BAD_REQUEST);
            }
            const loginParams: AuthenticationOptions = {
                userName: userName,
                password: password,
            };

            const verifiedUser = await this.authenticationService.authenticate(loginParams);

            res.setHeader('Content-Type', 'application/json');
            res.status(StatusCode.OK).send(JSON.stringify(verifiedUser));
        } catch (err) {
            next(err);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
