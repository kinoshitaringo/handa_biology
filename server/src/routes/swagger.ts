import { SwaggerRouter } from "koa-swagger-decorator";
import resolve from "../utils/pather";
import * as controllers from "../controllers";

interface SwaggerRouterOptions {
  title?: string;
  description?: string;
  version?: string;
}

const swaggerRouterOptions: SwaggerRouterOptions = {
  title: "handa biology",
  description: "API DOC",
  version: "1.0.0",
};
const koaRouterOptions = {
  prefix: "/api",
};

let router: SwaggerRouter = new SwaggerRouter(
  koaRouterOptions,
  swaggerRouterOptions
);

router.get("/users", controllers.user.getUsers);

router.swagger();
router.mapDir(resolve("src"));

export default router;
