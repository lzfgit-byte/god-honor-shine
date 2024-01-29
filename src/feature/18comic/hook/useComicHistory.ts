import { ref } from 'vue';
import type { T_comic_history } from '@ghs/share';
import { c18_f_history_get, c18_f_history_saveOrUpdate } from '@/feature/18comic/apis/18ComicApis';

export default (link: string) => {
  const historyData = ref<T_comic_history>();

  const initHistory = async () => {
    historyData.value = await c18_f_history_get({ comic_link: link });
  };
  const saveOrUpdateHistory = async (data: T_comic_history) => {
    await c18_f_history_saveOrUpdate(data);
  };
  return { initHistory, saveOrUpdateHistory, historyData };
};
