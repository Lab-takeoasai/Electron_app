/// <reference path="../../typings/github-electron/github-electron.d.ts" />
/// <reference path="../models/WindowManager.ts"/>
/// <reference path="../models/MenuManager.ts"/>
/// <reference path="../models/Symlink.ts"/>

import electron = require("electron");

const CreateSymLink = require("../models/Symlink").CreateSymLink;
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
    manager.restoreFromJsons();

    MenuManager.getManager();
    CreateSymLink.create();

  }
}

const myapp = new MyApplication(app);
