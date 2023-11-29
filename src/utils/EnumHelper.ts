import { NegativePersonality, PositivePersonality, Personality } from '../domain.model';

export class EnumHelper {
    static GetEnumValue = (enumString: string): PositivePersonality | NegativePersonality | undefined => {
        const enums = [PositivePersonality, NegativePersonality];

        for (const enumItem of enums) {
            const enumKeys = Object.keys(enumItem).filter(
                (key) => typeof enumItem[key as keyof typeof enumItem] === 'string'
            );

            for (const key of enumKeys) {
                if (enumItem[key as keyof typeof enumItem] === enumString) {
                    return enumItem[key as keyof typeof enumItem];
                }
            }
        }

        return undefined; // this personality does not exist in our system so do not show it to user
    };

    static isMatchinEnum = (personality: Personality, enumType: any): boolean => {
        const enumKeys = Object.keys(enumType);
        return enumKeys.includes(personality.personality);
    };

    static determinePersonality = (personality: Personality): string => {
        if (this.isMatchinEnum(personality, PositivePersonality)) return 'PositivePersonality';
        else if (this.isMatchinEnum(personality, NegativePersonality)) return 'NegativePersonality';
        else return 'UnknownPersonality';
    };
}
