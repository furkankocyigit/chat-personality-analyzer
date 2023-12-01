import { PositivePersonality } from './PositivePersonality';
import { NegativePersonality } from './NegativePersonality';
export class Personality {
    personality: PositivePersonality | NegativePersonality;
    score: number;

    constructor(personality: PositivePersonality | NegativePersonality, score: number) {
        this.personality = personality;
        this.score = score;
    }
}
