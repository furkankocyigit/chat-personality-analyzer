import { inject, injectable } from 'inversify';
import { ITextSaver } from '../infrastructure/MemoryTextSaver';
import { REPOSITORIES } from '../config/identifiers';

export interface ITextService {
    addText(message: string): boolean;
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
}
