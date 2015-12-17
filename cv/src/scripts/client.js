angular
  .module('cv', ['ngSanitize'])
  .config(function($locationProvider) {
    $locationProvider.html5Mode(false);
  });
