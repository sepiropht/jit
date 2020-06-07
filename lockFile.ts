import * as path from "path";
class Lockfile {
  MissingParent = new Error();
  NoPermission = new Error();
  StaleLock = new Error();
  filePath: string;
  lockPath: string;
  constructor(pathname: string) {
    this.filePath = pathname;
    this.lockPath = path.extname(pathname);
  }
}
