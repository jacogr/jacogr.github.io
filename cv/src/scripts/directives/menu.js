angular
  .module('cv')
  .directive('menu', function() {
    return {
      restrict: 'E',
      controller: 'menuController',
      replace: true,
      template: `
        <div class="menu">
          <div class="cv">CV</div>
          <div class="person">
            <p>{{ data.name }}</p>
            <p>{{ data.position }}</p>
          </div>
          <div class="items">
            <a class="item" ng-repeat="item in menu" ng-href="#{{ item.url }}" ng-class="isPath(item.url) && 'selected'">
              {{ item.title }}
            </a>
          </div>
        </div>`
    };
  })
  .controller('menuController', function($location, $scope, CVData) {
    $scope.menu = [
      { url: '/summary', title: 'Summary' },
      { url: '/print', title: 'Print' }
    ];

    $scope.data = CVData;

    $scope.isPath = function(url) {
      return $location.path() === url;
    };
  });
