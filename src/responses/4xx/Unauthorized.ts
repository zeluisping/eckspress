import { Request, Response } from 'express';
import ErrorResponse from '../ErrorResponse';

export class Unauthorized extends ErrorResponse {
    public static Handler = async (req: Request, res: Response, body: any, extra: any): Promise<void> => {
        res.send(body);
    };

    constructor(private readonly body?: any, readonly extra?: any) {
        super(extra);
    }

    public async Handle(req: Request, res: Response): Promise<void> {
        Unauthorized.Handler(req, res.status(401), this.body, this.extra);
    }
}
