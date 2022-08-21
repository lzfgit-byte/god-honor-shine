// //preload.js
// //直接在app定义会直接给到main里边
// const { contextBridge, ipcRenderer } = require('electron');
//
// const exportFunc = {};
// Object.keys(ipc).forEach((funcName) => {
//   exportFunc[funcName] = (...args) => ipcRenderer.invoke(funcName, ...args);
// });
// contextBridge.exposeInMainWorld('nodeApis', exportFunc);
