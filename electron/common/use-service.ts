import express from 'express';
import bodyParser from 'body-parser';
import { killByPort } from '../utils/command';
import pkg from '../../package.json';
import handlerGetImg from './service/handler-getImg';
import handlerGetByte from './service/handler-getByte';
const app = express();
const hostname = '127.0.0.1';
const port = pkg.servicePort;

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
killByPort(port)
  .then(() => {
    server = app.listen(port, () => {
      console.log(`Example app listening on port http://${hostname}:${port}/`);
    });
  })
  .catch(() => {
    server = app.listen(port, () => {
      console.log(`Example app listening on port http://${hostname}:${port}/`);
    });
  });
export default () => () => server?.close();
