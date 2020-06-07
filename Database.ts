import * as crypto from "crypto";
import { join, parse } from "path";
import { deflateSync } from "zlib";
import blob from "./blob";
import * as mkdirp from "mkdirp";
import { writeFileSync, existsSync } from "fs";

interface Database {
  pathname: string;
}

class Database {
  constructor(pathname: string) {
    this.pathname = pathname;
  }
  store = (object: blob) => {
    const str = object.toBuffer();
    const content = Buffer.concat([
      Buffer.from(`${object.type}${str.length}\0`),
      str,
    ]);
    const shasum = crypto.createHash("sha1");
    shasum.update(content);
    object.oid = shasum.digest("hex");
    writeObject(object.oid, content, this.pathname);
  };
}
function writeObject(oid: string, content: Buffer, pathname) {
  //console.log("pathname", pathname);
  const objectPath = join(pathname, oid.slice(0, 2), oid.slice(2, -2));

  //object already exist do nothing
  if (existsSync(objectPath)) return;

  const dirname = parse(objectPath).dir;
  console.log("DIRNAME", dirname);
  mkdirp.sync(dirname);
  //console.log(content, "bufffffffffffffffffffffff");
  console.log("OID:", oid);
  //console.log("OTDOOOOO", dirname);
  const buffer = deflateSync(content);
  //console.log("inside deflate ");
  writeFileSync(objectPath, buffer);
  //console.log("done", dirname);
}
export default Database;
