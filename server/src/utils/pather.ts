import path from "path";

export const DIR_CURRENT: string = __dirname;

export default function resolve(...dirs: string[]): string {
  let root: string = path.resolve(DIR_CURRENT, "../..");
  let result: string = path.resolve(root, ...dirs);
  return result;
}
