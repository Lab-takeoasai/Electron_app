/// <reference path="../../typings/github-electron/github-electron.d.ts" />
/// <reference path="../models/WindowManager.ts"/>
/// <reference path="../models/MenuManager.ts"/>


import electron = require("electron");
import osProcess = require("child_process");
import wm = require("../models/WindowManager");
import mm = require("../models/MenuManager");



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
    let manager = new wm.WindowManager();
    manager.create("config");
    manager.create("hello");

    let m = new mm.MenuManager();

    osProcess.exec("ls -l", function(err, stdout, stderr){
      console.log(stdout);
    });
  }
}

const myapp = new MyApplication(app);
