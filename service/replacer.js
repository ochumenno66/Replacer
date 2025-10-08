import fs from "node:fs/promises";
import path from "node:path";
import { EventEmitter } from "node:events";

export class Replacer extends EventEmitter {
  constructor(dir, search, replace) {
    super();
    this.dir = dir;
    this.search = search;
    this.replace = replace;
  }

  async replaceInFiles() {
    try {
      const files = await fs.readdir(this.dir);
      const txtFiles = files.filter(f => path.extname(f) === ".txt");

      let wasReplaced = false;

      for (const file of txtFiles) {
        const filePath = path.join(this.dir, file);
        const content = await fs.readFile(filePath, "utf8");

        if (!content.includes(this.search)) {
          continue;
        }

        const updated = content.split(this.search).join(this.replace);
        await fs.writeFile(filePath, updated, "utf8");

        wasReplaced = true;
      }

      if (wasReplaced) {
        this.emit("done");
      }

    } catch (err) {
      this.emit("error", err);
    }
  }
}
