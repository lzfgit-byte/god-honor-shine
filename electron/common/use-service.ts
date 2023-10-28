import express from 'express';
import bodyParser from 'body-parser';
import { killByPort } from '../utils/command';
import pkg from '../../package.json';
import { sendMessage } from '../utils/message';
import handlerGetImg from './service/handler-getImg';
import handlerGetByte from './service/handler-getByte';
const app = express();
const hostname = '127.0.0.1';
let port = pkg.servicePort;

let closeReq = null;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getImg', (req, res) => {
  handlerGetImg(req, res);
});
app.get('/getByte', (req, res) => {
  closeReq = handlerGetByte(req, res);
});
app.get('/closed', (req, res) => {
  closeReq && closeReq();
});
let server = null;
let tryCount = 0;
const listen = () => {
  server = app.listen(port, () => {
    console.log(`Example app listening on port http://${hostname}:${port}/`);
  });
  server.on('error', () => {
    sendMessage('以管理权限运行:net stop winnat');
    if (tryCount < 10) {
      tryCount++;
      sendMessage('将切换另一个port');
      port++;
      listen();
    }
  });
};
killByPort(port)
  .then(() => {
    listen();
  })
  .catch(() => {
    listen();
  });
export default () => () => server?.close();
