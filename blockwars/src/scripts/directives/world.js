angular
  .module('blockwars')
  .directive('bwWorld', function() {
    return {
      restrict: 'E',
      controller: 'worldController',
      scope: {
      },
      replace: true,
      template: `
        <div class="world">
          <div class="row" ng-repeat="row in ::rows">
            <div class="col" ng-repeat="p in ::row">
              <div ng-if="!player.data[p.y][pos(p.x)]" class="cell"></div>
              <div ng-if="player.data[p.y][pos(p.x)]" class="cell"
                ng-class="[player.data[p.y][pos(p.x)], player.data[p.y].removed ? 'removed' : '']"></div>
            </div>
          </div>
        </div>
        `
    };
  })
  .controller('worldController', function($scope, BLOCK_START, SIZE_HEIGHT, SIZE_WIDTH, Player, Enemy) {
    $scope.rows = [];
    $scope.player = Player;
    $scope.enemy = Enemy;

    $scope.pos = function(x) {
      const offset = Math.floor((4 - $scope.player.block.cells[$scope.player.block.rotation][0].length) / 2);

      return (x + $scope.player.block.x - offset + SIZE_WIDTH - BLOCK_START) % SIZE_WIDTH;
    };

    _.each(_.range(SIZE_HEIGHT), (y) => {
      const row = [];
      $scope.rows.push(row);

      _.each(_.range(SIZE_WIDTH), (x) => {
        row.push({ y: SIZE_HEIGHT - 1 - y, x: x });
      });
    });
  });
