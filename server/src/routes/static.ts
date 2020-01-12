import resolve from "../utils/pather";
import Router from "koa-router";
import send from "koa-send";
import { Context } from "koa";
// 静态页面路由

let router: Router = new Router();

router.redirect("/", "/static/index.html");
router.get("/(.*)", async (context: Context) => {
  let file = send(context, context.path.replace("/static", ""), {
    root: resolve("public")
  });
  return file;
});

export default router;
