import * as controller from "./controllers";
import * as utils from "../../utils";
import { SwaggerRouter as Router } from "koa-swagger-decorator";

let swaggerOptions = {
  title: "handa_biology API Doc",
  description: "瀚达生物接口文档[all]",
  version: "1.0.0",
  swaggerHtmlEndpoint: "/swagger.html",
  swaggerJsonEndpoint: "/swagger.json",
  prefix: "/api"
};
let router: Router = new Router({}, swaggerOptions);

router.swagger();
router.mapDir(__dirname);

export default router;
export { default as auth } from "./auth";
export { default as open } from "./open";
