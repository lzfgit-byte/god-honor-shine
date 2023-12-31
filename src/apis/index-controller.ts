import { executeFunction } from '@/utils/ipc';

export const f_getWebApps = () => executeFunction('getWebApps');
