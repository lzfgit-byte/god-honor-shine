import express from 'express';
import { LogMsgUtil } from '../utils/message';
import useDispatchController from './hook/useDispatchController';
import useFileDispatch from './hook/useFileDispatch';
import useVideoProxy from './hook/useVideoProxy';

export const useServer = () => {
  let app = express();
  app.get('/videoProxy', async (req, res) => {
    await useVideoProxy('/videoProxy', req, res);
  });
  app.get('/getImage', async (req, res) => {
    await useDispatchController('/getImage', req, res);
  });
  app.get('/getPage', async (req, res) => {
    await useDispatchController('/getPage', req, res);
  });
  app.get('/loadPage', async (req, res) => {
    await useDispatchController('/loadPage', req, res);
  });
  app.get('/listAllWebConfigs', async (req, res) => {
    await useDispatchController('/listAllWebConfigs', req, res);
  });
  app.get('/getDetailPage', async (req, res) => {
    await useDispatchController('/getDetailPage', req, res);
  });
  app.get('/index', async (req, res) => {
    await useFileDispatch('/index', req, res);
  });
  app.all('*', async (req, res) => {
    await useFileDispatch('*', req, res);
  });

  app.listen(4000, () => {
    LogMsgUtil.sendLogMsg('server started');
  });
};
