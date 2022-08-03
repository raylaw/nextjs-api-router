import { NextApiRequest, NextApiResponse } from "next";
export type NextApiContext<T = unknown> = {
    req: NextApiRequest;
    res: NextApiResponse<T>;
};
export type NxRouteHandlder = (ctx: NextApiContext) => void;
export type NxRouteMiddlware = (params?: NextApiContext) => NextApiContext | undefined;
export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
export type Methods = Partial<{
    [key in HttpMethod]: boolean;
}>;
export class NxRouter {
    routes: Array<{
        pattern: string;
        methods: Methods;
        handler: NxRouteHandlder;
    }>;
    rootPath: string[];
    handle(prefix: string, { req, res }: NextApiContext): void;
    route(pattern: string, methods: HttpMethod[], handler: NxRouteHandlder): void;
    group(pattern: string, cb: () => void): void;
    patch(pattern: string, handler: NxRouteHandlder): void;
    delete(pattern: string, handler: NxRouteHandlder): void;
    put(pattern: string, handler: NxRouteHandlder): void;
    get(pattern: string, handler: NxRouteHandlder): void;
    post(pattern: string, handler: NxRouteHandlder): void;
    any(pattern: string, handler: NxRouteHandlder): void;
}

//# sourceMappingURL=types.d.ts.map
