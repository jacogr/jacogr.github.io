angular
  .module('blockwars')
  .service('Player', function($interval, $timeout, BLOCK_START, INTERVAL, SIZE_HEIGHT, SIZE_WIDTH, Blocks, Game) {
    const SCORE = {
      BLOCK: 1,
      LINE: 100
    };

    this.interval = INTERVAL;
    this.blocks = [];

    this._newBlock = function() {
      this._fixBlocks();

      if (this.block && this.block.y === SIZE_HEIGHT - 1) {
        Game.end();
        return;
      }

      this.blocks.splice(0, 1);
      while (this.blocks.length < 5) {
        this.blocks.push(Blocks.get());
      }

      const posx = (_.get(this.block, 'x', BLOCK_START) + SIZE_WIDTH) % SIZE_WIDTH;

      this.block = this.blocks[0];
      this.block.x = posx;
      this.block.y = SIZE_HEIGHT - 1;

      this._addBlock();
    };

    this.init = function() {
      this.loading = true;
      this.interval = INTERVAL;

      this.blocks.splice(0, this.blocks.length);

      this.data = Game.getPlayer();
      this.data
        .$loaded()
        .then(() => {
          this.loading = false;
          this.block = undefined;
          this.data.score = this.data.score || 0;
          this.data.lines = this.data.lines || 0;
        });
    };

    this._addBlock = function() {
      _.each(this.block.cells[this.block.rotation], (row, y) => {
        _.each(row, (cell, x) => {
          if (cell) {
            const posy = this.block.y - y;
            const posx = (this.block.x + x + SIZE_WIDTH) % SIZE_WIDTH;

            this.data[posy] = this.data[posy] || {};
            this.data[posy][posx] = this.block.color;
          }
        });
      });
    };

    this._removeBlock = function() {
      _.each(this.block.cells[this.block.rotation], (row, y) => {
        _.each(row, (cell, x) => {
          if (cell) {
            const posy = this.block.y - y;
            const posx = (this.block.x + x + SIZE_WIDTH) % SIZE_WIDTH;

            this.data[posy] = this.data[posy] || {};
            this.data[posy][posx] = null;
          }
        });
      });
    };

    this._meltBlocks = function() {
      this._removeBlock();

      let y = 0;
      let melt = 0;

      while (y < SIZE_HEIGHT) {
        if (_.get(this.data[y], 'removed')) {
          _.each(_.range(y, SIZE_HEIGHT - 1), (ny) => {
            this.data[ny] = this.data[ny + 1] || null;
          });

          this.interval -= 2;
          this.data.lines++;
          this.data.score += ++melt * SCORE.LINE;
          this.data[SIZE_HEIGHT - 1] = null;
        } else {
          y++;
        }
      }

      this._addBlock();
    };

    this._fixBlocks = function() {
      _.each(_.range(SIZE_HEIGHT), (y) => {
        let count = 0;

        if (this.data[y]) {
          _.each(_.range(SIZE_WIDTH), (x) => {
            if (this.data[y][x] === 'gray') {
              count++;
            } else if (this.data[y][x]) {
              this.data[y][x] = 'gray';
              count++;
            }
          });

          if (count === SIZE_WIDTH) {
            this.data[y].removed = true;
          }
        }
      });
    };

    this._canMove = function(dy, dx) {
      this._removeBlock();

      let movable = true;

      _.each(this.block.cells[this.block.rotation], (row, y) => {
        _.each(row, (cell, x) => {
          if (movable && cell) {
            const posy = this.block.y + dy - y;
            const posx = (this.block.x + dx + x + SIZE_WIDTH) % SIZE_WIDTH;

            if (posy < 0 || (this.data[posy] && this.data[posy][posx])) {
              movable = false;
            }
          }
        });
      });

      this._addBlock();

      return movable;
    };

    this._moveHoriz = function(dx) {
      if (this._canMove(0, dx)) {
        this._removeBlock();
        this.block.x = (this.block.x + dx + SIZE_WIDTH) % SIZE_WIDTH;
        this._addBlock();

        return true;
      }

      return false;
    };

    this._moveLeft = function() {
      return this._moveHoriz(-1);
    };

    this._moveRight = function() {
      return this._moveHoriz(1);
    };

    this._moveDown = function() {
      if (this._canMove(-1, 0)) {
        this._removeBlock();
        this.block.y -= 1;
        this._addBlock();

        return true;
      }

      this.data.score += SCORE.BLOCK;
      this._newBlock();

      return false;
    };

    this._dropDown = function() {
      let drop = 0;
      while (this._moveDown()) {
        drop++;
      }

      this.data.score += drop * SCORE.BLOCK;
    };

    this._canRotate = function(rot) {
      this._removeBlock();

      let rotatable = true;

      _.each(this.block.cells[rot], (row, y) => {
        _.each(row, (cell, x) => {
          if (rotatable && cell) {
            const posy = this.block.y - y;
            const posx = (this.block.x + x + SIZE_WIDTH) % SIZE_WIDTH;

            if (posy < 0 || (this.data[posy] && this.data[posy][posx])) {
              rotatable = false;
            }
          }
        });
      });

      this._addBlock();

      return rotatable;
    };

    this._rotate = function(dr) {
      let rotation = this.block.rotation + dr;

      if (rotation < 0) {
        rotation = this.block.cells.length - 1;
      } else if (rotation === this.block.cells.length) {
        rotation = 0;
      }

      if (this._canRotate(rotation)) {
        this._removeBlock();
        this.block.rotation = rotation;
        this._addBlock();

        return true;
      }

      return false;
    };

    this._rotateLeft = function() {
      return this._rotate(1);
    };

    this._rotateRight = function() {
      return this._rotate(-1);
    };

    this.isRunning = function() {
      return this.data && Game.data && Game.data.started && !Game.data.ended;// && Game.player === this.data.id;
    };

    this.save = function() {
      this.data.$save();
    };

    this.tick = function() {
      if (this.isRunning()) {
        if (!this.block) {
          this._newBlock();
        } else {
          this._meltBlocks();
          this._moveDown();
        }

        this.save();
      }

      $timeout(() => {
        this.tick();
      }, this.interval);
    };

    this.tick();

    const keyHandler = (evt) => {
      let action;

      switch (evt.keyCode) {
        case 32: action = '_dropDown'; break;
        case 37: action = '_moveLeft'; break;
        case 38: action = '_rotateLeft'; break;
        case 39: action = '_moveRight'; break;
        case 40: action = '_rotateRight'; break;
        default: break;
      }

      if (action && this.isRunning()) {
        $timeout(() => {
          this[action]();
        });
      }
    };

    const $doc = angular.element(document);
    $doc.on('keydown', keyHandler);
  });
