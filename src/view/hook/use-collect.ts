import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import type { CollectEntity } from '@ghs/constant';
import { f_listCollect } from '@/utils/business';

export default (key: string) => {
  const collects = ref<CollectEntity[]>();
  const updateCollects = async () => {
    collects.value = await f_listCollect(key);
  };
  const getCollect = (): Ref<CollectEntity[]> => collects;
  onMounted(() => {
    updateCollects().then(() => 1);
  });
  return { updateCollects, getCollect, collects };
};
