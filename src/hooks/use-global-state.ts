import { ref } from 'vue-demi';
import type { BaseConfig, Item, Pagination, SetTag, Tag, UrlReplace } from '@ghs/types';
import type { CollectEntity } from '@ghs/constant';
import { computed } from 'vue';

const webKey = ref();

const webConfig = ref<BaseConfig>();
const pagination = ref<Pagination[]>();
const items = ref<Item[]>();
const tags = ref<Tag[]>();
const urlReplace = ref<UrlReplace[]>();
const dbPath = ref();
const currentUrl = ref();
const cacheSize = ref();
const loading = ref(false);
const logs = ref([]);

const drawerOpen = ref(false);
const segmentedValue = ref<SetTag>('标签');
const segmentedData = computed(() => webConfig?.value?.setTags);

const collects = ref<CollectEntity[]>();

export default () => ({
  webConfig,
  pagination,
  items,
  tags,
  urlReplace,
  dbPath,
  currentUrl,
  cacheSize,
  loading,
  drawerOpen,
  segmentedValue,
  segmentedData,
  collects,
  webKey,
  logs,
});
