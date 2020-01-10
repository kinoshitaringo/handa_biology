import {
  path,
  request,
  responsesAll,
  summary,
  tagsAll,
} from "koa-swagger-decorator";
import { User } from "../models";
import { Context } from "koa";

@responsesAll({
  200: { description: "success" },
  400: { description: "success" },
  401: { description: "unauthorized,missing/wrong/expired jwt token" },
})
@tagsAll(["User"])
export default class UserController {
  @request("get", "/users")
  @summary("Find All users")
  public static async getUsers(context: Context) {
    let allUsers: User[] = await User.find();
    context.body = { users: allUsers };
  }
}
