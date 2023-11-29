import { Router } from 'express';
import { DIcontainer } from '../../../backend/src/config/inversify.config';
import { IEvaluationController } from '../controllers';
import { CONTROLLERS } from '../../../backend/src/config/identifiers';

const evaluationRouter = Router();

const evaluationController = DIcontainer.get<IEvaluationController>(CONTROLLERS.EvaluationController);

evaluationRouter.get('/:username', evaluationController.getExtendedEvaluation.bind(evaluationController));
evaluationRouter.get('/summarized/:username', evaluationController.getSummarizedEvaluation.bind(evaluationController));

export default evaluationRouter;
