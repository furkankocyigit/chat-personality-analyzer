import { PersonalityEvaluation } from '../../domain.model';

export interface IEvaluationModel {
    evaluateMessages(messages: string[]): Promise<PersonalityEvaluation>;
}
