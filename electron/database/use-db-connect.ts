import db from './init-db';

export default () => () => db?.close();
