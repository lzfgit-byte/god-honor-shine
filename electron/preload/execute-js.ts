import { ipcRenderer } from 'electron';
import { MESSAGE_EVENT_KEY } from '@ghs/constant';
// @ts-ignore
window.sendMessage = (msg: string) => {
  ipcRenderer.invoke(MESSAGE_EVENT_KEY.SEND_EXECUTE_JS_MESSAGE, msg);
};
