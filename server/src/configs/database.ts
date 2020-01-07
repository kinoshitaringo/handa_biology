import entities from "../models";
import migrations from "../models/migrations";
import { IS_DEV } from "./env";
// 数据库配置

const DATABASE_CURRENT: string = IS_DEV ? "handa_test" : "handa_biology";
const USE_SSL: boolean = !IS_DEV; // if not dev, will use ssl

export interface DatabaseConfig {
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
    ssl: boolean;
  };
}

export const databaseConfig: DatabaseConfig = {
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: DATABASE_CURRENT,
  synchronize: true, // 进行架构同步,数据不安全
  logging: true,
  entities: [...entities],
  migrations: [...migrations],
  extra: {
    ssl: USE_SSL
  }
}
