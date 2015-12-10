angular
  .module('iso')
  .service('World', function(Enemy, FULL) { // eslint-disable-line prefer-arrow-callback
    const HALF = Math.floor(FULL / 2);
    const QUATER = Math.floor(FULL / 4);

    this.world = {};
    this.maps = {};
    this.enemies = [];
    this.player = {
      pos: {},
      move: {}
    };

    this._randomMap = function(offset) {
      const width = _.random(QUATER, Math.floor(HALF - (offset / 2)));
      const height = _.random(QUATER, Math.floor(HALF - (offset / 2)));
      const range = _.range(0, FULL);
      const map = {};

      const x = _.random(HALF - offset, HALF + offset);
      const xmin = x - width;
      const xmax = x + width;
      const xrange = _.range(xmin, xmax + 1);

      const y = _.random(HALF - offset, HALF + offset);
      const ymin = y - height;
      const ymax = y + height;
      const yrange = _.range(ymin, ymax + 1);

      _.each(range, (row) => {
        map[row] = {};
        _.each(range, (col) => map[row][col] = {});
      });

      _.each(xrange, (col) => {
        if ((col < FULL) && (col >= 0) && !_.contains([x - 1, x, x + 1], col)) {
          if ((ymin >= 0) && (ymin < FULL)) {
            map[ymin][col].type = 'cube';
          }
          if ((ymax >= 0) && (ymax < FULL)) {
            map[ymax][col].type = 'cube';
          }
        }
      });

      _.each(yrange, (row) => {
        if ((row < FULL) && (row >= 0) && !_.contains([y - 1, y, y + 1], row)) {
          if ((xmin >= 0) && (xmin < FULL)) {
            map[row][xmin].type = 'cube';
          }
          if ((xmax >= 0) && (xmax < FULL)) {
            map[row][xmax].type = 'cube';
          }
        }
      });

      return map;
    };

    this._generateMap = function() {
      const result = {};
      const range = _.range(0, FULL);
      // const colors = ['white', 'blue', '', '', '', '', '', '', '', '', '', ''];
      const color = undefined; // colors[_.random(colors.length - 1)];

      _.each(range, (row) => {
        result[row] = {};
        _.each(range, (col) => result[row][col] = {});
      });

      _.each([this._randomMap(0), this._randomMap(QUATER)], (map) => {
        _.each(map, (row, ridx) => {
          _.each(row, (cell, cidx) => {
            if (cell.type && !result[ridx][cidx].type) {
              result[ridx][cidx].type = cell.type;
              result[ridx][cidx].color = color;
            }
          });
        });
      });

      if (true || !_.random(5)) {
        const ridx = _.random(FULL - 1);
        const cidx = _.random(FULL - 1);

        if (!result[ridx][cidx].type) {
          result[ridx][cidx].type = 'enemy';
        }
      }

      return result;
    };

    this.get = function(posy, posx) {
      const crow = (posy >= 0) ? Math.ceil(posy / FULL) : Math.floor(posy / FULL);

      _.each([crow - 1, crow, crow + 1], (maprow) => {
        if (!this.maps[maprow]) {
          this.maps[maprow] = {};
        }

        const ccol = (posx >= 0) ? Math.ceil(posx / FULL) : Math.floor(posx / FULL);

        _.each([ccol - 1, ccol, ccol + 1], (mapcol) => {
          if (!this.maps[maprow][mapcol]) {
            this.maps[maprow][mapcol] = this._generateMap();
            let ridx = (maprow * FULL) - HALF;

            _.each(this.maps[maprow][mapcol], (row) => {
              this.world[ridx] = this.world[ridx] || {};
              let cidx = (mapcol * FULL) - HALF;

              _.each(row, (cell) => {
                this.world[ridx][cidx] = cell;
                if (cell.type === 'enemy') {
                  Enemy.add(this, cell, ridx, cidx);
                }
                cidx++;
              });

              ridx++;
            });
          }
        });
      });

      const map = [];
      _.each(_.range(posy - HALF, posy + HALF + 1), (ridx) => {
        _.each(_.range(posx - HALF, posx + HALF + 1), (cidx) => {
          const cell = this.world[ridx][cidx];
          if (!cell.pos) {
            cell.pos = { x: cidx, y: ridx };
          }

          if ((ridx % FULL === 0) && (cidx % FULL === 0) && _.contains(['cube'], cell.type)) {
            cell.type = undefined;
          }

          map.push(cell);
        });
      });

      return map;
    };
  });
