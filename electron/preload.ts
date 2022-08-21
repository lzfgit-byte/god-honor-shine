//preload.js
//直接在app定义会直接给到main里边
const { contextBridge, ipcRenderer, net } = require('electron');

const exportFunc = {};
Object.keys({}).forEach((funcName) => {
  exportFunc[funcName] = (...args) => ipcRenderer.invoke(funcName, ...args);
});
contextBridge.exposeInMainWorld('nodeApis', net);
