(async () => {
  return new Promise((resolve) => {
    $('body').attr('class', '');
    $('.spot_under').remove();
    $('#custom_list_videos_related_videos').remove();
    $('.footer').remove();
    $('.header').remove();
    $('.btn_more').remove();
    $('.main').attr('style', 'padding: 10px 0 0 0;');
    $('.video_tools').attr('style', 'padding-bottom: 10px;');
    resolve('aaaa');
  });
})();
