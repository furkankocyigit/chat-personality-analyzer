import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { IEvaluationService } from '../../domain.services/EvaluationService';
import { SERVICES } from '../../config/identifiers';
import { HttpStatusCode } from '../HttpStatusCodes/StatusMessages';
import { ITextService } from '../../domain.services/TextService';
import { ErrorWithCode } from '../HttpStatusCodes/ErrorWithCode';

export interface IEvaluationController {
    getEvaluationResult(req: Request, res: Response, next: NextFunction): void;
}

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

    async getEvaluationResult(req: Request, res: Response, next: NextFunction) {
        try {
            const texts = this.textService.getAllTexts();

            if (!texts || texts.length < 1) {
                throw new ErrorWithCode(
                    'No texts found. Please add texts before requesting an evaluation.',
                    HttpStatusCode.BAD_REQUEST
                );
            }
            const evaluationResult = await this.evaluationService.evaluate(texts);
            res.setHeader('Content-Type', 'application/json');
            res.status(HttpStatusCode.OK).send(JSON.stringify(evaluationResult));
        } catch (err) {
            next(err);
        }
    }
}
