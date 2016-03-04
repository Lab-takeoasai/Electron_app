/// <reference path="../../typings/github-electron/github-electron.d.ts" />
import Electron = require("electron");


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
      },
    ];


    let menu = Menu.buildFromTemplate(template);
    //Menu.setApplicationMenu(menu);

    console.log("loaded");
  }
}
