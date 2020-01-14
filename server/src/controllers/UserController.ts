import _ from "lodash";
import { Context } from "koa";
import {
  description,
  query,
  request,
  responsesAll,
  summary,
  tagsAll
  } from "koa-swagger-decorator";
import { User } from "../models";

@responsesAll({
  200: { description: "OK" },
  400: { description: "bad request" },
  401: { description: "unauthorized,missing/wrong/expired jwt token" }
})
@tagsAll(["User"])
export default class UserProtected {
  @request("get", "/users")
  @summary("获取所有用户")
  public static async getUsers(context: Context) {
    // 获取所有的用户
    let allUsers: User[] = await User.find();
    context.body = { users: allUsers };
  }

  @request("get", "/user")
  @summary("根据id查用户")
  @query({
    id: { type: "number", request: true, description: "用户id" }
  })
  public static async getUserById(context: Context) {
    let user: User | undefined = await User.findOne({ id: context.query.id });
    if (!user) {
      context.status = 400;
      context.body = { description: "找不到该用户" };
    } else {
      let res = _.clone(user);
      delete res.password; // 不返回用户密码
      context.body = { description: "查询成功", user: user };
    }
  }

  public static async createUser(context: Context) {}
}

@responsesAll({
  200: { description: "OK" },
  400: { description: "bad request" },
  401: { description: "unauthorized,missing/wrong/expired jwt token" }
})
@tagsAll(["User"])
export class UserUnprotected {}
