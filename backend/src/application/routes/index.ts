import { Router } from 'express';
import textRouter from './TextRouter';
import evaluationRouter from './EvaluationRouter';

const router = Router();

const defaultRoutes = [
    {
        path: '/text',
        route: textRouter,
    },
    {
        path: '/evaluate',
        route: evaluationRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
