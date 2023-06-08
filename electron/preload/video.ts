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
function loadJS(url, callback) {
  let script: any = document.createElement('script');
  let fn = callback || function () {};
  script.type = 'text/javascript';
  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        fn();
      }
    };
  } else {
    // 其他浏览器
    script.onload = function () {
      fn();
    };
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
let lodashUrl = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.js'; // 待加载文件的地址信息
// 调用方法

domReady().then(() => {
  loadJS('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', () => {
    $('.popup_access').remove();
    $('body').attr('class', '');
    $('iframe').hide();
    $('.spot_under').hide();
    // document.querySelector('.popup_access').remove();
    // document.body.className = '';
  });
});
window.onmessage = (ev) => {
  console.log(ev.data.payload);
};
