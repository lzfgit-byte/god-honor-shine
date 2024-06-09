import { DataSource } from 'typeorm';
import { APP_PATHS } from '../const/app-paths';
import { Config } from './config-table';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: APP_PATHS.db_path,
  entities: [Config],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
export default () => {
  return () => AppDataSource.destroy();
};
