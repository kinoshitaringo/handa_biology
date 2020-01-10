import configs from "../configs";
import jwt from "koa-jwt";
import Router from "koa-router";
import staticRouter from "./static";
import swaggerRouter from "./swagger";

let router: Router = new Router();

router.redirect("/", "/static");
router.use("/static", staticRouter.routes()).use(staticRouter.allowedMethods());
router.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods());

// the code before jwt middleware wont be effected,while the after will
router.use(
  jwt({ secret: configs.serverConfig.session.secret }).unless({
    path: [/^\/swagger-/],
  })
);

export default router;
