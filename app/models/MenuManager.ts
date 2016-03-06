/// <reference path="../../typings/github-electron/github-electron.d.ts" />
/// <reference path="./WindowManager.ts"/>

const Menu = require("menu");
const Electron = require("electron");
const WindowManager = require("./WindowManager").WindowManager;
const Tray = Electron.Tray;
const nativeImage = Electron.nativeImage;
const path = require("path");

const SUPPORT_URL = "https://github.com/takeo-asai/Electron_app/";

// MenuManager is a singleton class
export class MenuManager {
  private static mmSingleton: MenuManager = null;

  constructor() {
    if (WindowManager.mmSingleton) {
      throw new Error("must use the getInstance.");
    }

    // initialize default menubar
    let template = [];
    template.push(this.viewMenu());
    template.push(this.helpMenu());
    template.unshift(this.appleMenu());

    // init menubar
    let iconPath = path.normalize(__dirname + "/../../Stock_graph.png"); // `must` normalize icon_path
    let appIcon = new Tray(nativeImage.createFromPath(iconPath));
    let menu = Menu.buildFromTemplate(template);
    appIcon.setContextMenu(menu);
    appIcon.setToolTip("This is sample.");
    Menu.setApplicationMenu(menu);

    MenuManager.mmSingleton = this;
  }
  public static getManager(): MenuManager {
    if (MenuManager.mmSingleton === null) {
      MenuManager.mmSingleton = new MenuManager();
    }
    return MenuManager.mmSingleton;
  }

  // each MenuItem is divided as a function
  helpMenu() {
    let menu = {
      label: "Help", role: "help",
      submenu: [
        {label: "Learn More", click: () => { Electron.shell.openExternal(SUPPORT_URL); }},
        {label: "Open Data Folder", click: () => { Electron.shell.showItemInFolder(Electron.app.getPath("userData") + "/"); }},
      ]
    };
    return menu;
  }

  appleMenu() {
    if (process.platform === "darwin") {
      let app = Electron.app;
      let name = app.getName();
      let menu = {
        label: name,
        submenu: [
          {label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }},
        ]
      };
      return menu;
    }
  }

  viewMenu() {
    let menu = {
      label: "View",
      submenu: [
        {label: "Reload", accelerator: "CmdOrCtrl+R",
          click: function(item, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          }
        },
        {type: "separator"},
        {label: "Toggle visible", click: () => { WindowManager.getManager().toggleVisible(); }},
      ]
    };
    return menu;
  }
}
