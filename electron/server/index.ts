import express from 'express';
import { LogMsgUtil } from '../utils/message';
import useDispatchController from './hook/useDispatchController';
import useFileDispatch from './hook/useFileDispatch';

export const useServer = () => {
  let app = express();

  app.get('/getPage', async (req, res) => {
    await useDispatchController('/getPage', req, res);
  });
  app.get('/loadPage', async (req, res) => {
    await useDispatchController('/loadPage', req, res);
  });
  app.get('/index', async (req, res) => {
    await useFileDispatch('/index', req, res);
  });

  app.listen(4000, () => {
    LogMsgUtil.sendLogMsg('server started');
  });
};
