import configs from "../configs";
import mkdirp from "mkdirp";
import { Context, Next } from "koa";
import winston from "winston";


export const skip = (context: Context, next: Next): boolean => {
  next();
  return context.status < 400;
};
export const stream = {
  write: (message: string, encoding: string): void => {
    logger.info(message);
  }
};
