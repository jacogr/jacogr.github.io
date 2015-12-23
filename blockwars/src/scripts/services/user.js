angular
  .module('blockwars')
  .service('User', function($cookies, $injector, $timeout, $firebaseAuth) {
    const USER_COOKIE = 'fbuid';

    this.uid = null;

    this._auth = function() {
      const game = $injector.get('Game');
      const uid = $cookies.get(USER_COOKIE);

      if (uid) {
        console.log('Cookie retrieved', uid);

        this.uid = uid;
        game.load();

        return;
      }

      $firebaseAuth(game._baseRef())
        .$authAnonymously()
        .then((auth) => {
          console.log('Authenticated', auth);

          this.uid = auth.uid;
          $cookies.put(USER_COOKIE, this.uid);
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
