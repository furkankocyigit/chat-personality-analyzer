import { inject, injectable } from 'inversify';
import { IEvaluationModel } from '../../infrastructure';
import { REPOSITORIES } from '../../config/identifiers';
import { PersonalityEvaluation } from '../../domain.model';
import { EnumHelper } from '../../utils';
import { IEvaluationService } from './IEvaluationService';

@injectable()
export class EvaluationService implements IEvaluationService {
    private evaluationModel: IEvaluationModel;
    private summaryPersonalityNumber: number = 3;
    constructor(@inject(REPOSITORIES.OpenAIEvaluationModel) evaluationModel: IEvaluationModel) {
        this.evaluationModel = evaluationModel;
    }

    async extendedEvaluation(messageArray: string[]): Promise<PersonalityEvaluation> {
        return await this.evaluationModel.evaluateMessages(messageArray);
    }

    async summarizedEvaluation(messageArray: string[]): Promise<PersonalityEvaluation> {
        const extendedEvaluation = await this.extendedEvaluation(messageArray);

        const sortedPersonalities = this.sortPersonalities(extendedEvaluation);
        const summarizedPersonalities = this.summarize(sortedPersonalities, this.summaryPersonalityNumber);

        return summarizedPersonalities;
    }

    summarize(evaluation: PersonalityEvaluation, summaryNumber: number): PersonalityEvaluation {
        const topNegativePersonalities = evaluation.personalities
            .filter((personality) => {
                return EnumHelper.determinePersonality(personality) === 'NegativePersonality';
            })
            .slice(0, summaryNumber);

        const topPositivePersonalities = evaluation.personalities
            .filter((personality) => {
                return EnumHelper.determinePersonality(personality) === 'PositivePersonality';
            })
            .slice(0, summaryNumber);

        const summarizedPersonalities = topNegativePersonalities?.concat(topPositivePersonalities);

        return new PersonalityEvaluation(summarizedPersonalities, evaluation.evaluationDescriptions);
    }

    sortPersonalities(evaluation: PersonalityEvaluation): PersonalityEvaluation {
        const sortedPersonalities = evaluation.personalities.sort((a, b) => {
            return b.score - a.score;
        });

        return new PersonalityEvaluation(sortedPersonalities, evaluation.evaluationDescriptions);
    }
}
