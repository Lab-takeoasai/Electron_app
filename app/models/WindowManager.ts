/// <reference path="../../typings/github-electron/github-electron.d.ts" />
/// <reference path="../../typings/glob/glob.d.ts" />
/// <reference path="./Script.ts"/>

const Electron = require("electron");
const storage = require("electron-json-storage");
const glob = require("glob");
const path = require("path");

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


  // restore windows from userData
  restoreFromJsons() {
    glob(Electron.app.getPath("userData") + "/*.json", (err, matches) => {
      let configNames = matches.map(($0) => {
        return path.basename($0, ".json");
      });

      for (let name of configNames) {
        this.create(name);
      }
    });
  }

  // restore window from `name` file
  private create(name: string) {
    storage.get(name, (error, config) => {
      if (error) throw error;
      if (this.windowNames.indexOf(name) === -1) {

        let window = this.createWindow(config, this.visble);
        this.windows.push(window);
        this.windowNames.push(name);

        // TODO: load URL from config
      //  window.loadURL("file://" + __dirname + "/../views/index.html");
        window.loadURL("file://" + Electron.app.getPath("userData") + "/" + name + ".html");

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
