import { injectable } from 'inversify';

export interface ITextSaver {
    addSingleText(text: string): boolean;
    addMultipleTexts(texts: string[]): boolean;
    getAllTexts(): string[];
    clearTexts(): void;
}

@injectable()
export class MemoryTextSaver implements ITextSaver {
    private texts: string[];

    constructor() {
        this.texts = [];
    }
    addSingleText(text: string) {
        if (!text || text === undefined || text === null) throw new Error('Text could not be added to collection');
        this.texts.push(text);
        return true;
    }

    addMultipleTexts(texts: string[]) {
        if (!texts || texts === undefined || texts === null) throw new Error('Text array not be added to collection');
        this.texts.push(...texts);
        return true;
    }

    getAllTexts() {
        return this.texts;
    }

    clearTexts() {
        this.texts = [];
    }
}
