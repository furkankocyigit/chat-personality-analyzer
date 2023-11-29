import { PersonalityEvaluation } from '../../domain.model';

export interface IEvaluationService {
    extendedEvaluation(messageArray: string[]): Promise<PersonalityEvaluation>;
    summarizedEvaluation(messageArray: string[]): Promise<PersonalityEvaluation>;
}
