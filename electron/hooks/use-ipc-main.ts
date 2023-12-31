/**
 *处理从页面传到的方法请求
 */
import { ipcMain } from 'electron';

const funcs = {};

export default () => {
  Object.keys(funcs).forEach((key) => {
    ipcMain.handle(key, (sender, ...args) => {
      return funcs[key](...args);
    });
  });
};
