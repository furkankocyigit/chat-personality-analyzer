import express, { Request, Response, NextFunction } from 'express';
import routes from './application/routes';
import { ErrorLogger, ErrorResponder, InvalidRouteHandler } from './application/middleware/ErrorHandler';
import { Cors } from './application/middleware/Cors';

const app = express();

// enable cors
app.use(Cors);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', routes);

// error handling
app.use(ErrorLogger);
app.use(ErrorResponder);
app.use(InvalidRouteHandler);

export default app;
