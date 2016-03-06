/// <reference path="../models/WindowManager.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/github-electron/github-electron.d.ts" />

const Electron = require("electron");
const angular = require("angular");
import osProcess = require("child_process");


class Script {
  name: string;
  command: string;
  interval: number;

  constructor(name: string, cmd: string, interval: number) {
    this.name = name;
    this.command = cmd;
    this.interval = interval;
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
