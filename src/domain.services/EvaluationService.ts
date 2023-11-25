import { inject, injectable } from 'inversify';
import { IEvaluationModel } from '../infrastructure/OpenAIEvaluationModel';
import { REPOSITORIES } from '../config/identifiers';
import { PersonalityEvaluation } from '../domain.model/PersonalityEvaluation';

export interface IEvaluationService {
    evaluate(messageArray: string[]): Promise<PersonalityEvaluation>;
}

@injectable()
export class EvaluationService implements IEvaluationService {
    private evaluationModel: IEvaluationModel;

    constructor(@inject(REPOSITORIES.OpenAIEvaluationModel) evaluationModel: IEvaluationModel) {
        this.evaluationModel = evaluationModel;
    }

    async evaluate(messageArray: string[]): Promise<PersonalityEvaluation> {
        return await this.evaluationModel.evaluateMessages(messageArray);
    }
}
