import * as controllers from "../../controllers";
import resolve from "../../utils/pather";
import { SwaggerRouter } from "koa-swagger-decorator";

export interface SwaggerRouterOptions {
  title?: string;
  description?: string;
  version?: string;
  swaggerHtmlEndpoint?: string;
  swaggerJsonEndpoint?: string;
}

const swaggerRouterOptions: SwaggerRouterOptions = {
  title: "handa biology",
  description: "API DOC",
  version: "1.0.0",
  swaggerHtmlEndpoint: "/swagger.html",
  swaggerJsonEndpoint: "/swagger.json"
};
const koaRouterOptions = {
  prefix: "/api/auth"
};

let router: SwaggerRouter = new SwaggerRouter(
  koaRouterOptions,
  swaggerRouterOptions
);

router.get("/users", controllers.user.getUsers);

router.swagger();
router.mapDir(resolve("src"));

export default router;
