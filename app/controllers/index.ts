/// <reference path="../../typings/github-electron/github-electron.d.ts" />
/// <reference path="../models/WindowManager.ts"/>
/// <reference path="../models/MenuManager.ts"/>


import electron = require("electron");
import osProcess = require("child_process");


const WindowManager = require("../models/WindowManager").WindowManager;
const MenuManager = require("../models/MenuManager").MenuManager;



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
    manager.create("config");
    manager.create("hello");

    MenuManager.getManager();

  }
}

const myapp = new MyApplication(app);
