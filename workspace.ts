import * as fs from "fs";
import { join, relative } from "path";

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
    return this.getAllFiles(this.pathname, []).filter(
      (file) => !this.ignore.includes(file)
    );
  }
  readFile(path: string): Buffer {
    return fs.readFileSync(join(this.pathname, path));
  }

  getMode(file: string): number {
    return parseInt(fs.statSync(file).mode.toString(8), 10);
  }
  getAllFiles(dirPath: string, arrayOfFiles: Array<string>) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach((file) => {
      if (this.ignore.includes(file)) {
        return;
      }
      if (fs.statSync(join(dirPath, file)).isDirectory()) {
        arrayOfFiles = this.getAllFiles(join(dirPath, file), arrayOfFiles);
      } else {
        const relativePath = relative(this.pathname, dirPath);
        arrayOfFiles.push(join(relativePath, file));
      }
    });

    return arrayOfFiles;
  }
}

export default Workspace;
