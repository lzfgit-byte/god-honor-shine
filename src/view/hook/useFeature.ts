import type { Item } from '@ghs/types';
import { f_getDetailPage } from '@/utils/business';
import { imgViewerRef } from '@/hooks/use-global-ref';

export default () => {
  const showDetail = async (item: Item) => {
    const detail = await f_getDetailPage(item);
    console.log(detail);
    if (detail.detailType === 'mp4') {
    } else if (detail.detailType === 'm3u8') {
    } else if (detail.detailType === 'image') {
      imgViewerRef.value.show(detail.details);
    }
  };

  return { showDetail };
};
