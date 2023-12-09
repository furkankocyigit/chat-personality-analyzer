import { CONTROLLERS } from '../../config/identifiers';
import { DIcontainer } from '../../config/inversify.config';
import { IUserController } from '../controllers';
import { Auth } from '../middleware';
import { Router } from 'express';

const userRouter = Router();

const userController: IUserController = DIcontainer.get<IUserController>(CONTROLLERS.UserController);

userRouter.get('/', Auth, userController.getAllUser.bind(userController));

export default userRouter;
