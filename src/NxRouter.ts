import { error } from './config';
import { HttpMethod, Methods, NextApiContext, NxRouteHandler } from './types';

export class NxRouter {
  routes: Array<{
    pattern: string;
    methods: Methods;
    handler: NxRouteHandler;
  }> = [];

  rootPath: string[] = [];

  private addRoute(pattern: string, methods: Methods, handler: NxRouteHandler) {
    this.routes.push({
      pattern: [...this.rootPath, pattern].join('/'),
      handler,
      methods,
    });
  }

  handle(prefix: string, { req, res }: NextApiContext) {
    const { method } = req;
    const url = req.url?.split('?')[0] ?? '';
    for (const { handler, pattern, methods } of this.routes) {
      const regex = new RegExp(`^${['', prefix, pattern].join('/')}/\?$`);
      if (method && methods[method as HttpMethod] && regex.test(url ?? '')) {
        const ctx = { req, res };
        return handler(ctx);
      }
    }
    res.status(400).json({ error: error['no-route-handler'], url });
  }

  route(pattern: string, methods: HttpMethod[], handler: NxRouteHandler) {
    const hash = Object.fromEntries(methods.map((v, i) => [v, true]));
    this.addRoute(pattern, hash, handler);
  }

  group(pattern: string, cb: () => void) {
    this.rootPath.push(pattern);
    cb();
    this.rootPath.splice(-1);
  }

  patch(pattern: string, handler: NxRouteHandler) {
    this.addRoute(pattern, { PATCH: true }, handler);
  }

  delete(pattern: string, handler: NxRouteHandler) {
    this.addRoute(pattern, { DELETE: true }, handler);
  }

  put(pattern: string, handler: NxRouteHandler) {
    this.addRoute(pattern, { PUT: true }, handler);
  }

  get(pattern: string, handler: NxRouteHandler) {
    this.addRoute(pattern, { GET: true }, handler);
  }

  post(pattern: string, handler: NxRouteHandler) {
    this.addRoute(pattern, { POST: true }, handler);
  }

  any(pattern: string, handler: NxRouteHandler) {
    this.addRoute(
      pattern,
      {
        PATCH: true,
        PUT: true,
        DELETE: true,
        GET: true,
        POST: true,
        OPTIONS: true,
        HEAD: true,
      },
      handler,
    );
  }
}
