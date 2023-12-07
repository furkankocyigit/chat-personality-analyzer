import { PersonalityEvaluation } from '@/domain/PersonalityEvaluation';
import { IHttpClient } from '../httpClient/IHttpClient';
import { plainToInstance } from 'class-transformer';
import { BackendRoute } from '@/infrastructure/BackendRoutes/BackendRoute';

export interface IEvaluationRepository {
    getEvaluationForUser(userName: string): Promise<PersonalityEvaluation>;
    getSummarizedEvaluationForUser(userName: string): Promise<PersonalityEvaluation>;
}

export class EvaluationRepository implements IEvaluationRepository {
    private readonly httpClient: IHttpClient;
    private readonly evaluationUrl: string;

    constructor(httpClient: IHttpClient, evaluationUrl: string) {
        this.httpClient = httpClient;
        this.evaluationUrl = evaluationUrl;
    }
    async getEvaluationForUser(userName: string): Promise<PersonalityEvaluation> {
        const response = this.httpClient.get(this.evaluationUrl + '/' + userName);
        const evaluation = plainToInstance(PersonalityEvaluation, response);
        return evaluation;
    }
    async getSummarizedEvaluationForUser(userName: string): Promise<PersonalityEvaluation> {
        const response = this.httpClient.get(this.evaluationUrl + BackendRoute.SUMMARIZED + '/' + userName);
        const summarizedEvaluation = plainToInstance(PersonalityEvaluation, response);
        return summarizedEvaluation;
    }
}
