import { Request, Response } from 'express';
import { BaseResponse } from './responses';

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void)
    ? I
    : never;

export type MiddleWare<T extends {}> = (req: Request, res: Response) => Promise<T | BaseResponse>;

export type MiddlewareArray<T extends any> = Array<MiddleWare<T>>;
export type MiddlewareArrayInfer<T extends MiddlewareArray<any>> = T extends MiddlewareArray<infer R> ? R : never;
export type InferFinalContext<Middlewares extends MiddlewareArray<any>> = UnionToIntersection<
    Exclude<MiddlewareArrayInfer<Middlewares>, BaseResponse>
>;
