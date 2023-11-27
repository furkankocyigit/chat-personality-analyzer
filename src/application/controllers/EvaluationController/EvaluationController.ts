import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { IEvaluationService } from '../../../domain.services/EvaluationService';
import { SERVICES } from '../../../config/identifiers';
import { StatusCode } from '../../HttpStatusCodes/StatusMessages';
import { ITextService } from '../../../domain.services/TextService';
import { ErrorWithCode } from '../../HttpStatusCodes/ErrorWithCode';
import { IEvaluationController } from './IEvaluationController';

@injectable()
export class EvaluationController implements IEvaluationController {
    private evaluationService: IEvaluationService;
    private textService: ITextService;

    constructor(
        @inject(SERVICES.EvaluationService) service: IEvaluationService,
        @inject(SERVICES.TextService) textService: ITextService
    ) {
        this.evaluationService = service;
        this.textService = textService;
    }

    async getExtendedEvaluation(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.params;
            if (!username) throw new ErrorWithCode('Please Provide User name to get all texts', StatusCode.BAD_REQUEST);

            const texts = await this.loadTexts(username);
            const evaluationResult = await this.evaluationService.extendedEvaluation(texts);

            res.setHeader('Content-Type', 'application/json');
            res.status(StatusCode.OK).send(JSON.stringify(evaluationResult));
        } catch (err) {
            next(err);
        }
    }

    async getSummarizedEvaluation(req: Request, res: Response, next: NextFunction) {
        try {
            const { username } = req.params;
            if (!username) throw new ErrorWithCode('Please Provide User name to get all texts', StatusCode.BAD_REQUEST);

            const texts = await this.loadTexts(username);
            const evaluationResult = await this.evaluationService.summarizedEvaluation(texts);

            res.setHeader('Content-Type', 'application/json');
            res.status(StatusCode.OK).send(JSON.stringify(evaluationResult));
        } catch (err) {
            next(err);
        }
    }

    private async loadTexts(userName: string) {
        const texts = await this.textService.getAllTexts(userName);

        if (!texts || texts.length < 1) {
            throw new ErrorWithCode(
                'No texts found. Please add texts before requesting an evaluation.',
                StatusCode.BAD_REQUEST
            );
        }
        return texts;
    }
}
