angular
  .module('cv')
  .directive('position', function() {
    return {
      restrict: 'E',
      controller: 'positionController',
      scope: {
        data: '=data'
      },
      replace: true,
      template: `
        <div class="position" ng-class="isHidden() && 'hide'" ng-click="show()">
          <div class="summary">
            <div class="action fa" ng-class="isExtended() ? 'fa-level-up' : 'fa-level-down'"></div>
            <div class="title">{{ data.position }}</div>
            <div class="company">{{ data.company }}</div>
            <div class="sub">
              <div class="location">{{ data.location }}</div>
              <div class="fromto">{{ getDate() }}</div>
            </div>
            <div class="year">'{{ getShortYear() }}</div>
          </div>
          <div class="expanded" ng-class="isExtended() && 'show'">
            <div class="section" markdown="data.description"></div>
          </div>
        </div>`
    };
  })
  .controller('positionController', function($scope, $location) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const viewPath = `/view/${$scope.data.id}`;
    const summaryPath = '/summary';

    $scope.show = function() {
      const path = $location.path();

      if (path === viewPath) {
        $location.path(summaryPath);
      } else if (path === summaryPath) {
        $location.path(viewPath);
      }
    };

    $scope.isExtended = function() {
      return _.contains(['/print', viewPath], $location.path());
    };

    $scope.isHidden = function() {
      const path = $location.path();
      return path.indexOf('/view') === 0 && path !== viewPath;
    };

    $scope.getDate = function() {
      const start = `${months[$scope.data.start.month - 1]} ${$scope.data.start.year}`;
      const end = $scope.data.end ? `${months[$scope.data.end.month - 1]} ${$scope.data.end.year}` : 'Current';

      return `${start} - ${end}`;
    };

    $scope.getShortYear = function() {
      return `${($scope.data.end ? $scope.data.end.year : new Date().getFullYear())}`.slice(-2);
    };
  });
