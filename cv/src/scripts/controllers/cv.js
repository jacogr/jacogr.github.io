angular
  .module('cv')
  .controller('cvController', function($location, $scope, $timeout, CVData) {
    this.data = CVData;
    this.entry = undefined;

    this.isPath = function(path) {
      return $location.path() === path;
    };

    $scope.$on('$locationChangeSuccess', (evt, url) => {
      if (url.indexOf('#/print') !== -1) {
        $timeout(() => window.print(), 1000);
      }
    });

    if ($location.path() === '') {
      $location.path('/summary');
    }
  });
