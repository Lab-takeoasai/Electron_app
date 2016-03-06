/// <reference path="../../typings/github-electron/github-electron.d.ts" />
/// <reference path="../models/WindowManager.ts"/>
/// <reference path="../models/MenuManager.ts"/>
/// <reference path="../models/Script.ts"/>

import electron = require("electron");

const WindowManager = require("../models/WindowManager").WindowManager;
const MenuManager = require("../models/MenuManager").MenuManager;
//import sc = require("../models/Script");
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
    let manager = WindowManager.getManager();
    manager.restoreFromJsons();

    MenuManager.getManager();
    //Script.createSymlink();
    //let s = new Script("default", "ps -amcwwwxo \"command %mem %cpu\" | grep -v grep | head -13", 1000);
    // let s = new Script("test", "date \"+%S\"", 1000);
    //s.exec();

  }
}

const myapp = new MyApplication(app);
