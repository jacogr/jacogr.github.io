angular
  .module('blockwars')
  .directive('bwNext', function() {
    return {
      restrict: 'E',
      controller: 'nextController',
      scope: {
      },
      replace: true,
      template: `
        <div class="next">
          <div class="block" ng-repeat="block in blocks">
            <div class="row" ng-repeat="row in block.cells[0] track by $index">
              <div class="col" ng-repeat="col in row track by $index">
                <div class="cell" ng-class="col ? block.color : 'empty'"></div>
              </div>
            </div>
          </div>
        </div>
        `
    };
  })
  .controller('nextController', function($scope, BLOCK_START, SIZE_HEIGHT, SIZE_WIDTH, Player) {
    $scope.blocks = Player.blocks;
  });
