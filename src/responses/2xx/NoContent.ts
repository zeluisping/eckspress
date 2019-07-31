import { Request, Response } from 'express';
import BaseResponse from '../BaseResponse';

export class NoContent extends BaseResponse {
    public static Handler = async (req: Request, res: Response): Promise<void> => {
        res.end();
    };

    public async Handle(req: Request, res: Response): Promise<void> {
        NoContent.Handler(req, res.status(204));
    }
}
