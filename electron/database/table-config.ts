import { logger } from '../utils/logger';
import type { TableConfig as Table } from './init-db';
import db from './init-db';
const table_name = 'config';
/**
 *获取一条数据
 * @param key
 */
export const queryConfigByKey = async (key: string): Promise<Table> => {
  return new Promise((resolve, reject) => {
    db.get(`select * from ${table_name} where key = '${key}'`, (e, r: Table) => {
      if (e) {
        resolve(null);
        return;
      }
      resolve(r);
    });
  });
};
/**
 *更新一条数据
 * @param entity
 */
export const updateConfigByKey = async (entity: Table): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE ${table_name} SET value = ?,is_edit = ? WHERE key = ?`,
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
/**
 *添加一条数据
 * @param entity
 */
export const insertTableConfig = async (entity: Table) => {
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
      `INSERT INTO ${table_name} (key, value, is_edit) VALUES (?, ?, ?)`,
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
/**
 *删除一条数据
 * @param entity
 */
export const deleteConfig = async (entity: Table) => {
  return new Promise((resolve, reject) => {
    if (!entity.key) {
      reject('key不能为空');
    }
    db.run(`DELETE FROM ${table_name} WHERE key = ?`, [entity.key], function (err) {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};