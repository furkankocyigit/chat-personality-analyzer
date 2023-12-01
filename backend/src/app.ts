import express, { Request, Response, NextFunction } from 'express';
import routes from './application/routes';
import { ErrorHandlingMiddleware } from './utils/ErrorHandler';

const app = express();

// enable cors
app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key'
    );
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', routes);

app.use(ErrorHandlingMiddleware);

export default app;
