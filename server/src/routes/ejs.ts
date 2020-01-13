import * as utils from "../utils";
import _ from "lodash";
import ejs from "ejs";
import Koa, { Context } from "koa";
import Router from "koa-router";

interface Carousel {
  img: string;
  title: string;
  description: string;
}

let router: Router = new Router();

const EJS_ROOT: string = utils.resolve("partials");

const render = (fileName: string, props?: ejs.Data): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      let template = (
        await utils.readFile(
          utils.resolve("partials/views", `${fileName}.html`)
        )
      ).toString();
      resolve(ejs.render(template, { ...props }, { root: EJS_ROOT }));
    } catch (err) {
      reject(err);
    }
  });
};

router.get("/index", async (context: Context, next: Koa.Next) => {
  let carousels: Array<Carousel> = [
    {
      img: "img/first.jpg",
      title: "Theme based on Responsee framework",
      description: "With amazing responsive carousel"
    },
    {
      img: "img/second.jpg",
      title: "Build new layout in 10 minutes!",
      description: "With amazing responsive carousel"
    },
    {
      img: "img/third.jpg",
      title: "Theme based on Responsee framework",
      description: "With amazing responsive carousel"
    }
  ];
  context.state.props = { carousels };
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
