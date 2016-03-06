/// <reference path="../../typings/github-electron/github-electron.d.ts" />

import Electron = require("electron");
const path = require("path");

// create symbolic link to appDir
export class CreateSymLink {
  static create() {
    let userPath = Electron.app.getPath("userData") + "/Script.js";
    let execPath = __dirname + "/Script.js";

    // if already exists, skip create a symlink
    let fs = require("fs");
    let stats = fs.lstatSync(userPath);
    if (!stats.isSymbolicLink()) {
      fs.symlink(execPath, userPath, (err) => {
        console.log(err || "Done.");
      });
    }
  }
}

export class CopyDefault {
  static copyUnlessExists(name: string) {
    let userPath = Electron.app.getPath("userData") + "/" + name + ".html";
    let execPath = path.normalize(__dirname + "/../views/index.html");

    let fs = require("fs");
    if (!fs.existsSync(userPath)) {
      require("filecopy")(execPath, userPath, {mkdirp: true}, (err) => {
        console.log(err);
      });
    }
  }
}
