import configs from "../configs";
import ejsRouter from "./ejs";
import jwt from "koa-jwt";
import resolve from "../utils/pather";
import Router from "koa-router";
import send from "koa-send";
import staticRouter from "./static";
import swaggerRouter from "./swagger";
import { Context } from "koa";

let router: Router = new Router();

router.redirect("/", "/static");
router.get("/favicon.ico", (context: Context) => {
  // 处理favicon图标
  let favicon = send(context, "/favicon.ico", { root: resolve("public") });
  return favicon;
});
router.use("/ejs", ejsRouter.routes()).use(ejsRouter.allowedMethods());
router.use("/static", staticRouter.routes()).use(staticRouter.allowedMethods());
router.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods());

// the code before jwt middleware wont be effected,while the after will
router.use(
  jwt({ secret: configs.serverConfig.session.secret }).unless({
    path: [/^\/swagger-/]
  })
);

export default router;
