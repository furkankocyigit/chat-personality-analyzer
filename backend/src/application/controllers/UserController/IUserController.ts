import { NextFunction, Request, Response } from 'express';

export interface IUserController {
    getAllUser(req: Request, res: Response, next: NextFunction): Promise<void>;
}
