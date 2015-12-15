angular
  .module('cuberoom', ['ngRoute'])
  .constant('SIZE_DISPLAY', 21)
  .config(function($routeProvider, $locationProvider) { // eslint-disable-line prefer-arrow-callback
    $locationProvider.html5Mode(false);
  });
