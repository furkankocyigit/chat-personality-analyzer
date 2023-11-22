import { inject, injectable } from 'inversify';
import { IEvaluationModel } from '../infrastructure/OpenAIEvaluationModel';
import { REPOSITORIES } from '../config/identifiers';

export interface IEvaluationService {
    getEvaluationResult(): string;
}

@injectable()
export class EvaluationService implements IEvaluationService {
    private evaluationModel: IEvaluationModel;

    constructor(@inject(REPOSITORIES.OpenAIEvaluationModel) evaluationModel: IEvaluationModel) {
        this.evaluationModel = evaluationModel;
    }

    getEvaluationResult(): string {
        return this.evaluationModel.getEvaluationResult();
    }
}
