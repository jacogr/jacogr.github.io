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
              <div class="text">Ready to go? Test your strength in a unconstrained round world by dropping blocks & forming lines. You may think you have seen something like this, but never like this.</div>
              <div class="text">Play on your own or go head-to-head.</div>
              <div class="box button" ng-click="createSingle()">Single Player Game</div>
              <div class="box button disabled" ng-click="createMulti()">Multi Player Game</div>
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

    $scope.createSingle = function() {
      Game.create();
    };

    $scope.createMulti = function() {

    };
  });
