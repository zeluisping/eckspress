import { Request, Response } from 'express';
import BaseResponse from '../BaseResponse';

export class NoContent extends BaseResponse {
    public static Handler = async (req: Request, res: Response) => {
        res.end();
    };

    public async Handle(req: Request, res: Response): Promise<any> {
        return NoContent.Handler(req, res.status(204));
    }
}
