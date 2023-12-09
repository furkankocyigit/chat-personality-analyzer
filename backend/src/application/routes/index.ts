import { Router } from 'express';
import textRouter from './TextRouter';
import evaluationRouter from './EvaluationRouter';
import authentiacationRouter from './AuthenticationRoter';
import userRouter from './UserRoute';

const router = Router();

const defaultRoutes = [
    {
        path: '',
        route: authentiacationRouter,
    },
    {
        path: '/text',
        route: textRouter,
    },
    {
        path: '/evaluate',
        route: evaluationRouter,
    },
    {
        path: '/users',
        route: userRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
