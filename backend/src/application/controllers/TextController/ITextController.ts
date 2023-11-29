import { Request, Response, NextFunction } from 'express';

export interface ITextController {
    addText(req: Request, res: Response, next: NextFunction): void;
    getAllTexts(req: Request, res: Response, next: NextFunction): void;
    addTextGroup(req: Request, res: Response, next: NextFunction): void;
    clearTexts(req: Request, res: Response, next: NextFunction): void;
}
