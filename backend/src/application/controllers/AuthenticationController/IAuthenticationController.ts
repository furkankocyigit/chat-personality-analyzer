import { NextFunction, Request, Response } from 'express';
export interface IAuthenticationController {
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
