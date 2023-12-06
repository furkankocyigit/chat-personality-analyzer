import { NextFunction, Request, Response } from 'express';
import { ErrorWithCode, StatusCode } from '../../utils';

export const ErrorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    next(err);
};

export const ErrorResponder = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.header('Content-Type', 'application/json');

    const errWithCode = err as ErrorWithCode;
    const statusCode = errWithCode.code || StatusCode.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({ message: err?.message || 'Internal Server Error' });
};

export const InvalidRouteHandler = (req: Request, res: Response) => {
    res.status(StatusCode.BAD_REQUEST).json({ ErrorMessage: `Invalid Route: ${req.url}` });
};
