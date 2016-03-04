/// <reference path="../../typings/github-electron/github-electron.d.ts" />

class WindowManager {
  windows: Electron.BrowserWindow[];
  constructor() {
    this.windows = null;
  }
  create() {
    const w = new Electron.BrowserWindow( {
      width: 400,
      height: 400,
      minWidth: 400,
      minHeight: 400,
      resizable: true
    } );
    return w;
  }
}
