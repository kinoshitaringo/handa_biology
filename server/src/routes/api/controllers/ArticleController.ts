import { BaseContext } from "koa";
import { request, tagsAll } from "koa-swagger-decorator";

@tagsAll(["Article"])
export default class ArticleController {
  @request("GET", "/open/articles")
  public static async getArticles(context: BaseContext) {
    context.body = {};
  }
}
