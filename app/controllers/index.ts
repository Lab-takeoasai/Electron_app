/// <reference path="../../typings/github-electron/github-electron.d.ts" />
/// <reference path="../models/WindowManager.ts"/>``

import electron = require("electron");
import osProcess = require("child_process");
import wm = require("../models/WindowManager");

const app: Electron.App = electron.app;

class MyApplication {
  constructor(public app: Electron.App) {
    this.app.on("window-all-closed", this.onWindowAllClosed);
    this.app.on("ready", this.onReady);
  }

  onWindowAllClosed() {
    if (process.platform !== "darwin") {
      this.app.quit();
    }
  }

  onReady() {
    const manager = new wm.WindowManager();
    manager.create();
    manager.create();
    manager.create();
    manager.status();

    osProcess.exec("ls -l", function(err, stdout, stderr){
      console.log(stdout);
    });
  }
}

const myapp = new MyApplication(app);
