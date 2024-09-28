import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import type { Request, Response } from 'express-serve-static-core';

export default async (route: string, req: Request, res: Response) => {
  if (route === '/index') {
    const indexHtml = join(process.env.DIST, 'index-h5.html');
    const html = readFileSync(indexHtml, 'utf-8');
    return res.end(html);
  }
  if (route === '*') {
    const filePath = join(process.env.DIST, req.url);
    if (filePath.indexOf('.js') > -1) {
      res.setHeader('Content-Type', 'text/javascript');
    }
    if (filePath.indexOf('.css') > -1) {
      res.setHeader('Content-Type', 'text/css');
    }
    const fileData = readFileSync(filePath, 'utf-8');
    return res.end(fileData);
  }
};
