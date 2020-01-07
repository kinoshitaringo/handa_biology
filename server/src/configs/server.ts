// 服务器设置
import { IS_DEV } from "./env";

const HOST: string = "http://127.0.0.1";
const PORT: number = IS_DEV ? 3001 : 80;
const SERVER_URL: string = `${HOST}:${PORT}`;

export interface ServerConfig {
  port: number;
  root: string;
  server_url: string;
  session: {
    secret: string;
    name: string;
    resave: boolean;
    saveUninitialized: boolean;
    proxy: boolean;
  }
}

export const serverConfig: ServerConfig = {
  port: PORT,
  root: "static",
  server_url: SERVER_URL,
  session: {
    // sha1(handa_biology)
    secret: "2228a7f4270c32b279cec514957be00924a18c58", // jwt_secret
    name: "handa_biology",
    resave: false,
    saveUninitialized: false,
    proxy: false
  }
}