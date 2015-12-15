angular
  .module('cuberoom')
  .controller('worldController', function($scope, $timeout, SIZE_DISPLAY, Player, Rooms) {
    this.pos = { room: {} };

    this.room = null;
    this.cell = {};

    this.translate = function(y, x) {
      return {
        room: {
          y: Math.floor(y / SIZE_DISPLAY),
          x: Math.floor(x / SIZE_DISPLAY)
        },
        pos: {
          y: ((y % SIZE_DISPLAY) + SIZE_DISPLAY) % SIZE_DISPLAY,
          x: ((x % SIZE_DISPLAY) + SIZE_DISPLAY) % SIZE_DISPLAY
        }
      };
    };

    this.isBlocked = function(dy, dx) {
      if (!this.room) {
        return false;
      }

      const player = Player.getPos();
      const txpos = this.translate(player.y + dy, player.x + dx);

      if (txpos.room.x !== this.pos.room.x || txpos.room.y !== this.pos.room.y) {
        return this.cell.display.zero !== 'entrance';
      }

      return this.room.cells[txpos.pos.y][txpos.pos.x].blocked;
    };

    this.move = function(dy, dx) {
      if (this.isBlocked(dy, dx)) {
        return;
      }

      this.cell.player = false;

      const player = Player.incPos(dy, dx);
      const txpos = this.translate(player.y, player.x);

      if (txpos.room.x !== this.pos.room.x || txpos.room.y !== this.pos.room.y) {
        this.room = Rooms.get(txpos.room.y, txpos.room.x);
      }

      this.cell = this.room.cells[txpos.pos.y][txpos.pos.x];
      this.cell.player = true;
      this.pos = txpos;
    };

    this.move(0, 0);

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
  });
