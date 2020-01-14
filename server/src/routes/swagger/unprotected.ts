import * as controllers from "../../controllers/unprotected";
import resolve from "../../utils/pather";
import { SwaggerRouter } from "koa-swagger-decorator";
import { SwaggerRouterOptions } from ".";

const swaggerRouterOptions: SwaggerRouterOptions = {
  title: "handa biology",
  description: "API DOC",
  version: "1.0.0"
};
const koaRouterOptions = {
  prefix: "/api/open"
};

let router: SwaggerRouter = new SwaggerRouter(
  koaRouterOptions,
  swaggerRouterOptions
);

router.swagger();
router.mapDir(resolve("src"));

export default router;
