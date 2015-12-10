angular
  .module('iso')
  .service('Enemy', function($interval, Player, FULL) { // eslint-disable-line prefer-arrow-callback
    const MAXDIST = FULL * 3;

    this.enemies = [];
    this.world = undefined;

    this.add = function(world, cell, y, x) {
      this.world = world.world;

      this.enemies.push({
        pos: { x: x, y: y },
        move: { x: 0, y: 0 },
        cell: cell
      });
    };

    this._isEmpty = function(enemy, dy, dx) {
      const posy = enemy.pos.y + dy;
      const posx = enemy.pos.x + dx;

      if (_.isUndefined(this.world[posy]) || _.isUndefined(this.world[posy][posx])) {
        return false;
      }

      const cell = this.world[posy][posx];
      return _.isUndefined(cell.type) || _.contains(['enemy', 'visited-enemy', 'visited-player'], cell.type);
    };

    this._canMove = function(enemy, dy, dx) {
      if ((dx && enemy.move.x && dx !== enemy.move.x) || (dy && enemy.move.y && dy !== enemy.move.y)) {
        return false;
      }

      return this._isEmpty(enemy, dy, dx);
    };

    this._kill = function(enemy) {
      if (Player.getY() === enemy.pos.y && Player.getX() === enemy.pos.x) {
        Player.kill();
      }
    };

    this._move = function(enemy, dy, dx) {
      enemy.pos.x += dx;
      enemy.pos.y += dy;
      enemy.move.x = dx;
      enemy.move.y = dy;

      this._kill(enemy);

      enemy.cell.type = 'visited-enemy';
      enemy.cell = this.world[enemy.pos.y][enemy.pos.x];
      enemy.cell.type = 'enemy';
    };

    this._hasClearCol = function(enemy) {
      const inc = (enemy.pos.x < Player.getX()) ? 1 : -1;
      let clear = true;
      let delta = 0;

      while (clear && (enemy.pos.x + delta) !== Player.getX()) {
        delta += inc;
        clear = this._isEmpty(enemy, 0, delta);
      }

      return clear;
    };

    this._hasClearRow = function(enemy) {
      const inc = (enemy.pos.y < Player.getY()) ? 1 : -1;
      let clear = true;
      let delta = 0;

      while (clear && (enemy.pos.y + delta) !== Player.getY()) {
        delta += inc;
        clear = this._isEmpty(enemy, delta, 0);
      }

      return clear;
    };

    this._moveAll = function() {
      if (!this.enemies.length) {
        return;
      }

      _.each(this.enemies, (enemy) => {
        this._kill(enemy);

        const dx = Math.abs(enemy.pos.x - Player.getX());
        const dy = Math.abs(enemy.pos.y - Player.getY());
        const incy = (enemy.pos.y < Player.getY()) ? 1 : -1;
        const incx = (enemy.pos.x < Player.getX()) ? 1 : -1;

        if ((dx < MAXDIST) && (dy < MAXDIST)) {
          if (!dx && this._hasClearRow(enemy)) {
            return this._move(enemy, incy, 0);
          } else if (!dy && this._hasClearCol(enemy)) {
            return this._move(enemy, 0, incx);
          } else if (dx && this._canMove(enemy, 0, incx)) {
            return this._move(enemy, 0, incx);
          } else if (dy && this._canMove(enemy, incy, 0)) {
            return this._move(enemy, incy, 0);
          }
        }

        if (this._canMove(enemy, enemy.move.y, enemy.move.x)) {
          return this._move(enemy, enemy.move.y, enemy.move.x);
        }

        const randx = [1, -1][_.random()];
        const randy = [1, -1][_.random()];

        if (!enemy.move.y && this._canMove(enemy, randy, 0)) {
          this._move(enemy, randy, 0);
        } else if (!enemy.move.x && this._canMove(enemy, 0, randx)) {
          this._move(enemy, 0, randx);
        } else if (this._isEmpty(enemy, randy, 0)) {
          this._move(enemy, randy, 0);
        } else if (this._isEmpty(enemy, 0, randx)) {
          this._move(enemy, 0, randx);
        }
      });
    };

    $interval(() => {
      if (!Player.isDead()) {
        this._moveAll();
      }
    }, 750);
  });
