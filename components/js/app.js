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
