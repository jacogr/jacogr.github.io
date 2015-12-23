angular
  .module('blockwars')
  .service('Height', function() {
    this.toClass = function(height) {
      return `height-${height}`;
    };
  });
