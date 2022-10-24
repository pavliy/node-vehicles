import { ConfigFactory, ConfigObject } from '@nestjs/config';


export default (): ConfigFactory<ConfigObject> => ({
  database: {
    host: process.env.POSTGRES_HOST,
    name: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT ?? '5432', 10),
    userName: process.env.POSTGRES_USER,
  },
  port: parseInt(process.env.PORT ?? '3000', 10),
} as unknown as ConfigFactory<ConfigObject>);
