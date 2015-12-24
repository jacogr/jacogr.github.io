angular
  .module('blockwars')
  .service('Db', function() {
    const fbref = new Firebase('https://cubewars.firebaseio.com/');

    this.base = function() {
      return fbref;
    };

    this.ref = function(parent, path) {
      let ref = this.base();

      if (parent) {
        ref = ref.child(parent);
      }

      if (path && path.length) {
        _.each(path, (child) => {
          ref = ref.child(child);
        });
      }

      return ref;
    };
  });
