import { Request, Response } from 'express';
import ErrorResponse from '../ErrorResponse';

export class InternalServerError extends ErrorResponse {
    public static Handler = async (req: Request, res: Response, body: any, extra: any) => {
        return res.send(body);
    };

    constructor(private readonly body?: any, readonly extra?: any) {
        super(extra);
    }

    public async Handle(req: Request, res: Response): Promise<any> {
        return InternalServerError.Handler(req, res.status(500), this.body, this.extra);
    }
}
