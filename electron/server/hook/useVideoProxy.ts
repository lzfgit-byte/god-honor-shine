import type { Request, Response } from 'express-serve-static-core';
import { net } from 'electron';
import { allowedHeaders, allowedRequestHeaders, getQueryData } from '../utils/ServerUtil';

const proxyPath = '/videoProxy';

const isM3u8 = (url = '', contentType = '') => {
  return url.toLowerCase().includes('.m3u8') || contentType.toLowerCase().includes('mpegurl');
};

const toAbsoluteUrl = (value: string, baseUrl: string) => {
  return new URL(value.trim(), baseUrl).href;
};

const toProxyUrl = (value: string, baseUrl: string) => {
  return `${proxyPath}?url=${encodeURIComponent(toAbsoluteUrl(value, baseUrl))}`;
};

const rewriteM3u8 = (text: string, baseUrl: string) => {
  return text
    .split(/\r?\n/)
    .map((line) => {
      let rewritten = line.replace(
        /URI="([^"]+)"/g,
        (_, uri) => `URI="${toProxyUrl(uri, baseUrl)}"`
      );
      const trimmed = rewritten.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        return rewritten;
      }
      return toProxyUrl(trimmed, baseUrl);
    })
    .join('\n');
};

const setCorsHeaders = (res: Response) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Range, Content-Type, Origin, Accept,Content-Length, Content-Range, Accept-Ranges'
  );
};

export default async (_route: string, req: Request, res: Response) => {
  setCorsHeaders(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  const queryData = getQueryData<{ url: string }>(req);
  const loadUrl = queryData?.url;
  if (!loadUrl) {
    res.status(400).end('url is required');
    return;
  }

  const request = net.request(loadUrl);
  req.on('close', () => request.abort());

  allowedRequestHeaders.forEach((key) => {
    if (req.headers[key]) {
      request.setHeader(key, req.headers[key] as string);
    }
  });

  request.on('response', (response) => {
    const contentType = `${response.headers['content-type'] || ''}`;
    if (isM3u8(loadUrl, contentType)) {
      const chunks: Buffer[] = [];
      response.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      response.on('end', () => {
        const rewritten = rewriteM3u8(Buffer.concat(chunks).toString('utf-8'), loadUrl);
        res.status(response.statusCode || 200);
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Length', Buffer.byteLength(rewritten));
        res.end(rewritten);
      });
      return;
    }

    res.status(response.statusCode || 200);
    allowedHeaders.forEach((key) => {
      if (response.headers[key]) {
        res.setHeader(key, response.headers[key]);
      }
    });

    response.on('data', (chunk) => res.write(chunk));
    response.on('end', () => res.end());
  });

  request.on('error', (error) => {
    console.error('video proxy error:', error);
    if (!res.headersSent) {
      res.status(500);
    }
    res.end('Internal Server Error');
  });

  request.end();
};
