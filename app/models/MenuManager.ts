/// <reference path="../../typings/github-electron/github-electron.d.ts" />
/// <reference path="./WindowManager.ts"/>

import Electron = require("electron");
import wm = require("./WindowManager");


const Menu = Electron.Menu;
const MenuItem = Electron.MenuItem;
const app: Electron.App = Electron.app;

export class MenuManager {
  constructor() {

    let template = [
      {
        label: "View",
        submenu: [
          {
            label: "Reload",
            accelerator: "CmdOrCtrl+R",
            click: function(item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.reload();
            }
          },
          {
            label: "Show visible",
            click: (item, focusedWindow) => {
              wm.WindowManager.getManager().toggleVisible();
            }
          }
        ]
      },
      {
        label: "Help",
        role: "help",
        submenu: [
          {
            label: "Learn More about something",
            click: function() { require("electron").shell.openExternal("http://electron.atom.io") }
          },
        ]
      }
    ];

    if (process.platform === "darwin") {
      let name = app.getName();
      template.unshift({
        label: name,
        submenu: [
          /*{
            label: "About" + name,
            role: "about"
          },
          {
            type: "separator"
          },
          {
            type: "separator"
          },
          {
            label: "Hide Others",
            accelerator: "Command+Alt+H",
            role: "hideothers"
          },
          {
            label: "Show All",
            role: "unhide"
          },
          {
            type: "separator"
          },*/
          {
            label: "Quit",
            accelerator: "Command+Q",
            click: function() { app.quit(); }
          },
        ]
      });
    }
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
}
