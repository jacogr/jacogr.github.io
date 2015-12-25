angular
  .module('blockwars', ['ngCookies', 'firebase'])
  .constant('SIZE_WIDTH', 11)
  .constant('SIZE_HEIGHT', 18)
  .constant('BLOCK_START', 4)
  .constant('INTERVAL', 750)
  .config(function($locationProvider) {
    $locationProvider.html5Mode(false);
  });
