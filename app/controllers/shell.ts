/// <reference path="../models/WindowManager.ts"/>
/// <reference path="../models/MenuManager.ts"/>
/// <reference path="../../typings/angularjs/angular.d.ts"/>

import osProcess = require("child_process");
import angular = require("angular");

/*
osProcess.exec("ls -l", function(err, stdout, stderr){
  console.log(stdout);
});
*/
var app = angular.module("test", []);
app.controller("stdout", ['$scope', ($scope) => {
  $scope.data = "TEST";
 }]);
// console.log("loaded");
