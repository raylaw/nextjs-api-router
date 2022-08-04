import type { NextApiRequest, NextApiResponse } from 'next';

export type NextApiContext<T = unknown> = {
  req: NextApiRequest;
  res: NextApiResponse<T>;
};

export type NxRouteHandler = (ctx: NextApiContext) => void;

export type NxRouteMiddlware = (params?: NextApiContext) => NextApiContext | undefined;

export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';

export type Methods = Partial<{ [key in HttpMethod]: boolean }>;
