angular
  .module('blockwars')
  .service('User', function($cookies, $injector, $timeout, $firebaseAuth, Db) {
    const USER_COOKIE = 'fbuid';

    this.uid = null;

    this._start = function(uid) {
      const date = new Date();
      const expire = new Date(date.getUTCFullYear() + 1, date.getUTCMonth(), date.getUTCDate());
      const session = Db.ref('sessions').push();

      this.uid = uid;
      $cookies.put(USER_COOKIE, this.uid, { expires: expire });

      session
        .onDisconnect()
        .update({
          ended: Firebase.ServerValue.TIMESTAMP // eslint-disable-line
        });

      session.update({
        uid: uid,
        started: Firebase.ServerValue.TIMESTAMP // eslint-disable-line
      });
    };

    this._auth = function() {
      const uid = $cookies.get(USER_COOKIE);

      if (uid) {
        console.log('Cookie retrieved', uid);

        this._start(uid);
        return;
      }

      $firebaseAuth(Db.base())
        .$authAnonymously()
        .then((auth) => {
          console.log('Authenticated', auth);

          this._start(auth.uid);
        })
        .catch((err) => {
          console.error('Authentication', err);
        });
    };

    $timeout(() => {
      this._auth();
    });
  });
