/// <reference path="../../typings/github-electron/github-electron.d.ts" />
import Electron = require("electron");
const storage = require("electron-json-storage");

export class WindowManager {
  private static singleton: WindowManager = null;
  windows: Electron.BrowserWindow[];

  constructor() {
    if (WindowManager.singleton) {
      throw new Error("must use the getInstance.");
    }
    WindowManager.singleton = this;
  }
  public static getManager(): WindowManager {
    if (WindowManager.singleton === null) {
      WindowManager.singleton = new WindowManager();
    }
    return WindowManager.singleton;
  }

  // restore window from `name` file
  create(name: string) {
    storage.get(name, function (error, config) {
      if (error) throw error;

      let window = new Electron.BrowserWindow( {
        x: +config["x"] || 200,
        y: +config["y"] || 200,
        width: +config["width"] || 200,
        height: +config["height"] || 200,
        minWidth: 50,
        minHeight: 50,
        acceptFirstMouse: true,
        transparent: true,
        frame: false,
      //  type: "desktop",
        titleBarStyle: "hidden"
      } );
      // type desktop can not be movable

      // TODO: load URL from config
      window.loadURL("file://" + __dirname + "/../views/index.html");

      // when the window is closing, save the position
      window.on("close", () => {
        let position = {
          x: window.getPosition()[0],
          y: window.getPosition()[1],
          width: window.getSize()[0],
          height: window.getSize()[1]
        };
        console.log("closing: " + name);
        console.log(position);
        storage.set(name, position, function (error) {
          if (error) throw error;
        });
        window = null;
      });

    });
  }
}
