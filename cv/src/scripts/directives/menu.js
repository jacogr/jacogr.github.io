angular
  .module('cv')
  .directive('menu', function() {
    return {
      restrict: 'E',
      controller: 'menuController',
      scope: {
        data: '=data'
      },
      template: `
        <div class="cv">CV</div>
        <div class="person">
          <p>{{ data.name }}</p>
          <p>{{ data.position }}</p>
        </div>
        <div class="items">
          <a class="item" ng-repeat="item in menu" ng-href="#{{ item.url }}" ng-class="isPath(item.url) && 'selected'">
            {{ item.title }}
          </a>
        </div>`
    };
  })
  .controller('menuController', function($location, $scope) {
    $scope.menu = [
      { url: '/summary', title: 'Summary' },
      { url: '/print', title: 'Print' }
    ];

    $scope.isPath = function(url) {
      return $location.path() === url;
    };
  });
