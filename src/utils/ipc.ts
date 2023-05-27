import { ipcRenderer } from 'electron';

// TODO
export const executeFunction = async (funcName: string, ...args: any[]) => {
  const res = await ipcRenderer.invoke(funcName, ...args);
};
