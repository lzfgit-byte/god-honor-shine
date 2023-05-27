import { executeFunction } from '@/utils/ipc';

export const getHtml = async (url: string): Promise<string> => executeFunction('getHtml', url);
