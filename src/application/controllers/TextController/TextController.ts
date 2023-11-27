import { Request, Response, NextFunction } from 'express';
import { ITextService } from '../../../domain.services/TextService';
import { SERVICES } from '../../../config/identifiers';
import { inject, injectable } from 'inversify';
import { StatusCode, ErrorWithCode } from '../../../utils';
import { ITextController } from './ITextController';

@injectable()
export class TextController implements ITextController {
    private textService: ITextService;

    constructor(@inject(SERVICES.TextService) service: ITextService) {
        this.textService = service;
    }

    async addText(req: Request, res: Response, next: NextFunction) {
        try {
            const message = req.body.message;
            this.textService.addText(message);
            res.status(StatusCode.OK).send({ message: 'Text added successfully' });
        } catch (err) {
            next(err);
        }
    }

    async getAllTexts(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.params;
            if (!username) throw new ErrorWithCode('Please Provide User name to get all texts', StatusCode.BAD_REQUEST);

            const texts = await this.textService.getAllTexts(username);
            res.status(StatusCode.OK).send({ texts });
        } catch (err) {
            next(err);
        }
    }

    //TODO: Validation needed here. This string array manipulation should be improved.
    async addTextGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const messages: string = req.body.messages;
            const formattedMessages = messages.split(',').map((message) => {
                return message.replace(/"/g, '');
            });
            this.textService.addTextGroup(formattedMessages);
            res.status(StatusCode.OK).send({ message: 'Texts added successfully' });
        } catch (err) {
            next(err);
        }
    }

    async clearTexts(req: Request, res: Response, next: Function) {
        try {
            this.textService.clearTexts();
            res.status(StatusCode.OK).send({ message: 'Texts cleared successfully' });
        } catch (err) {
            next(err);
        }
    }
}
