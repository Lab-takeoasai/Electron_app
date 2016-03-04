/// <reference path="../../typings/github-electron/github-electron.d.ts" />
import Electron = require("electron");

export class WindowManager {
  windows: Electron.BrowserWindow[];
  constructor() {
    this.windows = [];
  }
  create() {
    let window = new Electron.BrowserWindow( {
      width: 400,
      height: 400,
      minWidth: 200,
      minHeight: 200,
      acceptFirstMouse: true,
      transparent: true,
      titleBarStyle: "hidden-inset"
    } );
    window.loadURL("file://" + __dirname + "/../views/index.html");
    this.windows.push(window);

    window.on("closed", () => {
      let index = this.windows.indexOf(window, 0);
      if (index > -1) {
        this.windows.splice(index, 1);
      }
      window = null;
    });
  }
}
