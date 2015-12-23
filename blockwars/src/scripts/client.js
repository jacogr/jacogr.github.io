angular
  .module('blockwars', ['firebase'])
  .constant('SIZE_WIDTH', 11)
  .constant('SIZE_HEIGHT', 16)
  .constant('BLOCK_START', 4)
  .constant('INTERVAL', 750)
  .config(function($locationProvider) {
    $locationProvider.html5Mode(false);
  });
