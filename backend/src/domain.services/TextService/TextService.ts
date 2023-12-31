import { inject, injectable } from 'inversify';
import { ITextRepository } from '../../infrastructure';
import { REPOSITORIES } from '../../config/identifiers';
import { ITextService } from './ITextService';

@injectable()
export class TextService implements ITextService {
    private textRepository: ITextRepository;

    constructor(@inject(REPOSITORIES.MemoryTextSaver) textRepository: ITextRepository) {
        this.textRepository = textRepository;
    }

    addText(message: string): boolean {
        return this.textRepository.addSingleText(message);
    }

    getAllTexts(userName: string): string[] | Promise<string[]> {
        return this.textRepository.getAllTexts(userName);
    }

    addTextGroup(messages: string[]): boolean {
        return this.textRepository.addMultipleTexts(messages);
    }

    clearTexts(): void {
        this.textRepository.clearTexts();
    }
}
