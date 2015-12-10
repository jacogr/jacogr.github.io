angular
  .module('iso', ['ngRoute'])
  .constant('FULL', 15)
  .config(function($routeProvider, $locationProvider) { // eslint-disable-line prefer-arrow-callback
    $locationProvider.html5Mode(false);
  });
