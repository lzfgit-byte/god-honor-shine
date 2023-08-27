(async () => {
  const image = document.querySelector('img');
  const width = image.width;
  const height = image.height;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  // 获取 Canvas 的 2D 上下文
  const context = canvas.getContext('2d');

  // 将图片绘制到 Canvas 上
  context.drawImage(image, 0, 0, width, height);

  // 获取绘制后的图像数据
  const base64Data = canvas.toDataURL('image/jpg');
  return base64Data;
})();
