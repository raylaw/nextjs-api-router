import { NextApiRequest, NextApiResponse } from 'next';
export type NextApiContext<T = unknown> = {
  req: NextApiRequest;
  res: NextApiResponse<T>;
};
export type NxRouteHandler = (ctx: NextApiContext) => void;
export type NxRouteMiddlware = (params?: NextApiContext) => NextApiContext | undefined;
export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
export type Methods = Partial<{
  [key in HttpMethod]: boolean;
}>;
export class NxRouter {
  routes: Array<{
    pattern: string;
    methods: Methods;
    handler: NxRouteHandler;
  }>;
  rootPath: string[];
  handle(prefix: string, { req, res }: NextApiContext): void;
  route(pattern: string, methods: HttpMethod[], handler: NxRouteHandler): void;
  group(pattern: string, cb: () => void): void;
  patch(pattern: string, handler: NxRouteHandler): void;
  delete(pattern: string, handler: NxRouteHandler): void;
  put(pattern: string, handler: NxRouteHandler): void;
  get(pattern: string, handler: NxRouteHandler): void;
  post(pattern: string, handler: NxRouteHandler): void;
  any(pattern: string, handler: NxRouteHandler): void;
}

//# sourceMappingURL=types.d.ts.map
