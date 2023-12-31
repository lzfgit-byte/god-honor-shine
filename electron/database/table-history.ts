import { logger } from '../utils/logger';
import type { TableHistory as Table } from './init-db';
import db from './init-db';
const table_name = 'history';
/**
 *获取一条数据
 * @param key
 */
export const queryHistoryByKey = async (key: string): Promise<Table> => {
  return new Promise((resolve, reject) => {
    db.get(`select * from ${table_name} where key = '${key}' `, (e, r: Table) => {
      if (e) {
        reject(e.message);
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
export const updateHistoryByKey = async (entity: Table): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE ${table_name} SET value = ? WHERE key = ?`,
      [entity.value, entity.key],
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
export const addHistory = async (entity: Table) => {
  if (!entity.key) {
    return Promise.reject(false);
  }
  const history = await queryHistoryByKey(entity.key);
  if (history) {
    logger.error('唯一值重复');
    return Promise.reject(false);
  }
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO ${table_name} (key, value) VALUES (?, ?)`,
      [entity.key, entity.value || ''],
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
export const deleteHistory = async (entity: Table) => {
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
