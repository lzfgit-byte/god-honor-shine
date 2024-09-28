import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import type { Request, Response } from 'express-serve-static-core';

export default async (route: string, req: Request, res: Response) => {
  if (route === '/index') {
    const indexHtml = join(process.env.DIST, 'index.html');
    const html = readFileSync(indexHtml, 'utf-8');
    return res.end(html);
  }
};
