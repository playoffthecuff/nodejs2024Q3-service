import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'db',
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  username: process.env.DB_USER ?? 'db_user',
  password: process.env.DB_PSWD ?? 'db_pswd',
  database: process.env.DB ?? 'app_db',
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/**/migration/*.js'],
  migrationsRun: true,
  autoLoadEntities: true,
  logging: true,
} as DataSourceOptions;
