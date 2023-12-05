import { Router } from 'express';
import { IAuthenticationController } from '../controllers';
import { CONTROLLERS } from '../../config/identifiers';
import { DIcontainer } from '../../config/inversify.config';

const authentiacationRouter = Router();

const authenticationController = DIcontainer.get<IAuthenticationController>(CONTROLLERS.AuthenticationController);

authentiacationRouter.post('/login', authenticationController.login.bind(authenticationController));

export default authentiacationRouter;
