<template>
  <div h-full w-full>
    <a-row v-for="(item, index) in urlReplace" :key="item.schema + index">
      <a-col>
        <GhsTag
          v-for="(item_, index_) in item.urlAppend"
          :key="item_.title + index_"
          :show-gap="true"
          :type="item_.current ? 'success' : 'info'"
          @click="handleChange(item.schema + item_.param, [item_.value, item_.title])"
        >
          {{ item_.title }}
        </GhsTag>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
  import { reactive, watchEffect } from 'vue-demi';
  import { keys } from 'lodash';
  import { computed } from 'vue';
  import type { UrlReplace } from '@ghs/types';
  import useGlobalState from '@/hooks/use-global-state';
  import { f_adapterLoadUrl } from '@/utils/business';
  import GhsTag from '@/components/tag/ghs-tag.vue';
  const props = defineProps({ load: Function });
  const { urlReplace, currentUrl } = useGlobalState();
  const currentKeyReactive = reactive<Record<string, any>>({});

  const cuReplaces = computed(() => {
    const res: UrlReplace[] = [];
    urlReplace.value.forEach((itm: UrlReplace) => {
      res.push({
        ...itm,
        urlAppend: [
          {
            value: currentKeyReactive[itm.schema + itm.urlAppend[0].param][0],
            title: currentKeyReactive[itm.schema + itm.urlAppend[0].param][1],
            param: itm.urlAppend[0].param,
            current: true,
          },
        ],
      });
    });
    return res;
  });

  const handleChange = async (key, args: [string, string]) => {
    currentKeyReactive[key] = args;
    props?.load(await f_adapterLoadUrl(currentUrl.value, cuReplaces.value));
  };
  watchEffect(() => {
    if (urlReplace.value?.length > 0) {
      keys(currentKeyReactive).forEach((key) => {
        delete currentKeyReactive[key];
      });
      //
      urlReplace.value.forEach((item) => {
        if (item.urlAppend?.length > 0) {
          currentKeyReactive[item.schema + item.urlAppend[0].param] = item.urlAppend[0].value;
        }
      });
    }
  });
  watchEffect(() => {
    console.log(urlReplace.value);
  });
</script>

<style scoped lang="less"></style>
