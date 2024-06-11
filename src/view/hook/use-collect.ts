import type { Ref } from 'vue';
import { onMounted } from 'vue';
import type { CollectEntity } from '@ghs/constant';
import { f_listCollect } from '@/utils/business';
import useGlobalState from '@/hooks/use-global-state';

export default (key: string) => {
  const { collects } = useGlobalState();
  const updateCollects = async () => {
    collects.value = await f_listCollect(key);
  };
  const getCollect = (): Ref<CollectEntity[]> => collects;
  onMounted(() => {
    updateCollects().then(() => 1);
  });
  return { updateCollects, getCollect, collects };
};
