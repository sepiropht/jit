import * as crypto from "crypto";
import { join, parse } from "path";
import { deflate } from "zlib";
import blob from "./blob";
import * as mkdirp from "mkdirp";
import { writeFile } from "fs";

interface Database {
  pathname: string;
}

class Database {
  constructor(pathname: string) {
    this.pathname = pathname;
  }
  store = async (object: blob) => {
    const str = object.toBuffer();
    const content = Buffer.concat([
      Buffer.from(`${object.type}${str.length}\0`),
      str,
    ]);
    const shasum = crypto.createHash("sha1");
    shasum.update(content);
    object.oid = shasum.digest("hex");
    await this.writeObject(object.oid, content);
  };
  private writeObject = async (oid: string, content: Buffer): Promise<void> => {
    console.log("pathname", this.pathname);
    const object_path = join(this.pathname, oid.slice(0, 2), oid.slice(2, -2));
    const dirname = parse(object_path).dir;
    console.log("DIRNAME", dirname);
    await mkdirp(dirname);
    console.log(content, "bufffffffffffffffffffffff");
    deflate(content, (_, buffer) => {
      writeFile(object_path, buffer, () => console.log("done"));
    });
  };
}

export default Database;
