angular
  .module('cv')
  .directive('cv', function() {
    return {
      restrict: 'E',
      controller: 'cvController',
      replace: true,
      template: `
        <div class="content" ng-class="isPrint() && 'print'">
          <markdown class="introduction" data="data.summary"></markdown>
          <div class="positions">
            <position ng-repeat="position in data.positions" data="position"></position>
          </div>
        </div>`
    };
  })
  .controller('cvController', function($location, $scope, CVData) {
    $scope.data = CVData;

    $scope.isPrint = function() {
      return $location.path() === '/print';
    };
  });
