import type { SearchHistoryType } from '@ghs/share';
import { ref } from 'vue-demi';
import {
  search_history_f_delete,
  search_history_f_list,
  search_history_f_save,
} from '@/apis/index-controller';

export default (type: SearchHistoryType) => {
  const historyData = ref([]);
  const loadHistoryData = async () => {
    historyData.value = [];
    const data = await search_history_f_list(type);
    historyData.value = data.map((item) => item.value);
  };
  const handleDelete = async (value: string) => {
    await search_history_f_delete(value, type);
    await loadHistoryData();
  };
  const searchHistorySave = async (value: string) => {
    if (value) {
      await search_history_f_save(value, type);
      await loadHistoryData();
    }
  };
  return { loadHistoryData, handleDelete, historyData, searchHistorySave };
};
