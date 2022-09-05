import "dotenv/config";
import { join } from "path";
import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const dataSourceOptions: MysqlConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  logger: "file",
  entities: [join(__dirname, "./models/*.{ts,js}")],
  subscribers: [join(__dirname, "./subscribers/*.{ts,js}")],
  migrations: [],
};

export default new DataSource(dataSourceOptions);
