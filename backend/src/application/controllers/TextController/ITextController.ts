import { Request, Response, NextFunction } from 'express';

export interface ITextController {
    addText(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllTexts(req: Request, res: Response, next: NextFunction): Promise<void>;
    addTextGroup(req: Request, res: Response, next: NextFunction): Promise<void>;
    clearTexts(req: Request, res: Response, next: NextFunction): Promise<void>;
}
