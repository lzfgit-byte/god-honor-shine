import type { Item } from '@ghs/types';
import { message } from 'ant-design-vue';
import { f_getDetailPage, f_winOpenAny } from '@/utils/business';
import { imgViewerRef, videoGlobalRef, webConfigRef } from '@/hooks/use-global-ref';
import useGlobalState from '@/hooks/use-global-state';

export default () => {
  const { segmentedValue, drawerOpen, segmentedData, webConfig } = useGlobalState();
  const { loading, logs, webKey } = useGlobalState();
  const showDetail = async (item: Item) => {
    loading.value = true;
    const detail = await f_getDetailPage(item);
    if (detail === null) {
      loading.value = false;
      return;
    }
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
          detail.detailType,
          detail.details[0].comments
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

  const handleAddCode = () => {
    webConfigRef.value.add('');
  };
  const handleEditCode = () => {
    webConfigRef.value.edit(webKey.value);
  };
  const clearLogs = () => {
    logs.value = [];
  };

  return {
    showDetail,
    drawerOpen,
    handleDrawOpen,
    segmentedValue,
    segmentedData,
    handleAddCode,
    handleEditCode,
    clearLogs,
  };
};
