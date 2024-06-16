import type { Item } from '@ghs/types';
import { message } from 'ant-design-vue';
import { SaveCodeEvent } from '@ghs/constant';
import { f_getDetailPage, f_winOpenAny } from '@/utils/business';
import { imgViewerRef, videoGlobalRef } from '@/hooks/use-global-ref';
import useGlobalState from '@/hooks/use-global-state';
import bus from '@/utils/bus';

export default () => {
  const { segmentedValue, drawerOpen, segmentedData, webConfig, loading, logs } = useGlobalState();
  const showDetail = async (item: Item) => {
    loading.value = true;
    const detail = await f_getDetailPage(item);
    loading.value = false;
    if (detail.detailType === 'mp4' || detail.detailType === 'm3u8') {
      if (detail.details.length === 1) {
        if (detail.details[0]?.url === '') {
          message.warn('视频地址为空');
          logs.value.push(JSON.stringify(detail));
          return;
        }
        videoGlobalRef.value.show(
          detail.details[0].url,
          detail.details[0].title,
          detail.detailType
        );
      } else {
        videoGlobalRef.value.showWithTag(
          detail.details,
          detail.details[0].title,
          detail.detailType
        );
      }
    } else if (detail.detailType === 'image') {
      imgViewerRef.value.show(detail.details);
    } else if (detail.detailType === 'win') {
      await f_winOpenAny(
        detail.details[0].url,
        webConfig.value?.ifWinExecCode,
        webConfig.value?.winWidth,
        webConfig.value?.winHeight
      );
    } else if (detail.detailType === 'comic') {
      // TODO
    }
  };

  const handleDrawOpen = () => {
    drawerOpen.value = true;
  };

  const handleSaveCode = () => {
    bus.emit(SaveCodeEvent);
  };

  return { showDetail, drawerOpen, handleDrawOpen, segmentedValue, segmentedData, handleSaveCode };
};
