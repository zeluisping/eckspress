import { Request, Response } from 'express';
import ErrorResponse from '../ErrorResponse';

export class TooManyRequests extends ErrorResponse {
    public static Handler = async (req: Request, res: Response, body: any, extra: any) => {
        return res.send(body);
    };

    constructor(private readonly body?: any, readonly extra?: any) {
        super(extra);
    }

    public async Handle(req: Request, res: Response): Promise<any> {
        return TooManyRequests.Handler(req, res.status(429), this.body, this.extra);
    }
}
