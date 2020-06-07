import * as fs from "fs";
import { join } from "path";

interface Workspace {
  pathname: string;
  ignore: string[];
}
class Workspace {
  constructor(pathname: string) {
    this.pathname = pathname;
    this.ignore = [".", "..", ".jit", ".git", "node_modules"];
  }
  listFiles(): string[] {
    return fs
      .readdirSync(this.pathname)
      .filter((file) => !this.ignore.includes(file));
  }
  readFile(path): Buffer {
    return fs.readFileSync(join(this.pathname, path));
  }

  getMode(file: string): number {
    return parseInt(fs.statSync(file).mode.toString(8), 10);
  }
}

export default Workspace;
