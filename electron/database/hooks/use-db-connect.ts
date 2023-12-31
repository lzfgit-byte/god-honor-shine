import * as sqlite3 from 'sqlite3';

const db = new sqlite3.Database('../sqlite.db');

export const queryConfigByName = (name: string) => {
  db.get(`select * from config where name = '${name}'`, (sta, err, row) => {
    debugger;
  });
};
queryConfigByName('proxy');
export default () => () => db.close();
