import { Request, Response } from 'express';
import { BadResult, Result } from './results';

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void)
    ? I
    : never;

export type MiddleWare<T extends {}> = (req: Request, res: Response) => Promise<T | BadResult>;

export type MiddlewareArray<T extends any> = Array<MiddleWare<T>>;
export type MiddlewareArrayInfer<T extends MiddlewareArray<any>> = T extends MiddlewareArray<infer R> ? R : never;
export type InferFinalContext<Middlewares extends MiddlewareArray<any>> = UnionToIntersection<
    Exclude<MiddlewareArrayInfer<Middlewares>, Result>
>;
// Middlewares extends MiddlewareArray<infer R>
// ? R extends any
//     ? {}
// : UnionToIntersection<Exclude<MiddlewareArrayInfer<Middlewares>, Result>>
// : never;
