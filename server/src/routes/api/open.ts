import * as controller from "./controllers";
import * as utils from "../../utils";
import Router from "koa-router";

let router: Router = new Router();

router.post("/user", controller.user.createUser);

export default router;
