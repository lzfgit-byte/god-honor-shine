import Database from 'better-sqlite3';
import { keys } from 'lodash';
import type { T_OptType } from '@ghs/share';

import { APP_PATHS } from '../const/app-paths';
import { logger } from '../utils/logger';
export const currentVersion = 1;
const db_path = APP_PATHS.db_path;
const db: any = new Database(db_path, { verbose: logger.log });
// 创建表操作类
export class TableBuilder<T> {
  private fields: string[] = [];
  private fieldStr = '';
  private fieldMark = '';
  private primaryKey = 'id';
  private tableName: string;
  private orderBy: string;
  private db: typeof Database.prototype = null;
  constructor(opt: T_OptType) {
    const data = opt.data;
    const tableName = opt.tableName;
    this.fields = keys(data).filter((key: string) => key !== this.primaryKey);
    this.tableName = tableName;
    this.orderBy = opt.orderBy;
    this.db = db;
    this.fieldStr = this.fields.join(',');
    this.fieldMark = this.fields.map(() => '?').join(',');
    if (this.fields.length === 0) {
      logger.error('创建表的字段为空');
    }
  }

  /**
   *如果存在返回true
   */
  isTableExist() {
    const ste = this.db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name= ?;`);
    const rows = ste.all(this.tableName);
    return rows.length === 1;
  }

  private getId() {
    return new Date().getTime();
  }

  /**
   *获取值
   * @param data
   * @private
   */
  private getRowDataNoId(data: T) {
    return this.fields.map((key) => data[key]);
  }

  private getNullField(entity: T) {
    return keys(entity).filter((key: string) => entity[key]);
  }

  private buildWhereSql(entity: T): string {
    let querySql = '';
    const valueFields = this.getNullField(entity);
    valueFields.forEach((item: string, index: number) => {
      if (index !== 0) {
        querySql += `and ${item} =  ? `;
      } else {
        querySql += `${item} =  ? `;
      }
    });
    return querySql;
  }

  private buildWhereSqlData(entity: T): any[] {
    const valueFields = this.getNullField(entity);
    const queryData = [];
    valueFields.forEach((item: string) => {
      queryData.push(entity[item]);
    });
    return queryData;
  }

  insertData(data: T) {
    const ste = this.db.prepare(
      `INSERT INTO ${this.tableName} (${this.primaryKey},${
        this.fieldStr
      }) VALUES (${this.getId()},${this.fieldMark})`
    );

    ste.run(...this.getRowDataNoId(data));
  }

  getById(id: string): T {
    const stm = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`);
    return stm.get(id) as T;
  }

  listByEntity(entity: T = null): T[] {
    if (entity && entity[this.primaryKey]) {
      return [this.getById(entity[this.primaryKey])];
    }
    let stm: any;
    if (entity) {
      stm = this.db.prepare(
        `SELECT * FROM ${this.tableName} WHERE ${this.buildWhereSql(entity)} ${this.orderBy};`
      );
    } else {
      stm = this.db.prepare(`SELECT * FROM ${this.tableName} ${this.orderBy};`);
    }
    return stm.all(...this.buildWhereSqlData(entity)) as T[];
  }

  getByEntity(entity: T): T {
    const row = this.listByEntity(entity);
    return row.length > 0 ? row[0] : null;
  }

  clearTable() {
    this.db.exec(`delete FROM ${this.tableName} where 1 = 1;`);
  }

  private getUpdateValue(entity: T) {
    let fields = this.getNullField(entity).filter((key) => key !== this.primaryKey);
    let setSql = '';
    fields.forEach((field: string, index: number) => {
      if (index === fields.length - 1) {
        setSql += `${field} = '${entity[field]}'`;
      } else {
        setSql += `${field} = '${entity[field]}',`;
      }
    });
    return setSql;
  }

  update(entity: T): boolean {
    const id = entity[this.primaryKey];
    if (!id) {
      return false;
    }
    const stm = this.db.prepare(
      `UPDATE ${this.tableName} SET ${this.getUpdateValue(entity)} WHERE ${
        this.primaryKey
      } = '${id}'`
    );
    return stm.run().changes > 0;
  }

  updateByEntity(old: T, current: T) {
    const id = old[this.primaryKey];
    if (id) {
      current[this.primaryKey] = id;
      return this.update(current);
    }
    const stm = this.db.prepare(
      `UPDATE ${this.tableName} SET ${this.getUpdateValue(current)} WHERE ${this.buildWhereSql(
        old
      )}`
    );
    return stm.run(...this.buildWhereSqlData(old)).changes > 0;
  }

  getByField(key: keyof T, value: string): T {
    const stm = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE ${key as any} = ?`);
    const rows = stm.all(value);
    return rows.length > 0 ? rows[0] : (null as any);
  }

  delete(entity: T): boolean {
    const id = entity[this.primaryKey];
    if (id) {
      const stm = this.db.prepare(`DELETE FROM ${this.tableName} WHERE ${this.primaryKey} = ?;`);
      return stm.run(id).changes > 0;
    }
    const stm = this.db.prepare(
      `DELETE FROM ${this.tableName} WHERE ${this.buildWhereSql(entity)};`
    );
    return stm.run(...this.buildWhereSqlData(entity)).changes > 0;
  }

  dropTable() {
    this.db.exec(`DROP TABLE IF EXISTS ${this.tableName};`);
  }

  createTable(data: T[] = []) {
    if (this.isTableExist()) {
      return true;
    }
    const execSqlField = this.fields
      .map(
        (field: string, index: number) =>
          `${field} TEXT ${index < this.fields.length - 1 ? ',' : ''}`
      )
      .join('\r\n');
    this.db.exec(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
          ${this.primaryKey} TEXT PRIMARY KEY NOT NULL,
          ${execSqlField}
        );`);
    data?.forEach((data) => {
      this.insertData(data);
    });
    return true;
  }
}
export default db;
