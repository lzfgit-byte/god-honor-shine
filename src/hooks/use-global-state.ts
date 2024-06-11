import { ref } from 'vue-demi';
import type { BaseConfig, Item, Pagination, Tag, UrlReplace } from '@ghs/types';
import type { CollectEntity } from '@ghs/constant';

const webConfig = ref<BaseConfig>();
const pagination = ref<Pagination[]>();
const items = ref<Item[]>();
const tags = ref<Tag[]>();
const urlReplace = ref<UrlReplace[]>();
const dbPath = ref();
const currentUrl = ref();
const cacheSize = ref();
const loading = ref(false);

const drawerOpen = ref(false);
const segmentedValue = ref<'标签' | '收藏' | '历史' | '过滤选项' | '系统配置'>('标签');
const segmentedData = ref(['标签', '收藏', '历史', '过滤选项', '系统配置']);

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
});
