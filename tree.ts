import Entry from "./entry";
import Blob from "./blob";

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
      .map(({ mode, name, oid }) => {
        let modeBuffer = Buffer.from(mode.padEnd(7));
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
