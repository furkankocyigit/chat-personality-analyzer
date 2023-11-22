import { CLIENTS } from '../config/identifiers';
import { inject, injectable } from 'inversify';
import OpenAI from 'openai';

export interface IEvaluationModel {
    getEvaluationResult(): string;
}

@injectable()
export class OpenAIEvaluationModel implements IEvaluationModel {
    private openai: OpenAI;

    constructor(@inject(CLIENTS.OpenAIClient) openAIClient: OpenAI) {
        this.openai = openAIClient;
    }

    getEvaluationResult(): string {
        return 'result';
    }
}
