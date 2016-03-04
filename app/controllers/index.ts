/// <reference path="../../typings/github-electron/github-electron.d.ts" />

import electron = require("electron");
import osProcess = require("child_process");

const BrowserWindow: typeof Electron.BrowserWindow = electron.BrowserWindow;
const app: Electron.App = electron.app;

class MyApplication {
  mainWindow: Electron.BrowserWindow = null;
  mainWindow2: Electron.BrowserWindow = null;

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
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 400,
      minWidth: 500,
      minHeight: 200,
      acceptFirstMouse: true
      //transparent: true
      //titleBarStyle: "hidden"
    });

    osProcess.exec("ls -l", function(err, stdout, stderr){
      console.log(stdout)
    });

    this.mainWindow2 = new BrowserWindow({
      width: 1200,
      height: 600,
      minWidth: 500,
      minHeight: 200,
      acceptFirstMouse: true,
      title: "test",
      alwaysOnTop: true
      //transparent: true
      //titleBarStyle: "hidden"
    });

    this.mainWindow.loadURL("file://" + __dirname + "/../views/index.html");

    this.mainWindow.on("closed", () => {
      this.mainWindow = null;
    });
  }

}

const myapp = new MyApplication(app);
