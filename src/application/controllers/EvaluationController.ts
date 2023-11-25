import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { IEvaluationService } from '../../domain.services/EvaluationService';
import { SERVICES } from '../../config/identifiers';
import { HttpStatusCode } from '../HttpStatusCodes/StatusMessages';
import { ITextService } from '../../domain.services/TextService';
import { ErrorWithCode } from '../HttpStatusCodes/ErrorWithCode';

export interface IEvaluationController {
    getExtendedEvaluation(req: Request, res: Response, next: NextFunction): void;
    getSummarizedEvaluation(req: Request, res: Response, next: NextFunction): void;
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

    async getExtendedEvaluation(req: Request, res: Response, next: NextFunction) {
        try {
            const texts = this.loadTexts();
            const evaluationResult = await this.evaluationService.extendedEvaluation(texts);

            res.setHeader('Content-Type', 'application/json');
            res.status(HttpStatusCode.OK).send(JSON.stringify(evaluationResult));
        } catch (err) {
            next(err);
        }
    }

    async getSummarizedEvaluation(req: Request, res: Response, next: NextFunction) {
        try {
            const texts = this.loadTexts();
            const evaluationResult = await this.evaluationService.summarizedEvaluation(texts);

            res.setHeader('Content-Type', 'application/json');
            res.status(HttpStatusCode.OK).send(JSON.stringify(evaluationResult));
        } catch (err) {
            next(err);
        }
    }

    private loadTexts() {
        const texts = this.textService.getAllTexts();

        if (!texts || texts.length < 1) {
            throw new ErrorWithCode(
                'No texts found. Please add texts before requesting an evaluation.',
                HttpStatusCode.BAD_REQUEST
            );
        }
        return texts;
    }
}
