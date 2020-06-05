import * as mkdirp from "mkdirp";
import { join } from "path";
import * as fs from "fs";
import WorkSpace from "./workspace";
import Database from "./Database";
import blob from "./blob";
import Entry from "./entry";
import Tree from "./tree";
import { Author } from "./author";
import Commit from "./commit";

(async () => {
  const command = process.argv[2];
  const rootPath = process.argv[3] || __dirname;
  const gitPath = join(rootPath, ".jit");
  switch (command) {
    case "init": {
      await mkdirp(gitPath);
      for (const dir of ["objects", "refs"]) {
        await mkdirp(join(gitPath, dir)).catch((err) =>
          console.error(`fatal: ${err.message}`)
        );
      }
      console.info(`Initialized empty Jit repository in ${gitPath}`);
      process.exit(0);
    }
    case "commit": {
      const dbPath = join(gitPath, "objects");
      const workSpace = new WorkSpace(rootPath);
      const database = new Database(dbPath);
      let entries: Entry[] = [];

      for (const file of workSpace.listFiles()) {
        const data = workSpace.readFile(file);
        const bloB = new blob(data);

        await database.store(bloB);

        entries.push(new Entry(file, bloB.oid));
      }

      const tree = new Tree(entries);
      database.store(tree);

      const name = process.env?.GIT_AUTHOR_NAME || "sepiropht";
      const email = process.env?.GIT_AUTHOR_EMAIL || "sergembotta@mailoo.org";
      const author = new Author(name, email, new Date());
      const message = fs.readFileSync("/dev/stdin").toString();
      const commit = new Commit(tree.oid, author, message);

      database.store(commit);
      const Head = join(gitPath, "HEAD");

      fs.writeFileSync(Head, commit.oid);
      console.log(`[(root-commit) ${commit.oid}] ${message}`);
      process.exit(0);
    }
    default: {
      console.error(`jit: '${command}' is not a jit command.`);
      process.exit(1);
    }
  }
})();
