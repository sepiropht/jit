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
    const str = object.toString();
    const content = `${object.type}${
      new TextEncoder().encode(str).length
    }\0${str}`;
    const shasum = crypto.createHash("sha1");
    shasum.update(content);
    object.oid = shasum.digest("hex");
    await this.writeObject(object.oid, content);
  };
  private writeObject = async (oid: string, content: string): Promise<void> => {
    console.log("pathname", this.pathname);
    const object_path = join(this.pathname, oid.slice(0, 2), oid.slice(2, -2));
    const dirname = parse(object_path).dir;
    console.log("DIRNAME", dirname);
    await mkdirp(dirname);
    const buffered = Buffer.from(content);
    console.log(buffered, "bufffffffffffffffffffffff");
    deflate(buffered, (_, buffer) => {
      writeFile(object_path, buffer, () => console.log("done"));
    });
  };
}

export default Database;
