import * as fs from 'node:fs';
import { net } from 'electron';
import { formatSize, isFalsity, isTruth } from '../../utils/KitUtil';
import { buildFilePathName, existsCache, getByteCache, saveByteCache } from '../../utils';
import { sendMessage } from '../../utils/message';
const hasFileExist = (path: string, req: any, res: any) => {
  sendMessage(`视频缓存:${path}`);
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    // 有range头才使用206状态码
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;
    // end 在最后取值为 fileSize - 1
    end = end > fileSize - 1 ? fileSize - 1 : end;

    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      // 'Content-Length': chunksize,
      'Content-Type': 'video/*',
    };
    res.writeHead(206, head);
    file.pipe(res);
  }
};
const requestFormUrl = (url: string, suffix: string, res: any) => {
  let blob: any = Buffer.alloc(0);
  let fileSize: any = 0;
  const request = net.request(url);
  request.on('response', (response) => {
    const header = response.headers;
    fileSize = +header['content-length'];
    response.on('data', (chunk) => {
      blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
      sendMessage(`received[${formatSize(blob.length)}/${formatSize(fileSize)}]`);
      res.write(chunk);
    });
    response.on('end', () => {
      saveByteCache(url, blob, suffix);
      sendMessage('end');
      blob = null;
    });
    response.on('error', () => {
      sendMessage('net 请求 error');
    });
  });
  request.on('error', () => {
    sendMessage('request error');
  });
  request.end();
  res.on('close', () => {
    request.abort();
    sendMessage('close');
  });
};
export default (req, res) => {
  const { url, p } = req.query;
  const suffix = 'video';
  if (isFalsity(url)) {
    res.end();
    return;
  }
  if (existsCache(url, suffix)) {
    hasFileExist(buildFilePathName(url, suffix), req, res);
    return;
  }
  // 无缓存
  requestFormUrl(url, suffix, res);
};
