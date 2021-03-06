import * as controllers from "./api/controllers";
import * as models from "../models";
import * as utils from "../utils";
import _ from "lodash";
import ejs from "ejs";
import Koa, { Context } from "koa";
import Router from "koa-router";

let router: Router = new Router();

const EJS_ROOT: string = utils.resolve("partials");

//  请求路径解析
const pathMapper = (fileName: string): string => {
  let path: string;
  switch (fileName) {
    case "index":
      path = "home/index";
      break;
    default:
      path = `${fileName}/index`;
      break;
  }
  return `${path}.html`;
};

const render = (fileName: string, props?: ejs.Data): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      let template = (
        await utils.readFile(utils.resolve("partials", pathMapper(fileName)))
      ).toString();
      resolve(ejs.render(template, { ...props }, { root: EJS_ROOT }));
    } catch (err) {
      reject(err);
    }
  });
};

router.redirect("/", "/ejs/index"); // 重定向/ejs到/ejs/index
router.get("/index", async (context: Context, next: Koa.Next) => {
  let carousels: models.Carousel[] = await controllers.carousel.all();
  context.state.props = { carousels };
  await next();
});

router.get("/product", async (context: Context, next: Koa.Next) => {
  await next();
});

// default route handler
router.use("/(.*)", async (context: Context) => {
  let path: string = context.request.path;
  let fileName: string | undefined = _.last(_.split(path, "/"));
  try {
    if (!fileName) throw new Error("cant find ejs partials to render");
    // context对象使用state.props属性传值
    let response: string = await render(fileName, context.state.props);
    context.body = response;
  } catch (err) {
    utils.logger.error(err.message);
  }
});

export default router;
