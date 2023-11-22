import { Request, Response } from 'express';

import { ITextService } from '../../domain.services/TextService';
import { SERVICES } from '../../config/identifiers';
import { inject, injectable } from 'inversify';
import { HttpStatusCode } from '../StatusMessages';
export interface ITextController {
    addText(req: Request, res: Response, next: Function): void;
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
}
