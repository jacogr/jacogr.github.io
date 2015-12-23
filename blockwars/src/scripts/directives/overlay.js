angular
  .module('blockwars')
  .directive('bwOverlay', function() {
    return {
      restrict: 'E',
      controller: 'overlayController',
      scope: {
      },
      replace: true,
      template: `
        <div class="overlay" ng-class="(game.loading || game.data.completed) && 'done'">
          <div ng-if="game.loading" class="box loading">Loading</div>

          <!--div ng-if="!game.loading && !game.data.completed && game.player != player.data.id" class="box loading">Viewing</div-->

          <div ng-if="game.data.player && game.data.completed" class="box loading">Completed</div>

          <div ng-if="game.data.completed">
            <div class="box menu">
              <div class="text">Ready to go? Press the create button and spawn a new game for fun (but not much profit)</div>
              <div class="box button" ng-click="create()">Create</div>
            </div>
          </div>

          <div ng-if="!game.loading && player.data" class="box score player"><span>{{ player.data.score | number:0 }}</span><span ng-if="player.data.lines">/{{ player.data.lines | number:0 }}</span></div>

          <div ng-if="!game.loading && enemy.data" class="box score enemy">{{ enemy.data.score | number:0 }}</div>
        </div>
        `
    };
  })
  .controller('overlayController', function($scope, Game, Player, Enemy) {
    $scope.game = Game;
    $scope.player = Player;
    $scope.enemy = Enemy;

    $scope.create = function() {
      Game.create();
    };
  });
