import * as http from 'http';
import { IncomingMessage, ServerResponse } from 'http';
import { cached, getCachePath, hasCache, hasCacheSync } from './cache';
import fs from 'fs-extra';
import { webContents } from 'electron';

const sendMessage = (msg: string) => {
  // ipcMain
  webContents.getFocusedWebContents().send('main-process-message', msg);
};

const { net } = require('electron');

// req 路由监听空 res 上下文函数
const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, {
    //设置允许跨域的域名，*代表允许任意域名跨域
    'Access-Control-Allow-Origin': '*',
  });
  // 路由监控
  const reqUrl = req?.url;
  if (reqUrl) {
    if (reqUrl.startsWith('/getByte')) {
      const url = reqUrl.replace('/getByte?url=', '');
      if (hasCacheSync(url)) {
        const path = getCachePath(url);
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = req.headers.range;
        if (range) {
          //有range头才使用206状态码
          const parts = range.replace(/bytes=/, '').split('-');
          const start = parseInt(parts[0], 10);
          let end = parts[1] ? parseInt(parts[1], 10) : start + 999999;
          // end 在最后取值为 fileSize - 1
          end = end > fileSize - 1 ? fileSize - 1 : end;

          const chunksize = end - start + 1;
          const file = fs.createReadStream(path, { start, end });
          const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            // 'Content-Length': chunksize,
            'Content-Type': 'video/*',
          };
          res.writeHead(206, head);
          file.pipe(res);
          return;
        }
      }

      const request = net.request(url);
      request.on('response', (response) => {
        const header = response.headers;
        const length = +header['content-length'];
        let blob = Buffer.alloc(0);
        response.on('data', (chunk) => {
          blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
          console.log('recive.... ' + +(blob.length / +length).toFixed(4) * 100 + '%');
          sendMessage('recive.... ' + +(blob.length / +length).toFixed(4) * 100 + '%');
          res.write(chunk, (e) => {
            console.error('a' + e);
          });
        });
        response.on('end', () => {
          cached(url, blob);
          cached(url + '-head', JSON.stringify(header));
          res.end();
          console.log('end....');
        });
        response.on('error', () => {
          console.log('出错');
          res.end();
        });
      });
      request.end();
    }
  } else {
    res.end();
  }
});
server.listen(3333, '127.0.0.1', () => {
  console.log('http://127.0.0.1:3333/');
});

export default server;
