import { onDeactivated, ref } from 'vue-demi';
import { hashString } from '@ilzf/utils';
import type { MessageInfo } from '@ghs/types';
import { getImage } from '@/api';
export default (props: any) => {
  const imgSrc = ref('');
  const percentageRef = ref(0);
  const progressInfo = ref();
  const isError = ref(false);
  const init = async () => {
    if (!props.url) {
      return;
    }
    imgSrc.value = await getImage(props.url);
    if (imgSrc.value === 'data:image/png;base64,') {
      imgSrc.value = '';
    }
  };
  const handleError = () => {
    console.log('图片加载失败:', props.url);
    isError.value = true;
    imgSrc.value = '';
  };
  return { imgSrc, init, handleError, percentageRef, progressInfo, isError };
};
