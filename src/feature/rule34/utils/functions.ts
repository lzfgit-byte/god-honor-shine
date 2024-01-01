import { executeFunction } from '@/utils/ipc';
import type { mainPage, videoData } from '@/feature/rule34/type/rule34Type';

export const rule34_getRule34MainPage = (html: string): Promise<mainPage> =>
  executeFunction('rule34_getRule34MainPage', html);

export const rule34_getRule34Video = (html: string): Promise<videoData[]> =>
  executeFunction('rule34_getRule34Video', html);
