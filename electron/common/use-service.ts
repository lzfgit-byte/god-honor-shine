import express from 'express';
import bodyParser from 'body-parser';
import { net } from 'electron';
import { getByteCache, getCache, saveByteCache } from '../utils';
import { formatSize, isFalsity, isTruth } from '../utils/KitUtil';
import { sendMessage } from '../utils/message';
const app = express();
const hostname = '127.0.0.1';
const port = 3356;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getImg', (req, res) => {
  const { url } = req.query;
  const suffix = 'img';
  if (isFalsity(url)) {
    res.end();
    return;
  }
  const h = getByteCache(url, suffix);
  if (isTruth(h)) {
    res.write(h);
    res.end();
    return;
  }
  const request = net.request(url as string);
  let blob: any = Buffer.alloc(0);
  request.on('response', (response) => {
    response.on('data', (chunk) => {
      blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
      res.write(chunk);
    });
    response.on('end', () => {
      saveByteCache(url, blob, suffix);
      blob = null;
      res.end();
    });
    response.on('error', () => {
      res.end();
    });
  });
  request.end();
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port http://${hostname}:${port}/`);
});

export default () => () => server.close();
