import { BaseContext } from "koa";
import {
  body,
  query,
  request,
  responsesAll,
  summary,
  tagsAll
  } from "koa-swagger-decorator";
import { User } from "../../../models";

@responsesAll({
  200: { description: "OK" },
  400: { description: "Bad Request" },
  401: { description: "unauthorized,missing/wrong jwt token" }
})
@tagsAll(["User"])
export default class UserController {
  @request("GET", "/open/users")
  @summary("find all users")
  public static async getUsers(context: BaseContext) {
    let users: User[] = await User.find();
    let response = {
      description: "查询成功",
      users
    };
    context.body = response;
  }

  @request("POST", "/auth/user")
  @summary("新增用户")
  public static async createUser(context: BaseContext) {
    let user: User = new User();
    context.body = user;
  }
}
