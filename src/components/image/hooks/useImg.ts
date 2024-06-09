import { ref } from 'vue-demi';
import src from '../loading.gif?url';
import bus from '@/utils/bus';
import { f_getImage } from '@/utils/business';
export default (props: any) => {
  const imgSrc = ref();
  const percentageRef = ref(0);
  const init = async () => {
    if (!props.url) {
      return;
    }
    const handleBus = async (args) => {};
    bus.on(props.url, handleBus);
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
