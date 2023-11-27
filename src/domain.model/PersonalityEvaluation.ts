import { Personality } from './Personality';

export class PersonalityEvaluation {
    personalities: Personality[];
    evaluationDescriptions: string;

    constructor(personalities: Personality[], evaluationDescriptions: string) {
        this.personalities = personalities;
        this.evaluationDescriptions = evaluationDescriptions;
    }
}
