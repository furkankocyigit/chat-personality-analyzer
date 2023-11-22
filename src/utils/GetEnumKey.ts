import { ErrorWithCode } from '../application/HttpStatusCodes/ErrorWithCode';
import { HttpStatusCode } from '../application/HttpStatusCodes/StatusMessages';
import { NegativePersonality } from '../domain.model/NegativePersonality';
import { PositivePersonality } from '../domain.model/PositivePersonality';

export const GetEnumValue = (enumString: string): PositivePersonality | NegativePersonality | undefined => {
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
