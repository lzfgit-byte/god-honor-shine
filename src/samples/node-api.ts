import { ipcRenderer } from 'electron';
import bus from '@/utils/bus';

ipcRenderer.on('main-process-message', (_event, ...args) => {
  bus.emit('msg-main', args.join(' '));
});
ipcRenderer.on('emit2render', (_event, ...args) => {
  bus.emit('emit2render', args.join(' '));
});
