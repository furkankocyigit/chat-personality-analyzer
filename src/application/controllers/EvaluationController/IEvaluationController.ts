import { Request, Response, NextFunction } from 'express';
export interface IEvaluationController {
    getExtendedEvaluation(req: Request, res: Response, next: NextFunction): void;
    getSummarizedEvaluation(req: Request, res: Response, next: NextFunction): void;
}
