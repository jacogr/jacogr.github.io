angular
  .module('blockwars')
  .directive('bwGame', function() {
    return {
      restrict: 'E',
      controller: 'gameController',
      scope: {
      },
      replace: true,
      template: `
        <div class="game">
          <bw-world player="player" rotate="true"></bw-world>
          <bw-overlay></bw-overlay>
        </div>
        `
    };
  })
  .controller('gameController', function($scope, Enemy, Player) {
    $scope.enemy = Enemy;
    $scope.player = Player;
  });
