angular
  .module('iso')
  .service('Player', function() { // eslint-disable-line prefer-arrow-callback
    this.x = 0;
    this.y = 0;
    this.dead = false;

    this.isDead = function() {
      return this.dead;
    };

    this.incPos = function(dy, dx) {
      this.x += dx;
      this.y += dy;
    };

    this.getX = function() {
      return this.x;
    };

    this.getY = function() {
      return this.y;
    };

    this.kill = function() {
      this.dead = true;
    };
  });
