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
