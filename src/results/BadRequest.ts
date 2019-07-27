import { Request, Response } from 'express';
import BadResult from './BadResult';

export default class BadRequest extends BadResult {
    public static Handler = async (req: Request, res: Response, body: any, extra: any) => {
        return res.status(200).send(body);
    };

    constructor(private readonly body?: any, private readonly extra?: any) {
        super();
    }

    public async Handle(req: Request, res: Response): Promise<any> {
        return BadRequest.Handler(req, res, this.body, this.extra);
    }
}
