/// <reference path="../../typings/github-electron/github-electron.d.ts" />

import Electron = require("electron");

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
