import * as utils from "../utils";
import ejs from "ejs";
import hello from "../../template/demo";
import Koa, { Context } from "koa";
import Router from "koa-router";

let router: Router = new Router();

const EJS_ROOT: string = utils.resolve("template");
const HTML = ejs.compile(
  utils.readFileSync(utils.resolve("template", "html.ejs")).toString()
);

let render = (template: string, data?: ejs.Data): string => {
  return ejs.render(template, data, {
    root: EJS_ROOT
  });
};

router.get("/index", async (context: Context) => {
  let title: string = "站点首页";
  try {
    let raw: Buffer = await utils.readFile(
      utils.resolve("template", "index.html")
    );
    let index: string = raw.toString();
    let body: string = render(index);
    context.body = body;
  } catch (err) {
    utils.logger.error(err.message);
  }
});

export default router;
