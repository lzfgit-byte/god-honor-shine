import { net } from 'electron';
import { formatSize, isFalsity, isTruth } from '../../utils/KitUtil';
import { getByteCache, saveByteCache } from '../../utils';
import { sendMessage } from '../../utils/message';

export default (req, res) => {
  const { url, p } = req.query;
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
    const header = response.headers;
    const fileSize = +header['content-length'];
    response.on('data', (chunk) => {
      blob = Buffer.concat([blob, chunk], blob.length + chunk.length);
      if (p) {
        sendMessage(`received[${formatSize(blob.length)}/${formatSize(fileSize)}]`);
      }
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
};
