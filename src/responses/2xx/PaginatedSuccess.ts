import { Request, Response } from 'express';
import BaseResponse from '../BaseResponse';

export type Pagination = {
    count: number;
    page: number;
    limit: number;
};

export class PaginatedSuccess extends BaseResponse {
    public static Handler = async (req: Request, res: Response, body: any[], pagination: Pagination) => {
        return res.send(body);
    };

    constructor(private readonly body: any[], private readonly pagination: Pagination) {
        super();
    }

    public async Handle(req: Request, res: Response): Promise<any> {
        res.setHeader('Pagination-Count', this.pagination.count);
        res.setHeader('Pagination-Page', this.pagination.page);
        res.setHeader('Pagination-Limit', this.pagination.limit);
        return PaginatedSuccess.Handler(req, res.status(200), this.body, this.pagination);
    }
}
