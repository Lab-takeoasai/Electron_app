/// <reference path="../../typings/github-electron/github-electron.d.ts" />
import Electron = require("electron");
const storage = require("electron-json-storage");


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

    // when window is closed, the window is removed from array
    window.on("closed", () => {
      let index = this.windows.indexOf(window, 0);
      if (index > -1) {
        this.windows.splice(index, 1);
      }
      window = null;
    });
  }

  status() {
    for (let window of this.windows) {
      console.log("title: " + window.getTitle());

      let json = {
        user: "hoge-hoge"
      };
      storage.set("config", json, function (error) {
        if (error) throw error;
      });
    }
  }

}
