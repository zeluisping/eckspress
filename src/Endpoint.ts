import { Request, Response } from 'express';
import { InferFinalContext, MiddlewareArray } from './Middleware';
import { BadResult, Result } from './results';

export default function Endpoint<
    Middlewares extends MiddlewareArray<any>,
    Context = Middlewares extends never[] ? {} : InferFinalContext<Middlewares>
>(
    middlewares: Middlewares,
    handler: (ctx: Context, req: Request, res: Response) => Promise<Result | Response>,
): (req: Request, res: Response) => void {
    return async (req, res) => {
        const context: Context = {} as any; // sorry
        for (const mi of middlewares) {
            const middlewareResult = await mi(req, res);
            if (middlewareResult instanceof BadResult) {
                await middlewareResult.Handle(req, res);
                return;
            }
            Object.assign(context, middlewareResult);
        }
        const result = handler(context, req, res);
        if (result instanceof Result) {
            await result.Handle(req, res);
            return;
        }
        // otherwise result is Response which means it was already handled
    };
}
