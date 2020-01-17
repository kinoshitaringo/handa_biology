import { BaseContext } from "koa";
import {
  body,
  params,
  request,
  responses,
  responsesAll,
  summary,
  tagsAll
  } from "koa-swagger-decorator";

@tagsAll(["Auth"])
export default class AuthController {
  @request("POST", "/open/login")
  @summary("用户登陆接口")
  @body({
    account: {
      type: "string",
      required: true,
      example: "sutuo1988@live.com",
      description: "用户帐号"
    },
    password: {
      type: "string",
      required: true,
      example: "root123123",
      description: "密码"
    }
  })
  @responses({
    200: {
      description: "登陆成功"
    }
  })
  public static async login(context: BaseContext) {
    context.body = { msg: "登陆成功" };
  }
}
