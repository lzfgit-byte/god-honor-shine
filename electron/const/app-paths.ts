import path from 'node:path';
const db_dir = `${process.env.LOCALAPPDATA}/ghs3.0`;
const db_path = `${db_dir}/sqlite.db`; // aka C:\Users\用户名\AppData\Local\ghs3.0
const cache_path = path.join(process.cwd(), '/ghs-cache/');
export const APP_PATHS = {
  db_dir,
  db_path,
  cache_path,
};
