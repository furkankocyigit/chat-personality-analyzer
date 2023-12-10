import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { SERVICES } from '../../../config/identifiers';
import { IUserController } from './IUserController';
import { IUserService } from '../../../domain.services';
@injectable()
export class UserController implements IUserController {
    constructor(@inject(SERVICES.UserService) private userService: IUserService) {}

    async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.userService.getAllUsersInDm();

            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(users));
        } catch (err) {
            next(err);
        }
    }
}
