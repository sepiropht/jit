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

  toString(): string {
    this.entries.sort();
    return this.entries
      .map(({ name, oid }) => {
        let enc = new TextEncoder();
        let modeArray = enc.encode(MODE.padEnd(7));
        let fileNameArray = enc.encode(name + "\0");
        let shaArray = Uint8Array.from(oid.match(/../g), (x) =>
          parseInt(x, 16)
        );
        let array = new Uint8Array([
          ...modeArray,
          ...fileNameArray,
          ...shaArray,
        ]);
        return new TextDecoder("utf-8").decode(array);
      })
      .join("");
  }
}
export default Tree;
