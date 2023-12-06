import express from 'express';
import routes from './application/routes';
import { ErrorLogger, ErrorResponder, InvalidRouteHandler, Cors } from './application/middleware';

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
