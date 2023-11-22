import { Router } from 'express';
import { DIcontainer } from '../../config/inversify.config';
import { IEvaluationController } from '../controllers/EvaluationController';
import { CONTROLLERS } from '../../config/identifiers';

const evaluationRouter = Router();

const evaluationController = DIcontainer.get<IEvaluationController>(CONTROLLERS.EvaluationController);

evaluationRouter.get('/', evaluationController.getEvaluationResult.bind(evaluationController));

export default evaluationRouter;