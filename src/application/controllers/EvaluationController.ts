import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { IEvaluationService } from '../../domain.services/EvaluationService';
import { SERVICES } from '../../config/identifiers';
import { HttpStatusCode } from '../StatusMessages';

export interface IEvaluationController {
    getEvaluationResult(req: Request, res: Response, next: NextFunction): void;
}

@injectable()
export class EvaluationController implements IEvaluationController {
    private evaluationService: IEvaluationService;

    constructor(@inject(SERVICES.EvaluationService) service: IEvaluationService) {
        this.evaluationService = service;
    }

    async getEvaluationResult(req: Request, res: Response, next: NextFunction) {
        try {
            const result = this.evaluationService.getEvaluationResult();
            res.status(HttpStatusCode.OK).send({ result });
        } catch (err) {
            next(err);
        }
    }
}
