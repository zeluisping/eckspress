import { Request, Response } from 'express';
import BaseResponse from '../BaseResponse';

export class Created extends BaseResponse {
    public static Handler = async (req: Request, res: Response, location: string | null, body?: any): Promise<void> => {
        res.send(body);
    };

    constructor(private readonly location: string | null, private readonly body?: any) {
        super();
    }

    public async Handle(req: Request, res: Response): Promise<void> {
        if (this.location !== null) {
            res.location(this.location);
        }
        Created.Handler(req, res.status(201), this.location, this.body);
    }
}
