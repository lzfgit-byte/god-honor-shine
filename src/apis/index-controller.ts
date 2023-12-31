import { executeFunction } from '@/utils/ipc';
import type { WebAppType_F } from '@/types/setting-page-info';

export const f_getWebApps = (): Promise<WebAppType_F[]> => executeFunction('getWebApps');
