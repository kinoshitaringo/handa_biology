import fs from "fs";

export const readFile = (fileName: string): Promise<Buffer> => {
  return new Promise((resolve: Function, reject: Function) => {
    fs.readFile(fileName, (err: NodeJS.ErrnoException | null, data: Buffer) => {
      err ? reject(err) : resolve(data);
    });
  });
};

export const readFileSync = (fileName: string) => fs.readFileSync(fileName);
