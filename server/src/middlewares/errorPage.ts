import resolve from "../utils/pather";
import { logger } from "../utils/logger";
import send from "koa-send";
import { Context, Next } from "koa";

export default async function errorPage(context: Context, next: Next) {
  try {
    await next();
    let statusCode: number = context.status;
    if (statusCode === 404) {
      context.throw(404);
    }
  } catch (err) {
    context.status = err.status || 500;
    if (context.status === 404) {
      // page no found
      return send(context, "/404.html", { root: resolve("public") });
    } else {
      logger.error(err);
      return send(context, "/503.html", { root: resolve("public") });
    }
  }
}
