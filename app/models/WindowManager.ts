/// <reference path="../../typings/github-electron/github-electron.d.ts" />

const Electron = require("electron");
const storage = require("electron-json-storage");

// WindowManager is a singleton class
export class WindowManager {
  visble: boolean;
  windows: Electron.BrowserWindow[];
  windowNames: string[];

  private static wmSingleton: WindowManager = null;
  constructor() {
    if (WindowManager.wmSingleton) {
      throw new Error("must use the getInstance.");
    }
    this.visble = false;
    this.windows = [];
    this.windowNames = [];
    WindowManager.wmSingleton = this;
  }
  public static getManager(): WindowManager {
    if (WindowManager.wmSingleton === null) {
      WindowManager.wmSingleton = new WindowManager();
    }
    return WindowManager.wmSingleton;
  }

  // toggle visible to move each widge
  toggleVisible() {
    for (let window of this.windows) {
      window.close();
    }
    this.windows = [];

    let names = this.windowNames;
    this.visble = !this.visble;
    this.windowNames = [];
    for (let name of names) {
      console.log(name);
      this.create(name);
    }
  }

  // restore window from `name` file
  create(name: string) {
    storage.get(name, (error, config) => {
      if (error) throw error;
      if (this.windowNames.indexOf(name) === -1) {

        let window = this.createWindow(config, this.visble);
        this.windows.push(window);
        this.windowNames.push(name);

        // TODO: load URL from config
        window.loadURL("file://" + __dirname + "/../views/index.html");
      //  window.loadURL("http://www.google.com/"); // works fine

        // when the window is closing, save the position
        window.on("close", () => {
          let position = {
            x: window.getPosition()[0],
            y: window.getPosition()[1],
            width: window.getSize()[0],
            height: window.getSize()[1]
          };
          storage.set(name, position, function (error) {
            if (error) throw error;
          });

          window = null;
        });
      }
    });
  }

  private createWindow(config, visible: boolean): Electron.BrowserWindow {
    let window = new Electron.BrowserWindow( {
      x: +config["x"] || 200,
      y: +config["y"] || 200,
      width: +config["width"] || 200,
      height: +config["height"] || 200,
      minWidth: 50,
      minHeight: 50,
      acceptFirstMouse: true,
      transparent: !visible,
      frame: visible,
//      type: visible ? "textured" : "desktop", // type desktop can not be movable
      titleBarStyle: "hidden"
    } );
    return window;
  }
}
