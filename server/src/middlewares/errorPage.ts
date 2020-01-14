import * as utils from "../utils";
import koaSend from "koa-send";
import { Context, Next } from "koa";
import { logger } from "../utils/logger";

let send = (context: Context, errCode: number) =>
  koaSend(context, `/${errCode}.html`, { root: utils.resolve("public") });

export default async function errorPage(context: Context, next: Next) {
  try {
    await next();
    let statusCode: number = context.status;
    if (statusCode === 404) {
      logger.info(`GET ${context.request.URL} 404`);
      context.throw(404);
    }
  } catch (err) {
    context.status = err.status || 500;
    switch (context.status) {
      case 401:
        break;
      case 404:
        break;
      default:
        context.status = 503;
        break;
    }

    return send(context, context.status);
  }
}
