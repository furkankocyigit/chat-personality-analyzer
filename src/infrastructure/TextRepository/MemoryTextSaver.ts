import { injectable } from 'inversify';
import { ITextRepository } from './ITextRepository';

@injectable()
export class MemoryTextSaver implements ITextRepository {
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

    getAllTexts(username: string): string[] | Promise<string[]> {
        return this.texts;
    }

    clearTexts() {
        this.texts = [];
    }
}
