import { ipcMain } from 'electron';
import * as utils from '../utils';
import * as feature from '../feature';
import * as common from '../common';
import { sendMessage } from '../utils/message';

const funcs = { ...utils, ...feature, ...common };

export default () => {
  Object.keys(funcs).forEach((key) => {
    ipcMain.handle(key, (sender, ...args) => {
      return funcs[key](...args);
    });
  });
};
ipcMain.handle('sen-msg', (s, a) => {
  sendMessage(a);
});
