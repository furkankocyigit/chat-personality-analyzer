import { NegativePersonality } from './NegativePersonality';
import { PositivePersonality } from './PositivePersonality';

export class Personality {
    personality: PositivePersonality | NegativePersonality;
    percentage: number;

    constructor(personality: PositivePersonality | NegativePersonality, percentage: number) {
        this.personality = personality;
        this.percentage = percentage;
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