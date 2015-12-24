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
        <div class="overlay" ng-class="(game.loading || player.loading || game.data.ended) && 'done'">
          <div ng-if="enemy.data" class="left">
            <div class="box score">
              <div class="small">Enemy</div>
              <div><span>{{ enemy.data.score | number:0 }}</span><span ng-if="enemy.data.lines">/{{ enemy.data.lines | number:0 }}</span></div>
            </div>
            <bw-world class="small" player="enemy"></bw-world>
          </div>

          <div ng-if="player.data" class="right">
            <div class="box score">
              <div class="small">Player</div>
              <div><span>{{ player.data.score | number:0 }}</span><span ng-if="player.data.lines">/{{ player.data.lines | number:0 }}</span></div>
            </div>
            <bw-world class="small" player="player"></bw-world>
          </div>

          <div ng-if="game.loading || player.loading" class="box loading">Loading</div>
          <div ng-if="game.data.player && game.data.ended" class="box loading">Completed</div>

          <div ng-if="game.data.ended" ng-switch on="menu">
            <div ng-switch-when="create" class="box menu">
              <div class="text">Ready to go? Test your strength in a unconstrained round world by dropping blocks & forming lines. You may think you have seen something like this, but never like this.</div>
              <div class="text">Play on your own or go head-to-head.</div>
              <div class="button" ng-click="startSingle()">Single Player Game</div>
              <div class="button" ng-click="selectMulti()">Multi Player Game</div>
            </div>

            <div ng-switch-when="multi-select" class="box menu">
              <div ng-if="!requests.length" class="text">There are currently no available games, why don't you create one and wait for an opponent to accept?</div>
              <div ng-if="requests.length" class="text">Join one of the games where opponents are already waiting or create one.</div>
              <div ng-if="requests.length" class="text">
                <table>
                  <tbody>
                    <tr ng-repeat="req in requests">
                      <td>{{ req.started | date:'medium' }}</td>
                      <td><div class="button" ng-class="acckey && 'disabled'" ng-click="!acckey && joinMulti(req.$id)">{{ acckey == req.$id ? 'Wait' : 'Join' }}</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="button" ng-class="acckey && 'disabled'" ng-click="!acckey && createMulti()">Start Multi Game</div>
              <div class="button" ng-class="acckey && 'disabled'" ng-click="!acckey && back()">Cancel</div>
            </div>

            <div ng-switch-when="multi-wait" class="box menu">
              <div class="text">Waiting for an opponent to accept your challenge and join the game</div>
              <div class="button" ng-click="back()">Cancel</div>
            </div>
          </div>
        </div>
        `
    };
  })
  .controller('overlayController', function($scope, $firebaseArray, $firebaseObject, Db, Enemy, Game, Player, User) {
    $scope.game = Game;
    $scope.player = Player;
    $scope.enemy = Enemy;
    $scope.menu = 'create';

    $scope.requests = $firebaseArray(Db.ref('requests').orderByChild('active').equalTo(true).limitToLast(5));

    $scope.reqkey = null;
    $scope.acckey = null;

    $scope.back = function() {
      $scope.menu = 'create';

      if ($scope.reqkey) {
        Db.ref('requests', [$scope.reqkey]).update({
          active: false,
          cancelled: Firebase.ServerValue.TIMESTAMP
        });
        $scope.reqkey = null;
      }
    };

    const start = function(mine, request) {
      Game.create(mine, request);
      $scope.menu = 'create';
    };

    $scope.startSingle = function() {
      start(true);
    };

    $scope.selectMulti = function() {
      $scope.menu = 'multi-select';
    };

    $scope.createMulti = function() {
      $scope.menu = 'multi-wait';

      $scope.requests
        .$add({
          uid: User.uid,
          gameid: Game.nextId(),
          active: true,
          started: Firebase.ServerValue.TIMESTAMP
        })
        .then((ref) => {
          $scope.reqkey = ref.key();
          console.log('Requesting', $scope.reqkey);

          ref
            .onDisconnect()
            .update({
              active: false,
              cancelled: Firebase.ServerValue.TIMESTAMP
            });

          const request = $firebaseObject(ref);
          let unwatch;
          unwatch = request.$watch(() => {
            if (request.joinuid) {
              console.log('Accepting', $scope.reqkey, request.joinuid);
              $scope.reqkey = null;

              request.acceptuid = request.joinuid;
              request.accepted = Firebase.ServerValue.TIMESTAMP;
              request.active = false;
              request.$save();

              start(true, request);

              unwatch();
            }
          });
        });
    };

    $scope.joinMulti = function(key) {
      console.log('Joining', key);
      $scope.acckey = key;

      const request = $firebaseObject(Db.ref('requests', [key]));
      request.$loaded(() => {
        request.joinuid = User.uid;
        request.joined = Firebase.ServerValue.TIMESTAMP;
        request.$save(request);
      });

      let unwatch;
      unwatch = request.$watch(() => {
        if (!request.active) {
          $scope.acckey = null;

          if (request.acceptuid === User.uid) {
            console.log('Joined', key);

            start(false, request);
          }
          unwatch();
        }
      });
    };
  });
