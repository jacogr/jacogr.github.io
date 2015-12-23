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

    this.loading = true;

    this._gameRef = function() {
      return Db.ref(this.path).child('game');
    };

    this.getEnemy = function() {
      const singleOrPlayer = _.contains([User.uid, this.data.player.id], this.data.enemy.id);
      return $firebaseObject(this._gameRef().child(singleOrPlayer ? 'player' : 'enemy'));
    };

    this.getPlayer = function() {
      const singleOrPlayer = _.contains([User.uid, this.data.enemy.id], this.data.player.id);
      return $firebaseObject(this._gameRef().child(singleOrPlayer ? 'player' : 'enemy'));
    };

    this.save = function() {
      // this.data.$save();
    };

    this.end = function() {
      this.data.completed = new Date().getTime();
      this.save();
    };

    this.load = function() {
      // const path = $location.path().split('/');

      // if (path.length && path[1] === 'game') {
      //   this.date = new Date();
      //   this.path = path[2].split('-');
      //
      //   this.data = $firebaseObject(this._gameRef());
      //   this.data
      //     .$loaded()
      //     .then(() => {
      //       this.loading = false;
      //       console.log('Game loaded', path[2], this.data);
      //
      //       $injector.get('Player').init();
      //       $injector.get('Enemy').init();
      //     })
      //     .catch((err) => {
      //       console.error('Game load', err);
      //     });
      // } else {
      this.loading = false;
      this.data = { completed: true };
      // }
    };

    this.create = function() {
      this.date = new Date();
      this.loading = false;

      this.path = [
        `${alpha(this.date.getUTCFullYear())}${alpha(this.date.getUTCMonth() + 1)}${alpha(this.date.getUTCDate())}`,
        alpha(this.date.getTime()),
        rand(10)
      ];

      this.data = {}; // $firebaseObject(this._gameRef());
      this.data.date = this.date.getTime();
      this.data.started = this.date.getTime();
      this.data.completed = 0;
      this.data.player = { id: User.uid, score: 0, lines: 0 };
      this.data.enemy = { id: User.uid, score: 0, lines: 0 };
      this.save();

      $location.path(`/game/${this.path.join('-')}`);

      $timeout(() => {
        $injector.get('Player').init();
        $injector.get('Enemy').init();
      });
    };
  });
