import { Request, Response } from 'express';
import Result from './Result';

export default class Success extends Result {
    public static Handler = async (req: Request, res: Response, body: any) => {
        return res.status(200).send(body);
    };

    constructor(private readonly body?: any) {
        super();
    }

    public async Handle(req: Request, res: Response): Promise<any> {
        return Success.Handler(req, res, this.body);
    }
}
