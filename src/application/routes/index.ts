import { Router } from 'express';
import textRouter from './TextRouter';

const router = Router();

const defaultRoutes = [
    {
        path: '/text',
        route: textRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
