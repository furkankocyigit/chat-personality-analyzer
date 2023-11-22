import { Router } from 'express';
import { CONTROLLERS } from '../../config/identifiers';
import { ITextController } from '../controllers/TextController';
import { DIcontainer } from '../../config/inversify.config';

const textRouter = Router();

const textController: ITextController = DIcontainer.get<ITextController>(CONTROLLERS.TextController);

textRouter.post('/', textController.addText.bind(textController));

export default textRouter;
