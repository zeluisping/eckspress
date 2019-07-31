import { Request, Response } from 'express';
import ErrorResponse from '../ErrorResponse';

export class Conflict extends ErrorResponse {
    public static Handler = async (req: Request, res: Response, body: any, extra: any): Promise<void> => {
        res.send(body);
    };

    constructor(private readonly body?: any, readonly extra?: any) {
        super(extra);
    }

    public async Handle(req: Request, res: Response): Promise<void> {
        Conflict.Handler(req, res.status(409), this.body, this.extra);
    }
}
