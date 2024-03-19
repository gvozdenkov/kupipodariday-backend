import dotenv from 'dotenv';
import joi from 'joi';
import path from 'path';
import { fileURLToPath } from 'url';

var dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(dirname, '../../.env') });

var envSchema = joi
  .object()
  .keys({
    NODE_ENV: joi.string().valid('production', 'development', 'test').required(),
    PORT: joi.number().default(3000),
    BASE_PATH: joi.string().default('/api').description('Api version segment'),
    PG_CONTAINER_NAME: joi.string().default('wish-magic-db-dev'),
    POSTGRES_USER: joi.string().default('student'),
    POSTGRES_PASSWORD: joi.string().default('student'),
    POSTGRES_DB: joi.string().default('wish_magic_dev'),
    POSTGRES_HOST: joi.string().default('db'),
    POSTGRES_PORT: joi.number().default(5432),
  })
  .unknown();

var { value: envVars, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`.env file config error: ${error.message}`);
}

type Config = {
  env: 'production' | 'development' | 'test';
  port: number;
  basePath: string;
  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
};

export var config: Config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  basePath: envVars.BASE_PATH,
  db: {
    host: envVars.POSTGRES_HOST,
    port: envVars.POSTGRES_PORT,
    username: envVars.POSTGRES_USER,
    password: envVars.POSTGRES_PASSWORD,
    database: envVars.POSTGRES_DB,
  },
};
