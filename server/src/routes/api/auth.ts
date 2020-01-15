import * as controller from "./controllers";
import Router from "koa-router";

let router: Router = new Router();

router.get("/users", controller.user.getUsers);

export default router;
