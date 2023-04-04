export default {};
import { exportFunc } from '@/utils/ipc';
export const getHtmlByNet = (url: string): Promise<any> => exportFunc['getHtmlByNet'](url);

export const getRule34MainPage = (html: string): Promise<any> =>
  exportFunc['getRule34MainPage'](html);
export const getRule34Video = (html: string): Promise<any> => exportFunc['getRule34Video'](html);
export const getVideo = (url: string): Promise<any> => exportFunc['getVideo'](url);
