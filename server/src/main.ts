import bodyParser from "koa-bodyparser";
import cluster from "cluster";
import compress from "koa-compress";
import configs from "./configs";
import cors from "@koa/cors";
import errorPage from "./middlewares/errorPage";
import helmet from "koa-helmet";
import http from "http";
import jwt from "koa-jwt";
import Koa, { Context } from "koa";
import os from "os";
import router from "./routes";
import zlib from "zlib";
import { logger, skip, stream } from "./utils/logger";
import { createConnection } from "typeorm";

interface ServerAddress {
  address: string;
  port: number;
  addressType: string;
}

const KB: number = 1024;

class Server {
  private _app: Koa;
  private _server: http.Server;

  constructor() {
    this._app = new Koa();
    this._app.use(bodyParser()); // Enable bodyParser with default options
    // 数据库连接
    createConnection(configs.databaseConfig as any)
      .then(connection => {
        logger.info("Database synced");
        this._app.use(router.routes()).use(router.allowedMethods()); // 使用路由
      })
      .catch(err => logger.error((err as Error).message));
    // 压缩
    this._app.use(
      compress({
        threshold: 2 * KB,
        flush: zlib.Z_SYNC_FLUSH,
      })
    );
    // 跨域
    this._app.use(
      cors({
        credentials: true,
        origin: "http://127.0.0.1:3000",
      })
    );
    this._app.use(helmet()); // Provides important security headers to make your app more secure
    this._app.use(errorPage); // 处理404错误
    this._server = http.createServer(this._app.callback());
  }

  private _onError(err: NodeJS.ErrnoException): void {
    if (err.syscall) {
      throw err;
    }

    let port: number = configs.serverConfig.port;
    let bind: string = `Port: ${port}`;

    switch (err.code) {
      case "EACCES":
        logger.error(`[EACCES] ${bind} requires elevated privileges.`);
        process.exit(1);
      case "EADDRINUSE":
        logger.error(`[EADDRINUSE] ${bind} is already in use.`);
        process.exit(1);
      default:
        throw err;
    }
  }

  private _onListening(): void {
    let address: any = this._server.address();
    let bind: string = `port ${address.port}`;
    logger.info(`Listening to ${bind}`);
  }

  public async start(): Promise<void> {
    if (cluster.isMaster) {
      // 主线程,同步数据库
      try {
        // for (let i = 0; i < os.cpus().length; i++) {
        for (let i = 0; i < 2; i++) {
          cluster.fork();
        }

        cluster.on(
          "exit",
          (worker: cluster.Worker, code: number, signal: string) => {
            logger.info(`Worker ${worker.process.pid} died`);
          }
        );

        cluster.on(
          "listening",
          (worker: cluster.Worker, address: cluster.Address) => {
            logger.info(
              `Worker ${worker.process.pid} connected to port: ${address.port}`
            );
          }
        );
      } catch (err) {
        logger.error((err as Error).message);
      }
    } else {
      // 子线程
      this._server.listen(configs.serverConfig.port);
      this._server.on("error", (err: Error): void => {
        this._onError(err);
      });
      this._server.on("listening", (): void => {
        this._onListening();
      });
    }
  }

  public stop(): void {
    this._server.close();
    process.exit();
  }
}

let server: Server = new Server(); // 创建一个服务器实例
server.start(); // 启动服务器
process.on("SIGINT", () => server.stop()); // 在终端按下<ctrl-c>终止服务
