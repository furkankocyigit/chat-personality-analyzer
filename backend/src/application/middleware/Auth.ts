import { Request, Response, NextFunction } from 'express';
import { EnvExporter, ErrorWithCode, StatusCode } from '../../utils';
import jwt from 'jsonwebtoken';

const AccesToken = EnvExporter.export('ACCESS_TOKEN');

export const Auth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const token = validateTokenHeader(req);

        jwt.verify(token, AccesToken, (err, user) => {
            if (err) {
                throw new ErrorWithCode(`Unsuccessfull verification: ${err.message}`, StatusCode.UNAUTHORIZED);
            }
            req.body.user = user;
        });
        next();
    } catch (err) {
        next(err);
    }
};

function validateTokenHeader(req: Request) {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) throw new ErrorWithCode('No token provided', StatusCode.UNAUTHORIZED);

    if (!bearerToken.startsWith('Bearer ')) throw new ErrorWithCode('Invalid token', StatusCode.UNAUTHORIZED);

    const split = bearerToken.split('Bearer ');
    if (split.length !== 2) throw new ErrorWithCode('unrecognized token format', StatusCode.UNAUTHORIZED);

    const token = split[1];

    return token;
}
