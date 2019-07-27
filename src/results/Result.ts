import { Request, Response } from 'express';

export default abstract class Result {
    public abstract Handle(req: Request, res: Response): Promise<any>;
}
