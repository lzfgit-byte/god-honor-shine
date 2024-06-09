import { DataSource } from 'typeorm';
import { APP_PATHS } from '../const/app-paths';
import { ConfigEntity } from './config-table';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: APP_PATHS.db_path,
  entities: [ConfigEntity],
  synchronize: true,
  logging: false,
});

export default async () => {
  await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
  return () => AppDataSource.destroy();
};
