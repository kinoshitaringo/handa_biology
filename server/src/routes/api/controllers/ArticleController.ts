import { BaseContext } from "koa";
import { request, summary, tagsAll } from "koa-swagger-decorator";

@tagsAll(["Article"])
export default class ArticleController {
  @request("GET", "/open/articles")
  @summary("获取所有文章")
  public static async getArticles(context: BaseContext) {
    context.body = {};
  }
}
