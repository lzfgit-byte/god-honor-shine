import { existsSync, statSync } from 'node:fs';
import { app_set_config_dir } from '../const/app-paths';

export const app_set_db_dir = (path: string): boolean => {
  const state = statSync(path);
  if (existsSync(path) && state.isFile() && path.endsWith('.db')) {
    //
    app_set_config_dir(path);
    return true;
  }
  return false;
};
