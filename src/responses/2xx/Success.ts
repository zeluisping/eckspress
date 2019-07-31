import { Request, Response } from 'express';
import BaseResponse from '../BaseResponse';

export class Success extends BaseResponse {
    public static Handler = async (req: Request, res: Response, body: any): Promise<void> => {
        res.send(body);
    };

    constructor(private readonly body: any) {
        super();
    }

    public async Handle(req: Request, res: Response): Promise<void> {
        Success.Handler(req, res.status(200), this.body);
    }
}
