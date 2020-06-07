#!/usr/bin/env ts-node

import * as mkdirp from "mkdirp";
import { join } from "path";
import * as fs from "fs";
import WorkSpace from "./workspace";
import Database from "./Database";
import blob from "./blob";
import Entry from "./entry";
import Tree from "./tree";
import Refs from "./refs";
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

      const refs = new Refs(gitPath);
      let entries: Entry[] = [];

      for (const file of workSpace.listFiles()) {
        const data = workSpace.readFile(file);
        const bloB = new blob(data);
        const mode = workSpace.getMode(file);
        await database.store(bloB);

        entries.push(new Entry(file, bloB.oid, mode));
      }

      const tree = new Tree(entries);
      database.store(tree);

      const parent = refs.readHead();
      console.log({ parent });

      const name = process.env?.GIT_AUTHOR_NAME || "sepiropht";
      const email = process.env?.GIT_AUTHOR_EMAIL || "sergembotta@mailoo.org";
      const author = new Author(name, email, new Date());
      const message = fs.readFileSync("/dev/stdin").toString();

      const commit = new Commit(parent, tree.oid, author, message);

      database.store(commit);

      refs.updateHead(commit.oid);
      const Head = join(gitPath, "HEAD");

      fs.writeFileSync(Head, commit.oid);
      const isRoot = parent ? "" : "(root-commit)";
      console.log({ isRoot });
      console.log(`[${isRoot} ${commit.oid}] ${message}`);
      process.exit(0);
    }
    default: {
      console.error(`jit: '${command}' is not a jit command.`);
      process.exit(1);
    }
  }
})();
