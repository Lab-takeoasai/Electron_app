/// <reference path="../models/WindowManager.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/github-electron/github-electron.d.ts" />

const Electron = require("electron");
import osProcess = require("child_process");
import angular = require("angular");
const storage = require("electron-json-storage");


class Script {
  name: string;
  command: string;
  interval: number;

  // create symbolic link to appDir
  static createSymlink() {
    console.log(Electron.app.getPath("userData"));
    /*
    require("fs").symlink(
  projectRoot + "/some-dir/alice.json"
, projectRoot + "/some-dir/foo"
, function (err) { console.log(err || "Done."); }
);*/
  }

  constructor(name: string, cmd: string, interval: number) {
    this.name = name;
    this.command = cmd;
    this.interval = interval;

    storage.get(name, (error, config) => {
      if (error) throw error;
      //this.command = config["cmd"];
      //this.interval = +config["interval"];
      console.log(config["cmd"]);
    });
  }

  // exec command
  exec() {
    let app = angular.module(this.name, []);
    app.controller("stdout", ["$scope", "$interval", ($scope, $interval) => {
      $interval( () =>
      osProcess.exec(this.command, (err, stdout, stderr) => {
        $scope.$apply(function () { // $apply is needed to be displayed ASAP (because of AJAX callback)
          $scope.data = stdout;
        });
      }), this.interval);
    }]);
  }
}

let s = new Script("default", "ps -amcwwwxo \"command %mem %cpu\" | grep -v grep | head -13", 1000);
// let s = new Script("test", "date \"+%S\"", 1000);
s.exec();
