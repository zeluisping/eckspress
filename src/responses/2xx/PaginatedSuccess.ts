import { Request, Response } from 'express';
import BaseResponse from '../BaseResponse';

export interface IPagination {
    count: number;
    page: number;
    limit: number;
}

export class PaginatedSuccess extends BaseResponse {
    public static Handler = async (
        req: Request,
        res: Response,
        body: any[],
        pagination: IPagination,
    ): Promise<void> => {
        res.send(body);
    };

    constructor(private readonly body: any[], private readonly pagination: IPagination) {
        super();
    }

    public async Handle(req: Request, res: Response): Promise<void> {
        res.setHeader('Pagination-Count', this.pagination.count);
        res.setHeader('Pagination-Page', this.pagination.page);
        res.setHeader('Pagination-Limit', this.pagination.limit);
        PaginatedSuccess.Handler(req, res.status(200), this.body, this.pagination);
    }
}
