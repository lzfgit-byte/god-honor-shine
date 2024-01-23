import { ipcRenderer } from 'electron';
import type { ProcessMsgType } from '@ghs/share';
import { SYS_GLOB_KEY } from '@ghs/share';
import { debounce } from 'lodash';
import bus from '@/utils/bus';
import { GHSNotify } from '@/components/message';
import type { NotifyShow } from '@/components/message/types';
import { waitTime } from '@/utils/kit-utils';
import { GHSClassLog } from '@/components/log';
// 执行后台的方法
export const executeFunction = async (funcName: string, ...args: any[]) => {
  return await ipcRenderer.invoke(funcName, ...args);
};
const msg = debounce(async (_event, ...args) => {
  await GHSClassLog.log(args.join(''));
}, 2);
// 获取后台的消息
ipcRenderer.on(SYS_GLOB_KEY.SEND_MESSAGE, msg);
// 播放进度信息
const cacheNotify: Record<string, NotifyShow> = {};
const func = debounce(async (_event, args: ProcessMsgType) => {
  const { percentage, global, down, title, key, info } = args;
  if (global) {
    cacheNotify[key] = cacheNotify[key] || (await GHSNotify.show({ percentage, title, info }));
    cacheNotify[key].update({ percentage, title, info });
  }
  if (down || percentage === 100) {
    await waitTime(600);
    cacheNotify[key]?.destroy();
    delete cacheNotify[key];
  }
}, 10);
ipcRenderer.on(SYS_GLOB_KEY.SEND_PROCESS, func);
