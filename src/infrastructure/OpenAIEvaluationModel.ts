import { CLIENTS } from '../config/identifiers';
import { inject, injectable } from 'inversify';
import OpenAI from 'openai';
import { Personality, PersonalityEvaluation } from '../domain.model/PersonalityEvaluation';
import { GetEnumValue } from '../utils/GetEnumKey';
import { MockResult } from './MockResult';

export interface IEvaluationModel {
    evaluateMessages(messages: string[]): PersonalityEvaluation;
}

@injectable()
export class OpenAIEvaluationModel implements IEvaluationModel {
    private openai: OpenAI;

    constructor(@inject(CLIENTS.OpenAIClient) openAIClient: OpenAI) {
        this.openai = openAIClient;
    }

    evaluateMessages(messages: string[]): PersonalityEvaluation {
        const exampleResult = this.feedMessagesToModel(messages);

        const parsedResult: PersonalityEvaluation = JSON.parse(exampleResult);
        const personalities = this.extractPersonalities(parsedResult);
        const evaluationDescriptions = parsedResult.evaluationDescriptions;

        const personaliyEvaluation = new PersonalityEvaluation(personalities, evaluationDescriptions);

        return personaliyEvaluation;
    }

    private extractPersonalities(parsedResult: PersonalityEvaluation) {
        let pesonalityArray: Personality[] = [];

        parsedResult.personalities.map((personality) => {
            const personalityEnum = GetEnumValue(personality.personality);
            const percentage = personality.percentage;
            if (personalityEnum === undefined) return;

            pesonalityArray.push(new Personality(personalityEnum, percentage));
        });

        return pesonalityArray;
    }

    feedMessagesToModel(messages: string[]): string {
        // TODO: OpenAI API call to here. use MockResult as a placeholder for now
        return JSON.stringify(MockResult);
    }
}
