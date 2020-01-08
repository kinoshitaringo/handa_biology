import cluster from "cluster";
import configs, { LoggingConfig } from "../configs";
import mkdirp from "mkdirp";
import path from "path";
import winston, { Logger, transports } from "winston";
import { Context, Next } from "koa";
// 日志生成工具

const LOGGING_CONFIG: LoggingConfig = configs.loggingConfig;
const TARGET_FILENAME: string = path.resolve(LOGGING_CONFIG.directory, LOGGING_CONFIG.file.filename);
LOGGING_CONFIG.file.filename = TARGET_FILENAME;

if (cluster.isMaster) {
  mkdirp.sync(LOGGING_CONFIG.directory);
}

const logger: Logger = winston.createLogger({
  transports: [
    new transports.File(LOGGING_CONFIG.file),
    new transports.Console(LOGGING_CONFIG.console)
  ],
  exitOnError: false // 错误的时候不退出
});
logger.info = logger.info.bind(logger);

export { logger };


export const skip = (context: Context, next: Next): boolean => {
  // 跳过正常的请求
  next();
  return context.statusCode < 400;
}

export const stream = {
  write: (message: string, encoding: string): void => {
    logger.info(message);
  }
}
