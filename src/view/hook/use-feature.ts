import type { Item } from '@ghs/types';
import { ref } from 'vue';
import { f_appSetDbDir, f_getDetailPage } from '@/utils/business';
import { imgViewerRef, videoGlobalRef } from '@/hooks/use-global-ref';

export default () => {
  const drawerOpen = ref(false);
  const segmentedValue = ref<'标签' | '收藏' | '历史' | '设置' | '全局配置'>('标签');
  const segmentedData = ref(['标签', '收藏', '历史', '设置', '全局配置']);

  const showDetail = async (item: Item) => {
    const detail = await f_getDetailPage(item);
    if (detail.detailType === 'mp4') {
      videoGlobalRef.value.show(detail.details[0].url, detail.details[0].title, 'mp4');
    } else if (detail.detailType === 'm3u8') {
    } else if (detail.detailType === 'image') {
      imgViewerRef.value.show(detail.details);
    }
  };

  const handleDrawOpen = () => {
    segmentedValue.value = '标签';
    drawerOpen.value = true;
  };

  const setDbPath = async () => {
    const fileInput: HTMLInputElement = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.db';
    fileInput.addEventListener('change', function () {
      let selectedFile = fileInput.files[0];
      const path = selectedFile.path;
      f_appSetDbDir(path);
    });
    fileInput.click();
  };

  return { showDetail, drawerOpen, handleDrawOpen, segmentedValue, segmentedData, setDbPath };
};
