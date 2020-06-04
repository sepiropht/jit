import Entry from "./entry";
import Blob from "./blob";

const MODE = "100644";

class Tree extends Blob {
  private entries: Entry[];
  constructor(entries: Entry[]) {
    super(null);
    this.entries = entries;
  }
  type() {
    return "tree";
  }

  toBuffer(): Buffer {
    this.entries.sort();
    return this.entries
      .map(({ name, oid }) => {
        let modeBuffer = Buffer.from(MODE.padEnd(7));
        let fileNameBuffer = Buffer.from(name + "\0");
        let shaBuffer = Buffer.from(oid, "hex");
        return Buffer.concat([modeBuffer, fileNameBuffer, shaBuffer]);
      })
      .reduce(
        (finalBuff, currBuff) => Buffer.concat([finalBuff, currBuff]),
        Buffer.from("")
      );
  }
}
export default Tree;
