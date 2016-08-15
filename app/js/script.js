(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/* App Module */

var phonecatApp = angular.module('plpApp', [
  'ngRoute',
  'plpControllers',
  'templates'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);

'use strict';

/* Controllers */

var phonecatControllers = angular.module('plpControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('phones/phones.json').success(function(data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';
    
  }]);

'use strict';

/* Directives */

'use strict';

/* Filters */

'use strict';

/* Services */


},{}]},{},[1])