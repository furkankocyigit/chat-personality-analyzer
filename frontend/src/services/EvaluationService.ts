import { PersonalityEvaluation } from '@/domain/PersonalityEvaluation';
import { IEvaluationRepository } from '@/infrastructure/repository/EvaluationRepository';

export interface IEvaluationService {
    getEvaluationForUser(userName: string): Promise<PersonalityEvaluation>;
    getSummarizedEvaluationForUser(userName: string): Promise<PersonalityEvaluation>;
}

export class EvaluationService implements IEvaluationService {
    private readonly evaluationRepository: IEvaluationRepository;

    constructor(evaluationRepository: IEvaluationRepository) {
        this.evaluationRepository = evaluationRepository;
    }

    async getEvaluationForUser(userName: string): Promise<PersonalityEvaluation> {
        const evaluation = await this.evaluationRepository.getEvaluationForUser(userName);
        return evaluation;
    }

    async getSummarizedEvaluationForUser(userName: string): Promise<PersonalityEvaluation> {
        const summarizedEvaluation = await this.evaluationRepository.getSummarizedEvaluationForUser(userName);
        return summarizedEvaluation;
    }
}
