import { ref } from 'vue-demi';
import { hashString } from '@ilzf/utils';
import type { MessageInfo } from '@ghs/types';
import src from '../loading.gif?url';
import bus from '@/utils/bus';
import { f_getImage } from '@/utils/business';
export default (props: any) => {
  const imgSrc = ref(src);
  const percentageRef = ref(0);
  const init = async () => {
    if (!props.url) {
      return;
    }
    const handleBus = async (args: MessageInfo) => {
      percentageRef.value = args.percentage;
    };
    bus.on(hashString(props.url), handleBus);
    imgSrc.value = await f_getImage(props.url);
    if (imgSrc.value === 'data:image/png;base64,') {
      imgSrc.value = src;
    }
  };
  const handleError = () => {
    imgSrc.value = src;
  };
  return { imgSrc, init, handleError, percentageRef };
};
