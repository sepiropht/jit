import { Author } from "./author";
import Blob from "./blob";
class Commit extends Blob {
  parent: string;
  private tree: string;
  author: Author;
  message: string;
  constructor(parent: string, tree: string, author: Author, message: string) {
    super(null);
    this.parent = parent || "";
    this.tree = tree;
    this.author = author;
    this.message = message;
  }
  type(): string {
    return "commit";
  }
  toBuffer(): Buffer {
    return Buffer.from(
      `tree ${this.tree}\nparent ${this.parent}\nauthor ${this.author}\ncommitter ${this.author}\n${this.message}`
    );
  }
}

export default Commit;
