import { DatabaseConfig, databaseConfig } from "./database";
import { ENV_CURRENT, Envs, IS_DEV } from "./env";
import { LoggingConfig, loggingConfig } from "./logging";
import { ServerConfig, serverConfig } from "./server";
// 工程所有配置
export {
  DatabaseConfig,
  ServerConfig,
  LoggingConfig,
  ENV_CURRENT,
  IS_DEV
};

export class Configs {
  private _databaseConfig: DatabaseConfig;
  private _serverConfig: ServerConfig;
  private _loggingConfig: LoggingConfig;
  private _env: string;

  constructor() {
    this._databaseConfig = databaseConfig;
    this._serverConfig = serverConfig;
    this._loggingConfig = loggingConfig;
    this._env = ENV_CURRENT;
  }

  public get databaseConfig(): DatabaseConfig {
    return this._databaseConfig;
  }

  public get serverConfig(): ServerConfig {
    return this._serverConfig;
  }

  public get loggingConfig(): LoggingConfig {
    return this._loggingConfig;
  }

  public get isDev(): boolean {
    return this._env === Envs.dev;
  }

  public get env(): string {
    return this._env;
  }
}

export default new Configs();
