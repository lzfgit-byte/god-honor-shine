import type { Request, Response } from 'express-serve-static-core';

export const getQueryData = <T>(req: Request): T => {
  return req?.query as T;
};
export const setDefaultHeader = (res: Response) => {
  res.setHeader('Content-Type', 'application/json');
};
