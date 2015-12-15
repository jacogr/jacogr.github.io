angular
  .module('cuberoom')
  .service('Player', function(SIZE_DISPLAY) {
    const HALF = Math.floor(SIZE_DISPLAY / 2);

    this.pos = { y: HALF, x: HALF };
    this.dead = false;

    this.isDead = function() {
      return this.dead;
    };

    this.incPos = function(dy, dx) {
      this.pos.x += dx;
      this.pos.y += dy;

      return this.pos;
    };

    this.getPos = function() {
      return this.pos;
    };

    this.kill = function() {
      this.dead = true;
    };
  });
