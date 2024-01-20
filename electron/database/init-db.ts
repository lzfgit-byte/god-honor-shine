import Database from 'better-sqlite3';
import { keys, omit } from 'lodash';
import { APP_PATHS } from '../const/app-paths';
import { logger } from '../utils/logger';
const db_path = APP_PATHS.db_path;
const db: any = new Database(db_path, { verbose: logger.log });
// 创建表操作类
class TableBuilder<T> {
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

  dropTable() {
    return this.db.exec(`DROP TABLE IF EXISTS ${this.tableName};`);
  }

  createTable(data: T[] = []) {
    if (this.isTableExist()) {
      logger.error('表已经创建完毕了');
      return false;
    }
    const execSqlField = this.fields.map(
      (field: string, index: number) =>
        `${field} TEXT NOT NULL${index < this.fields.length - 1 ? ',' : ''}`
    );
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

export default db;
