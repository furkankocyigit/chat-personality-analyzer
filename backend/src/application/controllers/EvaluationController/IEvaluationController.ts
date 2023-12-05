import { Request, Response, NextFunction } from 'express';

export interface IEvaluationController {
    getExtendedEvaluation(req: Request, res: Response, next: NextFunction): Promise<void>;
    getSummarizedEvaluation(req: Request, res: Response, next: NextFunction): Promise<void>;
}
