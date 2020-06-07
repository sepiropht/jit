import { join } from "path";
import * as fs from "fs";

class Refs {
  private pathname: string;
  private headPath: string;
  constructor(pathname: string) {
    this.pathname = pathname;
  }
  updateHead(oid): void {
    this.headPath = join(this.pathname, "HEAD");
    fs.writeFileSync(this.headPath, oid);
  }

  readHead(): string {
    let result = "";
    console.log(this.headPath);
    try {
      result = fs.readFileSync(join(this.pathname, "HEAD")).toString();
    } catch {
      console.log("no head yet");
    }
    console.log(result);
    return result;
  }
}
export default Refs;
