import { inject, injectable } from 'inversify';
import { ITextSaver } from '../infrastructure/MemoryTextSaver';
import { REPOSITORIES } from '../config/identifiers';

export interface ITextService {
    addText(message: string): boolean;
    getAllTexts(): string[];
    addTextGroup(messages: string[]): boolean;
    clearTexts(): void;
}

@injectable()
export class TextService implements ITextService {
    private textRepository: ITextSaver;

    constructor(@inject(REPOSITORIES.MemoryTextSaver) textRepository: ITextSaver) {
        this.textRepository = textRepository;
    }

    addText(message: string): boolean {
        return this.textRepository.addSingleText(message);
    }

    getAllTexts(): string[] {
        return this.textRepository.getAllTexts();
    }

    addTextGroup(messages: string[]): boolean {
        return this.textRepository.addMultipleTexts(messages);
    }

    clearTexts(): void {
        this.textRepository.clearTexts();
    }
}
