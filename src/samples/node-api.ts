import { ipcRenderer } from 'electron';

ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args);
});
ipcRenderer
  .invoke('showInfo', [])
  .then((res) => {
    debugger;
    console.log(res);
  })
  .catch((res) => {
    debugger;
    console.log('eerrr');
  });
