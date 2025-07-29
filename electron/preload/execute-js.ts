import { ipcRenderer } from 'electron';

/**
 * 通过窗口获取页面html的preload
 */
import { IS_CAN_CONTINUE, MESSAGE_EVENT_KEY, USE_CHILD_WIN_EVENT } from '@ghs/constant';
// @ts-ignore
const sendMessage = (msg: string) => {
  ipcRenderer.invoke(MESSAGE_EVENT_KEY.SEND_EXECUTE_JS_MESSAGE, msg);
};
const sendHtml = (html: string) => {
  ipcRenderer.invoke(USE_CHILD_WIN_EVENT.JS_SEND_HTML, html).then(() => 1);
};
function showWindow() {
  ipcRenderer.invoke(USE_CHILD_WIN_EVENT.JS_SHOW_WIN).then(() => 1);
}
sendMessage(`获取页面中`);
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise((resolve, reject) => {
    try {
      const timer = setTimeout(() => {
        sendMessage('十秒超时文档未准备好');
        reject('超时');
      }, 10000);
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
          clearTimeout(timer);
        }
      });
    } catch (e) {
      sendMessage('检测加载状态报错');
      reject(e);
    }
  });
}

function checkBoot() {
  // 检测人机校验

  const title = document.title.trim();
  sendMessage(`【${title}】`);
  if (IS_CAN_CONTINUE(title)) {
    return true;
  }
  showWindow();
  return false;
}
function downloadURL() {
  // 检测人机校验
  if (!checkBoot()) {
    return;
  }
  sendMessage(`加载成功`);
  sendHtml('');
}

domReady()
  .then(() => {
    downloadURL();
  })
  .catch((e) => {
    if (document) {
      document.body.innerHTML = `<div>${e?.message || e}</div>
                                  <div onclick="window.location.reload()">重新加载</div>`;
    }
  });

/**
 * 窗口之间相互通信的功能
 * @param ev
 */
window.onmessage = (ev) => {
  console.log(ev.data.payload);
};
