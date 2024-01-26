import type { PageItemType, SearchHistoryType, T_collect } from '@ghs/share';
import { ref } from 'vue-demi';
import { computed } from 'vue';
import { collect_f_delete, collect_f_list, collect_f_save } from '@/apis/collect-controller';

export default (type: SearchHistoryType) => {
  const collects = ref<T_collect[]>([]);
  const collect_list = async () => {
    collects.value = await collect_f_list(type);
  };
  const collect_save = async (value: string) => {
    await collect_f_save(value, type);
    await collect_list();
  };
  const collect_delete = async (value: string) => {
    await collect_f_delete(value, type);
    await collect_list();
  };
  const cCollect = computed<PageItemType[]>(() =>
    collects.value.map((i) => i && JSON.parse(i.value as any))
  );

  return { collects, cCollect, collect_list, collect_delete, collect_save };
};
