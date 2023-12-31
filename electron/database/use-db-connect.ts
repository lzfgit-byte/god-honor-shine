import { sendMessage } from '../utils/message';
import { logger } from '../utils/logger';
import type { TableConfig } from './init-db';
import db from './init-db';
export const queryConfigByKey = async (key: string): Promise<TableConfig> => {
  return new Promise((resolve, reject) => {
    db.get(`select * from config where key = '${key}'`, (e, r: TableConfig) => {
      if (e) {
        reject(e.message);
        return;
      }
      resolve(r);
    });
  });
};
export const updateConfigByKey = async (entity: TableConfig): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE config SET value = ?,is_edit = ? WHERE key = ?',
      [entity.value, entity.is_edit, entity.key],
      function (err) {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};
export const addConfig = async (entity: TableConfig) => {
  if (!entity.key) {
    return Promise.reject(false);
  }
  const tableConfig = await queryConfigByKey(entity.key);
  if (tableConfig) {
    logger.error('唯一值重复');
    return Promise.reject(false);
  }
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO config (key, value, is_edit) VALUES (?, ?, ?)',
      [entity.key, entity.value || '', entity.is_edit || 1],
      function (err) {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};
export const deleteConfig = async (entity: TableConfig) => {
  return new Promise((resolve, reject) => {
    if (!entity.key) {
      reject('key不能为空');
    }
    db.run('DELETE FROM config WHERE key = ?', [entity.key], function (err) {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
export default () => () => db?.close();
