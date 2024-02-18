(async () => {
  return new Promise((resolve) => {
    const els = document.getElementsByTagName('video');
    if (els.length > 0) {
      const src = els[0].src;
      resolve(src);
    } else {
      resolve('aaaa');
    }
  });
})();
