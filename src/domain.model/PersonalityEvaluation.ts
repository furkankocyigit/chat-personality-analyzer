import { NegativePersonality } from './NegativePersonality';
import { PositivePersonality } from './PositivePersonality';

export class Personality {
    personality: PositivePersonality | NegativePersonality;
    score: number;

    constructor(personality: PositivePersonality | NegativePersonality, score: number) {
        this.personality = personality;
        this.score = score;
    }
}

export class PersonalityEvaluation {
    personalities: Personality[];
    evaluationDescriptions: string;

    constructor(personalities: Personality[], evaluationDescriptions: string) {
        this.personalities = personalities;
        this.evaluationDescriptions = evaluationDescriptions;
    }
}
