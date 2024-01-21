import { executeFunction } from '@/utils/ipc';

export const hw_f_getPageInfo = (html: string) => executeFunction('hw_getPageInfo', html);
