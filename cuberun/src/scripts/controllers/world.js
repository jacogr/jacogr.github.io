angular
  .module('iso')
  .controller('worldController', function($scope, $window, $timeout, $interval, $routeParams, Player, World, FULL) { // eslint-disable-line prefer-arrow-callback
    const HALF = Math.floor(FULL / 2);
    const CENTER = (FULL * HALF) + HALF;

    this.world = World.get(Player.getY(), Player.getX());
    this.grid = _.range(0, FULL * FULL);
    this.blocks = 0;
    this.time = 0;
    this.start = Date.now();

    this.restart = function() {
      $window.location.reload();
    };

    this.isDead = function() {
      return Player.isDead();
    };

    this.hasVisited = function(idx) {
      return this.world[idx].visited;
    };

    this.isBlocked = function(dy, dx) {
      const cell = this.world[CENTER + dx + (dy * FULL)];
      return Player.isDead() || _.contains(['cube'], cell.type);
    };

    this.move = function(dy, dx) {
      if (this.isBlocked(dy, dx)) {
        return;
      }

      this.world[CENTER].type = 'visited-player';
      Player.incPos(dy, dx);

      this.world = World.get(Player.getY(), Player.getX());
      if (_.contains(['enemy', 'visited-enemy'], this.world[CENTER].type)) {
        Player.kill();
      }

      if (!Player.isDead()) {
        this.world[CENTER].type = 'visited-player';
        this.blocks++;
      }
    };

    this.getOpacity = function(idx) {
      const row = Math.floor(idx / FULL);
      const col = (idx - row * FULL) % FULL;
      const dist = Math.sqrt(Math.pow(1 + HALF - row, 2) + Math.pow(1 + HALF - col, 2));

      return Math.max(0, 1.0 - (dist / (FULL + HALF)));
    };

    this.getClass = function(idx) {
      if (CENTER === idx) {
        return `player`;
      }

      return this.world[idx].type;
    };

    const keyHandler = (evt) => {
      let x = 0;
      let y = 0;

      switch (evt.keyCode) {
        case 37: x--; break;
        case 38: y--; break;
        case 39: x++; break;
        case 40: y++; break;
        default: break;
      }

      if (x || y) {
        $timeout(() => this.move(y, x));
      }
    };

    const $doc = angular.element(document);
    $doc.on('keydown', keyHandler);
    $scope.$on('$destroy', () => {
      $doc.off('keydown', keyHandler);
    });

    $interval(() => {
      if (!Player.isDead()) {
        this.time = (1 + Date.now() - this.start) / 1000;
      }
    }, 1000);
  });
