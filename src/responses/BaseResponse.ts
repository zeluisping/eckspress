import { Request, Response } from 'express';

export default abstract class BaseResponse {
    public abstract Handle(req: Request, res: Response): Promise<void>;
}
