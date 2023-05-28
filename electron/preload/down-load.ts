import { ipcRenderer } from 'electron';

function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}
function blobToString(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const text = reader.result;
      resolve(text);
    };

    reader.onerror = function () {
      reject(new Error('Failed to convert Blob to string.'));
    };

    reader.readAsText(blob);
  });
}
const senMsg = (msg) => {
  ipcRenderer.invoke('sen-msg', msg);
};
function downloadURL(url = null) {
  if (!url) {
    url = window.location.href;
  }
  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  senMsg('异步执行中');
  xhr.onload = function () {
    if (xhr.status === 200) {
      const blob = xhr.response;
      blobToString(blob).then((html) => {
        senMsg('获取成功');
        ipcRenderer.invoke('saveCache', window.location.href, html, 'html').then(() => {
          senMsg('发送中');
          ipcRenderer.invoke('sync-done', html);
        });
      });
    }
  };

  xhr.send();
}

domReady().then(() => {
  downloadURL();
});
window.onmessage = (ev) => {
  console.log(ev.data.payload);
};
