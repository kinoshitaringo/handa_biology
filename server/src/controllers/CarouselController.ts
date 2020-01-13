import Koa, { Context } from "koa";
import { Carousel } from "../models";
import {
  description,
  query,
  request,
  responsesAll,
  summary,
  tagsAll
  } from "koa-swagger-decorator";

@responsesAll({
  200: { description: "OK" },
  400: { description: "bad request" },
  401: { description: "unauthorized,missing/wrong/expired jwt token" }
})
@tagsAll(["carousel"])
export default class CarouselController {
  @request("get", "/carousels")
  @summary("获取轮播图")
  public static async getCarousels(context: Context) {
    let carousels: Carousel[] = [];
    context.body = carousels;
  }

  @request("post", "/carousel")
  @summary("新增轮播图")
  public static async addCarousels(context: Context) {
    context.body = { description: "新增成功" };
  }
}
