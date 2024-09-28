import type { Request, Response } from 'express-serve-static-core';

export const getQueryData = <T>(req: Request): T => {
  return req?.query as T;
};
export const setDefaultHeader = (res: Response) => {
  res.setHeader('Content-Type', 'application/json');
};

export class ResultUtil {
  static success(data: any) {
    return {
      code: 200,
      data,
    };
  }

  static error(message: string) {
    return {
      code: 500,
      message,
    };
  }
}
