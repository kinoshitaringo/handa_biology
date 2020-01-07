import bodyParser from "koa-bodyparser";
import cluster, { Address, Worker } from "cluster";
import compress from "koa-compress";
import configs from "./configs";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import http from "http";
import jwt from "koa-jwt";
import Koa, { Context } from "koa";
import zlib from "zlib";
import { createConnection } from "typeorm";

const KB: number = 1024;
class Server {
  private _app: Koa;
  private _server: http.Server;

  constructor() {
    this._app = new Koa();
    this._app.use(bodyParser()); // Enable bodyParser with default options
    // 压缩
    this._app.use(compress({
      threshold: 2 * KB,
      flush: zlib.Z_SYNC_FLUSH
    }));
    // 跨域
    this._app.use(cors({
      credentials: true,
      origin: "http://127.0.0.1:3000",
    }));
    this._app.use(helmet()); // Provides important security headers to make your app more secure
    this._app.use(jwt({ secret: configs.serverConfig.session.secret }).unless({ path: [/^\/swagger-/] }));
    this._server = http.createServer(this._app.callback);
  }

  public async start(): Promise<void> {
    if (cluster.isMaster) {
      // 主线程,同步数据库
    }
  }
}
