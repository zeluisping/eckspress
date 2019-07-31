import { Request, Response } from 'express';
import { InferFinalContext, MiddlewareArray } from './Middleware';
import { BaseResponse, ErrorResponse } from './responses';

export function Endpoint<
    Middlewares extends MiddlewareArray<any>,
    Context = Middlewares extends never[] ? {} : InferFinalContext<Middlewares>
>(
    middlewares: Middlewares,
    handler: (ctx: Context, req: Request, res: Response) => Promise<BaseResponse | Response>,
): (req: Request, res: Response) => void {
    return async (req, res) => {
        const context: Context = {} as any; // sorry
        for (const mi of middlewares) {
            const middlewareResult = await mi(req, res);
            if (middlewareResult instanceof ErrorResponse) {
                await middlewareResult.Handle(req, res);
                return;
            }
            Object.assign(context, middlewareResult);
        }
        const result = handler(context, req, res);
        if (result instanceof BaseResponse) {
            await result.Handle(req, res);
            return;
        }
        // otherwise result is express.Response which means it was manually handled
    };
}
