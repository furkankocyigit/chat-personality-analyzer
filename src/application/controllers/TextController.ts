import { Request, Response } from 'express';

import { ITextService } from '../../domain.services/TextService';
import { SERVICES } from '../../config/identifiers';
import { inject, injectable } from 'inversify';
import { HttpStatusCode } from '../StatusMessages';
export interface ITextController {
    addText(req: Request, res: Response, next: Function): void;
    getAllTexts(req: Request, res: Response, next: Function): void;
    addTextGroup(req: Request, res: Response, next: Function): void;
    clearTexts(req: Request, res: Response, next: Function): void;
}

@injectable()
export class TextController implements ITextController {
    private textService: ITextService;

    constructor(@inject(SERVICES.TextService) service: ITextService) {
        this.textService = service;
    }

    async addText(req: Request, res: Response, next: Function) {
        try {
            const message = req.body.message;
            this.textService.addText(message);
            res.status(HttpStatusCode.OK).send({ message: 'Text added successfully' });
        } catch (err) {
            next(err);
        }
    }

    async getAllTexts(req: Request, res: Response, next: Function) {
        try {
            const texts = this.textService.getAllTexts();
            res.status(HttpStatusCode.OK).send({ texts });
        } catch (err) {
            next(err);
        }
    }

    //TODO: Validation needed here. This string array manipulation should be improved.
    async addTextGroup(req: Request, res: Response, next: Function) {
        try {
            const messages: string = req.body.messages;
            const formattedMessages = messages.split(',').map((message) => {
                return message.replace(/"/g, '');
            });
            this.textService.addTextGroup(formattedMessages);
            res.status(HttpStatusCode.OK).send({ message: 'Texts added successfully' });
        } catch (err) {
            next(err);
        }
    }

    async clearTexts(req: Request, res: Response, next: Function) {
        try {
            this.textService.clearTexts();
            res.status(HttpStatusCode.OK).send({ message: 'Texts cleared successfully' });
        } catch (err) {
            next(err);
        }
    }
}
