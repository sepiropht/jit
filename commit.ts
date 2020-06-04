import { Author } from "./author";
import Blob from "./blob";
class Commit extends Blob {
  private tree: string;
  author: Author;
  message: string;
  constructor(tree: string, author: Author, message: string) {
    super(null);
    this.tree = tree;
    this.author = author;
    this.message = message;
  }
  type(): string {
    return "commit";
  }
  toBuffer(): Buffer {
    return Buffer.from(
      `tree ${this.tree}\nauthor ${this.author}\ncommitter ${this.author}\n${this.message}`
    );
  }
}

export default Commit;
