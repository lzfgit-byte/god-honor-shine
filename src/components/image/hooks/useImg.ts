import { clearInterval } from 'node:timers';
import type { ProcessMsgType } from '@ghs/share';
import { ref } from 'vue-demi';
import src from '../loading.gif?url';
import bus from '@/utils/bus';
import { f_request_img_get, f_win_img_get } from '@/utils/functions';
import { GHSNotify } from '@/components/message';
import type { NotifyShow } from '@/components/message/types';
import { waitTime } from '@/utils/kit-utils';
export default (props: any) => {
  const imgSrc = ref();
  const percentageRef = ref(0);
  let timer: any = null;
  const init = async () => {
    if (!props.url) {
      return;
    }
    let notify: NotifyShow = null;
    const msgs: ProcessMsgType[] = [];
    bus.on(props.url, async (args: ProcessMsgType) => {
      const { percentage, down } = args;
      msgs.push(args);
      percentageRef.value = down ? 100 : percentage;
      if (timer === null) {
        timer = setInterval(async () => {
          if (msgs.length > 0) {
            const { percentage, down, info, title } = msgs.shift();
            notify = notify || (await GHSNotify.show({ percentage, info, title }));
            notify.update({ percentage: down ? 100 : percentage, info, title });
            if (down || percentage === 100) {
              clearInterval(timer);
              timer = null;
              bus.off(props.url);
              await waitTime(600);
              notify?.destroy();
              notify = null;
            }
          }
        }, 10);
      }
    });
    if (props.force) {
      imgSrc.value = await f_win_img_get(props.url);
    } else {
      imgSrc.value = await f_request_img_get(props.url);
    }
    if (imgSrc.value === 'data:image/png;base64,') {
      imgSrc.value = src;
    }
  };
  const handleError = () => {
    imgSrc.value = src;
  };
  return { imgSrc, init, handleError, percentageRef };
};
