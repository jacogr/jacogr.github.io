angular
  .module('blockwars')
  .service('User', function($injector, $timeout, $firebaseAuth) {
    this.uid = null;

    this._auth = function() {
      const game = $injector.get('Game');

      $firebaseAuth(game._baseRef())
        .$authAnonymously()
        .then((auth) => {
          console.log('Authenticated', auth);

          this.uid = auth.uid;
          game.load();
        })
        .catch((err) => {
          console.error('Authentication', err);
        });
    };

    $timeout(() => {
      this._auth();
    });
  });
