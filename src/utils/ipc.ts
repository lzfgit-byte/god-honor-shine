import { ipcRenderer } from 'electron';

export const executeFunction = async (funcName: string, ...args: any[]) => {
  return await ipcRenderer.invoke(funcName, ...args);
};
