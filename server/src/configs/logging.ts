import resolve from "../utils/pather";

enum LoggingLevel {
  emerg = "emerg",
  alert = "alert",
  crit = "crit",
  error = "error",
  warning = "warning",
  notice = "notice",
  info = "info",
  debug = "debug"
}

export interface LoggingConfig {
  file: {
    level: string;
    filename: string;
    handleExceptions: boolean;
    json: boolean;
    maxsize: number;
    maxFiles: number;
    colorize: boolean;
  };
  console: {
    level: string;
    handleExceptions: boolean;
    json: boolean;
    colorize: boolean;
  };
  directory: string;
}

export const loggingConfig: LoggingConfig = {
  file: {
    level: LoggingLevel.error,
    filename: "running.log",
    handleExceptions: true,
    json: true,
    maxsize: 5000000,
    maxFiles: 100,
    colorize: false
  },
  console: {
    level: LoggingLevel.info,
    handleExceptions: true,
    json: true,
    colorize: true
  },
  // 日志文件夹为 "/logs"
  directory: resolve("log")
}
