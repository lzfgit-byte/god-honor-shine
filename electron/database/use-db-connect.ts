import db from './init-db';
export const queryConfigByName = (name: string) => {};
export default () => () => db?.close();
