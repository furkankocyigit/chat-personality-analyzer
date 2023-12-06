import { Router } from 'express';
import { CONTROLLERS } from '../../config/identifiers';
import { ITextController } from '../controllers';
import { DIcontainer } from '../../config/inversify.config';
import { Auth } from '../middleware';

const textRouter = Router();

const textController: ITextController = DIcontainer.get<ITextController>(CONTROLLERS.TextController);

textRouter.post('/', Auth, textController.addText.bind(textController));
textRouter.post('/group', Auth, textController.addTextGroup.bind(textController));
textRouter.get('/:username', Auth, textController.getAllTexts.bind(textController));
textRouter.get('/clear', Auth, textController.clearTexts.bind(textController));

export default textRouter;
