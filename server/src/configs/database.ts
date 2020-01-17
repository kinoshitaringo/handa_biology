import * as entities from "../models";
import _ from "lodash";
import migrations from "../models/migrations";
import { IS_DEV } from "./env";
// 数据库配置

const DATABASE_CURRENT: string = IS_DEV ? "handa_test" : "handa_biology";
const USE_SSL: boolean = false;

export interface DatabaseConfig {
  name: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
  entities: any[];
  migrations: string[];
  subscribers?: string[];
  extra?: {
    ssl: any;
  };
}

export const databaseConfig: DatabaseConfig = {
  name: "default",
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: DATABASE_CURRENT,
  synchronize: true, // 进行架构同步,数据不安全
  logging: false,
  entities: [..._.map(entities)],
  migrations: [...migrations],
  extra: {
    ssl: USE_SSL
  }
};
