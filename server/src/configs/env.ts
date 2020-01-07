
export enum Envs {
  dev = "development",
  prod = "production"
}

export const ENV_CURRENT: string = process.env.NODE_ENV || Envs.dev;
export const IS_DEV: boolean = ENV_CURRENT === Envs.dev;
