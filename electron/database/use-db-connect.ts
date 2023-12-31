import * as sqlite3 from 'sqlite3';
let db;
export const queryConfigByName = (name: string) => {
  db = new sqlite3.Database(`./public/sqlite.db`, (err) => {});
};
queryConfigByName('proxy');
export default () => () => db?.close();
