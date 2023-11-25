import { CLIENTS } from '../config/identifiers';
import { inject, injectable } from 'inversify';
import OpenAI from 'openai';
import { Personality, PersonalityEvaluation } from '../domain.model/PersonalityEvaluation';
import { GetEnumValue } from '../utils/GetEnumKey';
import { EvaluationFormat } from '../domain.model/EvaluationFormat';

export interface IEvaluationModel {
    evaluateMessages(messages: string[]): Promise<PersonalityEvaluation>;
}

@injectable()
export class OpenAIEvaluationModel implements IEvaluationModel {
    private openai: OpenAI;
    private model: string = 'gpt-4-1106-preview';

    constructor(@inject(CLIENTS.OpenAIClient) openAIClient: OpenAI) {
        this.openai = openAIClient;
    }

    async evaluateMessages(messages: string[]): Promise<PersonalityEvaluation> {
        const modelResult = await this.feedMessagesToModel(messages);
        console.log(modelResult);

        const parsedResult: PersonalityEvaluation = JSON.parse(modelResult);
        const personalities = this.extractPersonalities(parsedResult);
        const evaluationDescriptions = parsedResult.evaluationDescriptions;

        const personaliyEvaluation = new PersonalityEvaluation(personalities, evaluationDescriptions);

        return personaliyEvaluation;
    }

    private extractPersonalities(parsedResult: PersonalityEvaluation) {
        let pesonalityArray: Personality[] = [];

        parsedResult.personalities.map((personality) => {
            const personalityEnum = GetEnumValue(personality.personality);
            const score = personality.score;
            if (personalityEnum === undefined) return;

            pesonalityArray.push(new Personality(personalityEnum, score));
        });

        return pesonalityArray;
    }

    async feedMessagesToModel(messages: string[]): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: this.model,
            response_format: { type: 'json_object' },
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful assistant designed to output JSON.`,
                },
                {
                    role: 'system',
                    content: `You always return JSON format compatible with ${JSON.stringify(
                        EvaluationFormat
                    )}. NO EXCEPTION.`,
                },

                {
                    role: 'user',
                    content: `Provide an analysis of the individual's personality based on these exhibited traits and their respective score(min: 0, max: 1). Messages: ${messages}`,
                },
            ],
        });
        if (
            response.choices === undefined ||
            response.choices.length === 0 ||
            response.choices[0].message === undefined ||
            response.choices[0].message.content === undefined ||
            response.choices[0].message.content === null
        ) {
            throw new Error('OpenAI model could not return a message content');
        }
        return response.choices[0].message.content;
    }
}
