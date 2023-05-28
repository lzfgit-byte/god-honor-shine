import express from 'express';
import bodyParser from 'body-parser';
import handlerGetImg from './service/handler-getImg';
import handlerGetByte from './service/handler-getByte';
const app = express();
const hostname = '127.0.0.1';
const port = 3356;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getImg', (req, res) => {
  handlerGetImg(req, res);
});
app.get('/getByte', (req, res) => {
  handlerGetByte(req, res);
});

const server = app.listen(port, () => {
  console.log(`Example app listening on port http://${hostname}:${port}/`);
});

export default () => () => server.close();
