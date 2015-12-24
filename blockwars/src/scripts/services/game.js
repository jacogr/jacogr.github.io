angular
  .module('blockwars')
  .service('Game', function($injector, $location, $timeout, $firebaseObject, Db, User) {
    const _alpha = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    const rand = function(num) {
      let str = '';
      _.times(num, () => {
        str = `${str}${_alpha[_.random(_alpha.length - 1)]}`;
      });
      return str;
    };

    const alpha = function(_num) {
      let num = _num;
      let str = '';

      while (num > 0) {
        const chr = num % _alpha.length;
        str = `${_alpha[chr]}${str}`;
        num = (num - chr) / _alpha.length;
      }

      return str;
    };

    this.data = { ended: true };
    this.loading = false;

    this._gameRef = function() {
      return Db.ref('games', this.path);
    };

    this.getEnemy = function() {
      if (this.single) {
        return null;
      }

      return $firebaseObject(this._gameRef().child(this.mine ? 'enemy' : 'player'));
    };

    this.getPlayer = function() {
      return $firebaseObject(this._gameRef().child(this.mine ? 'player' : 'enemy'));
    };

    this.save = function(force) {
      if (this.mine || force) {
        this.data.$save();
      }
    };

    this.end = function() {
      this.data.ended = Firebase.ServerValue.TIMESTAMP; // eslint-disable-line
      this.save(true);

      const score = Db.ref('scores').push();
      const player = $injector.get('Player');

      score.update({
        uid: User.uid,
        score: player.data.score,
        lines: player.data.lines,
        started: this.data.started,
        ended: Firebase.ServerValue.TIMESTAMP // eslint-disable-line
      });
    };

    this.nextId = function() {
      const date = new Date();
      return [
        `${alpha(date.getUTCFullYear())}${alpha(date.getUTCMonth() + 1)}${alpha(date.getUTCDate())}`,
        alpha(date.getTime()),
        rand(10)
      ];
    };

    this.create = function(mine, request) {
      this.loading = true;
      this.single = !request;
      this.mine = this.single || mine;
      this.path = request ? request.gameid : this.nextId();

      this.data = $firebaseObject(this._gameRef());
      this.data.$loaded(() => {
        this.loading = false;

        if (mine) {
          this.data.started = Firebase.ServerValue.TIMESTAMP; // eslint-disable-line
          this.data.ended = 0;
          this.data.player = { uid: request ? request.uid : User.uid, score: 0, lines: 0 };
          this.data.enemy = { uid: request ? request.acceptuid : null, score: 0, lines: 0 };
          this.save();
        }

        $timeout(() => {
          $injector.get('Player').init();
          $injector.get('Enemy').init();
        });
      });
    };
  });
