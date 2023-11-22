import { Router } from 'express';
import { CONTROLLERS } from '../../config/identifiers';
import { ITextController } from '../controllers/TextController';
import { DIcontainer } from '../../config/inversify.config';

const textRouter = Router();

const textController: ITextController = DIcontainer.get<ITextController>(CONTROLLERS.TextController);

textRouter.post('/', textController.addText.bind(textController));
textRouter.post('/group', textController.addTextGroup.bind(textController));
textRouter.get('/', textController.getAllTexts.bind(textController));
textRouter.get('/clear', textController.clearTexts.bind(textController));

export default textRouter;
