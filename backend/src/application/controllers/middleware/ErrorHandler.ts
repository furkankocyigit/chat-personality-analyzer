import { NextFunction, Request, Response } from 'express';
import { ErrorWithCode, StatusCode } from '../../../utils';

export const ErrorHandlingMiddleware = (err: ErrorWithCode, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    const errWithCode = err as ErrorWithCode;
    const statusCode = errWithCode.code || StatusCode.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({ message: err?.message || 'Internal Server Error' });
};
