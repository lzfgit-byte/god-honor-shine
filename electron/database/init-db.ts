import Database from 'better-sqlite3';
import { keys } from 'lodash';
import type { Table_config } from '@ghs/share';
import { Table_config_Date, Table_config_name } from '@ghs/share';
import { APP_PATHS } from '../const/app-paths';
import { logger } from '../utils/logger';
const db_path = APP_PATHS.db_path;
const db: any = new Database(db_path, { verbose: logger.log });
// 创建表操作类
export class TableBuilder<T> {
  fields: string[] = [];
  fieldStr = '';
  fieldMark = '';
  primaryKey = 'id';
  tableName: string;
  db: typeof Database.prototype = null;
  constructor(data: T, tableName: string) {
    this.fields = keys(data).filter((key: string) => key !== this.primaryKey);
    this.tableName = tableName;
    this.db = db;
    this.fieldStr = this.fields.join(',');
    this.fieldStr = this.fieldStr.substring(0, this.fieldStr.length - 1);
    this.fieldMark = this.fields.map((key) => '?').join(',');
    this.fieldMark = this.fieldMark.substring(0, this.fieldMark.length - 1);
    if (this.fields.length === 0) {
      logger.error('创建表的字段为空');
    }
  }

  isTableExist() {
    const ste = this.db.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name= ?;`);
    const rows = ste.all(this.tableName);
    return rows.length === 1;
  }

  getRowDataNoId(data: T) {
    return this.fields.map((key) => data[key]);
  }

  getId() {
    return new Date().getTime();
  }

  insertData(data: T) {
    const ste = this.db.prepare(
      `INSERT INTO ${this.tableName} (${this.primaryKey},${
        this.fieldStr
      }) VALUES (${this.getId()},${this.fieldMark})`
    );
    ste.run(...this.getRowDataNoId(data));
  }

  getDataById(id: string): T {
    const stm = this.db.prepare(`SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ?`);
    return stm.get(id) as T;
  }

  getNullField(entity: T) {
    return keys(entity).filter((key: string) => entity[key]);
  }

  buildWhereSql(entity: T): string {
    let querySql = '';
    const valueFields = this.getNullField(entity);
    valueFields.forEach((item: string, index: number) => {
      if (index !== 0) {
        querySql += `and ${item} =  ?`;
      } else {
        querySql += `${item} =  ?`;
      }
    });
    return querySql;
  }

  listDataByEntity(entity: T): T[] {
    if (entity[this.primaryKey]) {
      return [this.getDataById(entity[this.primaryKey])];
    }
    const valueFields = this.getNullField(entity);
    const queryData = [];
    valueFields.forEach((item: string, index: number) => {
      queryData.push(entity[item]);
    });
    const stm = this.db.prepare(
      `SELECT * FROM ${this.tableName} WHERE ${this.buildWhereSql(entity)};`
    );
    return stm.all(...queryData) as T[];
  }

  update(entity: T): boolean {
    const id = entity[this.primaryKey];
    let fields = this.getNullField(entity);
    let setSql = '';
    fields.forEach((field: string, index: number) => {
      if (index === field.length - 1) {
        setSql += `${field} = '${entity[field]}'`;
      } else {
        setSql += `${field} = '${entity[field]}',`;
      }
    });
    const stm = this.db.prepare(
      `UPDATE ${this.tableName} SET ${setSql} WHERE ${this.primaryKey} = '${id}'`
    );
    return stm.run().changes > 0;
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
    return stm.run(id).changes > 0;
  }

  dropTable() {
    this.db.exec(`DROP TABLE IF EXISTS ${this.tableName};`);
  }

  createTable(data: T[] = []) {
    if (this.isTableExist()) {
      logger.error('表已经创建完毕了');
      return false;
    }
    const execSqlField = this.fields
      .map(
        (field: string, index: number) =>
          `${field} TEXT NOT NULL${index < this.fields.length - 1 ? ',' : ''}`
      )
      .join('\r\n');
    this.db.exec(`CREATE TABLE IF NOT EXISTS ${this.tableName} (
          ${this.primaryKey} TEXT PRIMARY KEY,
          ${execSqlField}
        );`);
    data?.forEach((data) => {
      this.insertData(data);
    });
    return true;
  }
}

const init = () => {
  const table = new TableBuilder<Table_config>(Table_config_Date, Table_config_name);
  console.log(table.isTableExist());
  table.dropTable();
  console.log(table.createTable([Table_config_Date]));
};
init();

export default db;
