# NextJS API Router

A simple Next.js api router, inspired by the Laravel and AdonisJS

## Installation

```
npm install @raylaw/nextjs-api-router

#or

yarn add @raylaw/nextjs-api-router
```

## How to use

### Basic use

First create a [dynamic API routes](https://nextjs.org/docs/api-routes/dynamic-api-routes), e.g. `/pages/api/v1/[...slug'].ts`

```ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NxRouter } from '@raylaw/nextjs-api-router';

const Router = new NxRouter();

Router.get('hello/.*', ({ res, req }) => {
  const { slug } = req.query;
  const [message] = slug;
  return res.stats(200).json({ hello: message });
});

const prefix = 'api/v1';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return Router.handle(prefix, { req, res });
}
```

GET `/api/v1/hello/world/`

RESPONSE `200`

```
{
    hello: 'world'
}
```

### HTTP methods

NxRouter provides shorthand methods to register routes for commonly used HTTP verbs. For example:

### Get

    Router.get('posts', () => {})

### Post

    Router.post('posts/.*', () => {})

### Put

    Router.put('posts/.*', () => {})

### Patch

    Router.patch('posts/.*', () => {})

### Delete

    Router.delete('posts/.*', () => {})

### Rest of the HTTP verbs

For the rest of the HTTP verbs, you can use the Router.route method.

    Router.route('posts/.*' ,['OPTIONS','HEAD'], async () => {})

### Route for all HTTP verbs

    Router.any('.*', async () => {})

## Route groups

A group is created by passing a closure to the Router.group method.

```ts
const Router = new NxRouter();
Router.group('user', ({ req, res }) => {
  // GET /api/v1/user/profile/
  Router.get('profile', ({ req, res }) => {
    return res.stats(200).json({ url: '/api/v1/user/profile/' });
  });

  Router.group('order', () => {
    // GET /api/v1/user/order/books/
    Route.get('books', ({ req, res }) => {
      return res.stats(200).json({ url: '/api/v1/user/order/books/' });
    });
    // e.g.
    // GET /api/v1/user/order/
    // POST /api/v1/user/order/food/
    Router.any('.*', ({ req, res }) => {
      return res.stats(400).json({ error: 'no-api-route-handler', rootPath: '/api/v1/user/order/' });
    });
  });
});

// e.g.
// GET /api/v1/hello/
// POST /api/v1/hello/world/
Router.any('.*', ({ req, res }) => {
  return res.stats(400).json({ error: 'no-api-route-handler', rootPath: '/api/v1/' });
});

const prefix = 'api/v1';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return Router.handle(prefix, { req, res });
}
```

## API Reference

```ts
class NxRouter {
  get: (pattern: string, handler: NxRouteHandlder) => void;

  post: (pattern: string, handler: NxRouteHandlder) => void;

  put: (pattern: string, handler: NxRouteHandlder) => void;

  patch: (pattern: string, handler: NxRouteHandlder) => void;

  delete: (pattern: string, handler: NxRouteHandlder) => void;

  any: (pattern: string, handler: NxRouteHandlder) => void;

  route: (pattern: string, methods: HttpMethod[], handler: NxRouteHandlder) => void;

  group: (pattern: string, cb: () => void) => void;

  handle: (prefix: string, ctx: NextApiContext) => void;
}

type NxRouteHandlder = (ctx: NextApiContext) => void;

type NextApiContext<T = unknown> = {
  req: NextApiRequest;
  res: NextApiResponse<T>;
};
```

### Pattern & Handler

|         | type            | description                                                                               |
| ------- | --------------- | ----------------------------------------------------------------------------------------- |
| pattern | string          | Any string pattern accepted by the `new RegExp(pattern)`, for example: 'user/\\\d+/posts' |
| handler | NxRouteHandlder | Can be an aysnc function                                                                  |

```ts

const sleep = ms => new Promise(r => setTimeout(r, ms));|

const Router = new NxRouter();

const pattern = 'user/\\d+/posts';

// For example,
// Handle: GET /user/12345/posts/
// Not handle: GET /user/uid-001/posts/
Router.get(pattern, async ({ res, req }) => {
  await sleep(1000);
  return res.stats(200).json({ hello: 'world' });
});

```

## To-do

- Middleware support
