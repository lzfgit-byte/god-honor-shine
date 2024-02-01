(async () => {
  return new Promise((resolve) => {
    // @ts-ignore
    $('body').attr('class', '');
    // @ts-ignore
    $('.spot_under').remove();
    // $('#custom_list_videos_related_videos').remove();//视频列表
    // @ts-ignore
    $('.footer').remove();
    // @ts-ignore
    $('.header').remove();
    // @ts-ignore
    $('.btn_more').remove();
    // @ts-ignore
    $('.main').attr('style', 'padding: 10px 0 0 0;');
    // @ts-ignore
    $('.video_tools').attr('style', 'padding-bottom: 10px;');
    // @ts-ignore
    $('.video_tools').attr('style', 'padding-bottom: 10px;');
    const $style = document.createElement('style');
    $style.innerHTML = ` div::-webkit-scrollbar,body::-webkit-scrollbar {width: 0;}`;
    document.getElementsByTagName('head')[0].appendChild($style);
    resolve('aaaa');
  });
})();
