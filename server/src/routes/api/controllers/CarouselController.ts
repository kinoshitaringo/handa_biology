import { BaseContext } from "koa";
import { Carousel } from "../../../models";
import {
  request,
  responses,
  summary,
  tagsAll
  } from "koa-swagger-decorator";

@tagsAll(["Carousel"])
export default class CarouselController {
  @request("GET", "/open/carousels")
  @summary("获取轮播图")
  @responses({ 200: { description: "获取成功" } })
  public static async getCarousels(context: BaseContext) {
    let carousels: Carousel[] = await CarouselController.all();
    context.body = { description: "获取成功", carousels };
  }

  public static async all(): Promise<Carousel[]> {
    // 获取所有轮播图
    let carousels: Carousel[] = await Carousel.find();
    return carousels;
  }
}
