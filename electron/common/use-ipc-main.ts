import { ipcMain } from 'electron';
import * as utils from '../utils';
import * as feature from '../feature';
import * as common from '../common';
import { sendMessage } from '../utils/message';
import { SYS_GLOB_KEY } from '../const/system';

const funcs = { ...utils, ...feature, ...common };

export default () => {
  Object.keys(funcs).forEach((key) => {
    ipcMain.handle(key, (sender, ...args) => {
      return funcs[key](...args);
    });
  });
};
ipcMain.handle(SYS_GLOB_KEY.SEND_MESSAGE, (s, a) => {
  sendMessage(a);
});
