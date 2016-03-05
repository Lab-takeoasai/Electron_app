/// <reference path="../../typings/github-electron/github-electron.d.ts" />
/// <reference path="./WindowManager.ts"/>

const Menu = require("menu");
const Electron = require("electron");
const WindowManager = require("./WindowManager").WindowManager;

const SUPPORT_URL = "https://github.com/takeo-asai/Electron_app/";

export class MenuManager {
  private static mmSingleton: MenuManager = null;


  // MenuManager is a singleton class


  helpMenu() {
    let menu = {
      label: "Help", role: "help",
      submenu: [
        {label: "Learn More", click: () => { Electron.shell.openExternal(SUPPORT_URL); }},
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
          {label: "test", click: () => {}},
          {type: "separator"},
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

  constructor() {
    if (WindowManager.mmSingleton) {
      throw new Error("must use the getInstance.");
    }

    let template = [];
    template.push(this.viewMenu());
    template.push(this.helpMenu());
    template.unshift(this.appleMenu());

    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    MenuManager.mmSingleton = this;
  }
  public static getManager(): MenuManager {
    if (MenuManager.mmSingleton === null) {
      MenuManager.mmSingleton = new MenuManager();
    }
    return MenuManager.mmSingleton;
  }

}
