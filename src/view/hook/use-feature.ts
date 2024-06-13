import type { Item } from '@ghs/types';
import { f_getDetailPage } from '@/utils/business';
import { imgViewerRef, videoGlobalRef } from '@/hooks/use-global-ref';
import useGlobalState from '@/hooks/use-global-state';

export default () => {
  const { segmentedValue, drawerOpen, segmentedData } = useGlobalState();
  const showDetail = async (item: Item) => {
    const detail = await f_getDetailPage(item);
    if (detail.detailType === 'mp4' || detail.detailType === 'm3u8') {
      if (detail.details.length === 1) {
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
      // TODO
    } else if (detail.detailType === 'comic') {
      // TODO
    }
  };

  const handleDrawOpen = () => {
    segmentedValue.value = '标签';
    drawerOpen.value = true;
  };

  return { showDetail, drawerOpen, handleDrawOpen, segmentedValue, segmentedData };
};
