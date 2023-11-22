import { inject, injectable } from 'inversify';
import { IEvaluationModel } from '../infrastructure/OpenAIEvaluationModel';
import { REPOSITORIES } from '../config/identifiers';
import { PersonalityEvaluation } from '../domain.model/PersonalityEvaluation';

export interface IEvaluationService {
    evaluate(messageArray: string[]): PersonalityEvaluation;
}

@injectable()
export class EvaluationService implements IEvaluationService {
    private evaluationModel: IEvaluationModel;

    constructor(@inject(REPOSITORIES.OpenAIEvaluationModel) evaluationModel: IEvaluationModel) {
        this.evaluationModel = evaluationModel;
    }

    evaluate(messageArray: string[]): PersonalityEvaluation {
        return this.evaluationModel.evaluateMessages(messageArray);
    }
}
