import Router from "koa-router";
import { Context } from "koa";

const router: Router = new Router;

router.get("/", (context: Context) => {
  context.status = 200;
  context.body = { msg: "hello world" };
});

export default router;
