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
        <div class="overlay" ng-class="(game.loading || game.data.ended) && 'done'">
          <div ng-if="game.loading" class="box loading">Loading</div>

          <div ng-if="game.data.player && game.data.ended" class="box loading">Completed</div>

          <div ng-if="game.data.ended" ng-switch on="menu">
            <div ng-switch-when="create" class="box menu">
              <div class="text">Ready to go? Test your strength in a unconstrained round world by dropping blocks & forming lines. You may think you have seen something like this, but never like this.</div>
              <div class="text">Play on your own or go head-to-head.</div>
              <div class="box button" ng-click="startSingle()">Single Player Game</div>
              <div class="box button disabled" ng-click="selectMulti()">Multi Player Game</div>
            </div>

            <div ng-switch-when="multi-select" class="box menu">
              <div ng-if="!requests.length" class="text">There are currently no available games, why don't you create one and wait for an opponent to accept?</div>
              <div ng-if="!requests.length" class="box button" ng-click="createMulti()">Start Multi Game</div>
              <div class="box button" ng-click="back()">Cancel</div>
            </div>

            <div ng-switch-when="multi-wait" class="box menu">
              <div class="text">Waiting for an opponent to accept your challenge and join the game</div>
              <div class="box button" ng-click="back()">Cancel</div>
            </div>
          </div>

          <div ng-if="!game.loading && player.data" class="box score player"><span>{{ player.data.score | number:0 }}</span><span ng-if="player.data.lines">/{{ player.data.lines | number:0 }}</span></div>

          <div ng-if="!game.loading && enemy.data" class="box score enemy"><span>{{ enemy.data.score | number:0 }}</span><span ng-if="enemy.data.lines">/{{ enemy.data.lines | number:0 }}</span></div>
        </div>
        `
    };
  })
  .controller('overlayController', function($scope, $firebaseArray, Db, Enemy, Game, Player) {
    $scope.game = Game;
    $scope.player = Player;
    $scope.enemy = Enemy;
    $scope.menu = 'create';

    $scope.requests = $firebaseArray(Db.ref('requests'));

    $scope.back = function() {
      $scope.menu = 'create';
    };

    $scope.startSingle = function() {
      Game.create();
      $scope.back();
    };

    $scope.selectMulti = function() {
      $scope.menu = 'multi-select';
    };

    $scope.createMulti = function() {
      $scope.menu = 'multi-wait';
    };

    $scope.startMulti = function(id) {

    };
  });
