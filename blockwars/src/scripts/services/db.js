angular
  .module('blockwars')
  .service('Db', function() {
    const fbref = new Firebase('https://cubewars.firebaseio.com/'); // eslint-disable-line

    this.base = function() {
      return fbref;
    };

    this.ref = function(path) {
      let ref = this.base();

      _.each(path, (child) => {
        ref = ref.child(child);
      });

      return ref;
    };
  });
