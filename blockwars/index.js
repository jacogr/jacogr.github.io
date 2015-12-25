'use strict';angular.
module('blockwars', ['ngCookies', 'firebase']).
constant('SIZE_WIDTH', 11).
constant('SIZE_HEIGHT', 18).
constant('BLOCK_START', 4).
constant('INTERVAL', 750).
config(["$locationProvider", function ($locationProvider) {
  $locationProvider.html5Mode(false);}]);
'use strict';angular.
module('blockwars').
directive('bwGame', function () {
  return { 
    restrict: 'E', 
    controller: 'gameController', 
    scope: {}, 

    replace: true, 
    template: '\n        <div class="game">\n          <bw-world player="player" rotate="true"></bw-world>\n          <bw-overlay></bw-overlay>\n        </div>\n        ' };}).







controller('gameController', ["$scope", "Enemy", "Player", function ($scope, Enemy, Player) {
  $scope.enemy = Enemy;
  $scope.player = Player;}]);
'use strict';angular.
module('blockwars').
directive('bwNext', function () {
  return { 
    restrict: 'E', 
    controller: 'nextController', 
    scope: {}, 

    replace: true, 
    template: '\n        <div class="next">\n          <div class="block" ng-repeat="block in blocks">\n            <div class="row" ng-repeat="row in block.cells[0] track by $index">\n              <div class="col" ng-repeat="col in row track by $index">\n                <div class="cell" ng-class="col ? block.color : \'empty\'"></div>\n              </div>\n            </div>\n          </div>\n        </div>\n        ' };}).












controller('nextController', ["$scope", "BLOCK_START", "SIZE_HEIGHT", "SIZE_WIDTH", "Player", function ($scope, BLOCK_START, SIZE_HEIGHT, SIZE_WIDTH, Player) {
  $scope.blocks = Player.blocks;}]);
'use strict';angular.
module('blockwars').
directive('bwOverlay', function () {
  return { 
    restrict: 'E', 
    controller: 'overlayController', 
    scope: {}, 

    replace: true, 
    template: '\n        <div class="overlay" ng-class="(game.loading || player.loading || game.data.ended) && \'done\'">\n          <div ng-if="enemy.data" class="left">\n            <div class="box score">\n              <div class="small">Enemy</div>\n              <div><span>{{ enemy.data.score | number:0 }}</span><span ng-if="enemy.data.lines">/{{ enemy.data.lines | number:0 }}</span></div>\n            </div>\n            <bw-world class="small" player="enemy"></bw-world>\n          </div>\n\n          <div ng-if="player.data" class="right">\n            <div class="box score">\n              <div class="small">Player</div>\n              <div><span>{{ player.data.score | number:0 }}</span><span ng-if="player.data.lines">/{{ player.data.lines | number:0 }}</span></div>\n            </div>\n            <bw-next></bw-next>\n          </div>\n\n          <div ng-if="game.loading || player.loading" class="box loading">Loading</div>\n          <div ng-if="game.data.player && game.data.ended" class="box loading">Completed</div>\n\n          <div ng-if="game.data.ended" ng-switch on="menu">\n            <div ng-switch-when="create" class="box menu">\n              <div class="text">Ready to go? Test your strength in a unconstrained round world by dropping blocks & forming lines. You may think you have seen something like this, but never like this.</div>\n              <div class="text">Play on your own or go head-to-head.</div>\n              <div class="button" ng-click="startSingle()">Single Player Game</div>\n              <div class="button" ng-click="selectMulti()">Multi Player Game</div>\n            </div>\n\n            <div ng-switch-when="multi-select" class="box menu">\n              <div ng-if="!requests.length" class="text">There are currently no available games, why don\'t you create one and wait for an opponent to accept?</div>\n              <div ng-if="requests.length" class="text">Join one of the games where opponents are already waiting or create one.</div>\n              <div ng-if="requests.length" class="text">\n                <table>\n                  <tbody>\n                    <tr ng-repeat="req in requests">\n                      <td>{{ req.started | date:\'medium\' }}</td>\n                      <td><div class="button" ng-class="acckey && \'disabled\'" ng-click="!acckey && joinMulti(req.$id)">{{ acckey == req.$id ? \'Wait\' : \'Join\' }}</div></td>\n                    </tr>\n                  </tbody>\n                </table>\n              </div>\n              <div class="button" ng-class="acckey && \'disabled\'" ng-click="!acckey && createMulti()">Start Multi Game</div>\n              <div class="button" ng-class="acckey && \'disabled\'" ng-click="!acckey && back()">Cancel</div>\n            </div>\n\n            <div ng-switch-when="multi-wait" class="box menu">\n              <div class="text">Waiting for an opponent to accept your challenge and join the game</div>\n              <div class="button" ng-click="back()">Cancel</div>\n            </div>\n          </div>\n        </div>\n        ' };}).






















































controller('overlayController', ["$scope", "$firebaseArray", "$firebaseObject", "Db", "Enemy", "Game", "Player", "User", function ($scope, $firebaseArray, $firebaseObject, Db, Enemy, Game, Player, User) {
  $scope.game = Game;
  $scope.player = Player;
  $scope.enemy = Enemy;
  $scope.menu = 'create';

  $scope.requests = $firebaseArray(Db.ref('requests').orderByChild('active').equalTo(true).limitToLast(5));

  $scope.reqkey = null;
  $scope.acckey = null;

  $scope.back = function () {
    $scope.menu = 'create';

    if ($scope.reqkey) {
      Db.ref('requests', [$scope.reqkey]).update({ 
        active: false, 
        cancelled: Firebase.ServerValue.TIMESTAMP });

      $scope.reqkey = null;}};



  var start = function start(mine, request) {
    Game.create(mine, request);
    $scope.menu = 'create';};


  $scope.startSingle = function () {
    start(true);};


  $scope.selectMulti = function () {
    $scope.menu = 'multi-select';};


  $scope.createMulti = function () {
    $scope.menu = 'multi-wait';

    $scope.requests.
    $add({ 
      uid: User.uid, 
      gameid: Game.nextId(), 
      active: true, 
      started: Firebase.ServerValue.TIMESTAMP }).

    then(function (ref) {
      $scope.reqkey = ref.key();
      console.log('Requesting', $scope.reqkey);

      ref.
      onDisconnect().
      update({ 
        active: false, 
        cancelled: Firebase.ServerValue.TIMESTAMP });


      var request = $firebaseObject(ref);
      var unwatch = undefined;
      unwatch = request.$watch(function () {
        if (request.joinuid) {
          console.log('Accepting', $scope.reqkey, request.joinuid);
          $scope.reqkey = null;

          request.acceptuid = request.joinuid;
          request.accepted = Firebase.ServerValue.TIMESTAMP;
          request.active = false;
          request.$save();

          start(true, request);

          unwatch();}});});};





  $scope.joinMulti = function (key) {
    console.log('Joining', key);
    $scope.acckey = key;

    var request = $firebaseObject(Db.ref('requests', [key]));
    request.$loaded(function () {
      request.joinuid = User.uid;
      request.joined = Firebase.ServerValue.TIMESTAMP;
      request.$save(request);});


    var unwatch = undefined;
    unwatch = request.$watch(function () {
      if (!request.active) {
        $scope.acckey = null;

        if (request.acceptuid === User.uid) {
          console.log('Joined', key);

          start(false, request);}

        unwatch();}});};}]);
'use strict';angular.
module('blockwars').
directive('bwWorld', function () {
  return { 
    restrict: 'E', 
    controller: 'worldController', 
    scope: { 
      'player': '=', 
      'rotate': '@' }, 

    replace: true, 
    template: '\n        <div class="world">\n          <div class="row" ng-repeat="row in ::rows">\n            <div class="col" ng-repeat="p in ::row">\n              <div ng-if="!player.data[p.y][pos(p.x)]" class="cell"></div>\n              <div ng-if="player.data[p.y][pos(p.x)]" class="cell"\n                ng-class="[player.data[p.y][pos(p.x)], player.data[p.y].removed ? \'removed\' : \'\']"></div>\n            </div>\n          </div>\n        </div>\n        ' };}).












controller('worldController', ["$scope", "BLOCK_START", "SIZE_HEIGHT", "SIZE_WIDTH", function ($scope, BLOCK_START, SIZE_HEIGHT, SIZE_WIDTH) {
  $scope.rows = [];

  $scope.pos = function (x) {
    if (!$scope.rotate) {
      return x;}


    var offset = Math.floor((4 - $scope.player.block.cells[$scope.player.block.rotation][0].length) / 2);

    return (x + $scope.player.block.x - offset + SIZE_WIDTH - BLOCK_START) % SIZE_WIDTH;};


  _.each(_.range(SIZE_HEIGHT), function (y) {
    var row = [];
    $scope.rows.push(row);

    _.each(_.range(SIZE_WIDTH), function (x) {
      row.push({ y: SIZE_HEIGHT - 1 - y, x: x });});});}]);
'use strict';angular.
module('blockwars').
service('Blocks', function () {
  var blocks = { 
    i: { 
      color: 'green', 
      rotation: 0, 
      cells: [[
      [1, 1, 1, 1]]] }, 


    j: { 
      color: 'red', 
      rotation: 0, 
      cells: [[
      [1, 1, 1], 
      [0, 0, 1]]] }, 


    l: { 
      color: 'red2', 
      rotation: 0, 
      cells: [[
      [1, 1, 1], 
      [1, 0, 0]]] }, 


    o: { 
      color: 'yellow', 
      rotation: 0, 
      cells: [[
      [1, 1], 
      [1, 1]]] }, 


    s: { 
      color: 'blue', 
      rotation: 0, 
      cells: [[
      [0, 1, 1], 
      [1, 1, 0]]] }, 


    t: { 
      color: 'purple', 
      rotation: 0, 
      cells: [[
      [1, 1, 1], 
      [0, 1, 0]]] }, 


    z: { 
      color: 'blue2', 
      rotation: 0, 
      cells: [[
      [1, 1, 0], 
      [0, 1, 1]]] } };



  var types = Object.keys(blocks);

  this.nextType = function () {
    return types[_.random(types.length - 1)];};


  this.get = function (_type) {
    return _.clone(blocks[_type || this.nextType()], true);};


  _.each(blocks, function (block) {
    var prev = block.cells[0];

    _.times(3, function () {
      var rotation = [];
      var rows = prev[0].length;
      var cols = prev.length;

      _.times(rows, function (ridx) {
        var row = [];
        rotation.push(row);

        _.times(cols, function (cidx) {
          row.push(prev[cidx][prev[cidx].length - ridx - 1]);});});



      prev = rotation;
      block.cells.push(rotation);});});});
'use strict';angular.
module('blockwars').
service('Db', function () {
  var fbref = new Firebase('https://cubewars.firebaseio.com/');

  this.base = function () {
    return fbref;};


  this.ref = function (parent, path) {
    var ref = this.base();

    if (parent) {
      ref = ref.child(parent);}


    if (path && path.length) {
      _.each(path, function (child) {
        ref = ref.child(child);});}



    return ref;};});
'use strict';angular.
module('blockwars').
service('Enemy', ["Game", function (Game) {
  this.init = function () {
    this.data = Game.getEnemy();};}]);
'use strict';angular.
module('blockwars').
service('Game', ["$injector", "$location", "$timeout", "$firebaseObject", "Db", "User", function ($injector, $location, $timeout, $firebaseObject, Db, User) {
  var _alpha = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  var rand = function rand(num) {
    var str = '';
    _.times(num, function () {
      str = '' + str + _alpha[_.random(_alpha.length - 1)];});

    return str;};


  var alpha = function alpha(_num) {
    var num = _num;
    var str = '';

    while (num > 0) {
      var chr = num % _alpha.length;
      str = '' + _alpha[chr] + str;
      num = (num - chr) / _alpha.length;}


    return str;};


  this.data = { ended: true };
  this.loading = false;

  this._gameRef = function () {
    return Db.ref('games', this.path);};


  this.getEnemy = function () {
    if (this.single) {
      return null;}


    return $firebaseObject(this._gameRef().child(this.mine ? 'enemy' : 'player'));};


  this.getPlayer = function () {
    return $firebaseObject(this._gameRef().child(this.mine ? 'player' : 'enemy'));};


  this.save = function (force) {
    if (this.mine || force) {
      this.data.$save();}};



  this.end = function () {
    this.data.ended = Firebase.ServerValue.TIMESTAMP; // eslint-disable-line
    this.save(true);

    var score = Db.ref('scores').push();
    var player = $injector.get('Player');

    score.update({ 
      uid: User.uid, 
      score: player.data.score, 
      lines: player.data.lines, 
      started: this.data.started, 
      ended: Firebase.ServerValue.TIMESTAMP // eslint-disable-line
    });};


  this.nextId = function () {
    var date = new Date();
    return ['' + 
    alpha(date.getUTCFullYear()) + alpha(date.getUTCMonth() + 1) + alpha(date.getUTCDate()), 
    alpha(date.getTime()), 
    rand(10)];};



  this.create = function (mine, request) {var _this = this;
    this.loading = true;
    this.single = !request;
    this.mine = this.single || mine;
    this.path = request ? request.gameid : this.nextId();

    this.data = $firebaseObject(this._gameRef());
    this.data.$loaded(function () {
      _this.loading = false;

      if (mine) {
        _this.data.started = Firebase.ServerValue.TIMESTAMP; // eslint-disable-line
        _this.data.ended = 0;
        _this.data.player = { uid: request ? request.uid : User.uid, score: 0, lines: 0 };
        _this.data.enemy = { uid: request ? request.acceptuid : null, score: 0, lines: 0 };
        _this.save();}


      $timeout(function () {
        $injector.get('Player').init();
        $injector.get('Enemy').init();});});};}]);
'use strict';angular.
module('blockwars').
service('Player', ["$interval", "$timeout", "BLOCK_START", "INTERVAL", "SIZE_HEIGHT", "SIZE_WIDTH", "Blocks", "Game", function ($interval, $timeout, BLOCK_START, INTERVAL, SIZE_HEIGHT, SIZE_WIDTH, Blocks, Game) {var _this9 = this;
  var SCORE = { 
    BLOCK: 1, 
    LINE: 100 };


  this.interval = INTERVAL;
  this.blocks = [];

  this._newBlock = function () {
    this._fixBlocks();

    if (this.block && this.block.y === SIZE_HEIGHT - 1) {
      Game.end();
      return;}


    var posx = (_.get(this.block, 'x', BLOCK_START) + SIZE_WIDTH) % SIZE_WIDTH;

    this.block = this.blocks.splice(0, 1)[0];
    this.block.x = posx;
    this.block.y = SIZE_HEIGHT - 1;
    this.blocks.push(Blocks.get());

    this._addBlock();};


  this.init = function () {var _this = this;
    this.loading = true;
    this.interval = INTERVAL;

    this.blocks.splice(0, this.blocks.length);
    _.times(5, function () {
      _this.blocks.push(Blocks.get());});

    console.log(this.blocks);

    this.data = Game.getPlayer();
    this.data.
    $loaded().
    then(function () {
      _this.loading = false;
      _this.block = undefined;
      _this.data.score = _this.data.score || 0;
      _this.data.lines = _this.data.lines || 0;});};



  this._addBlock = function () {var _this2 = this;
    _.each(this.block.cells[this.block.rotation], function (row, y) {
      _.each(row, function (cell, x) {
        if (cell) {
          var posy = _this2.block.y - y;
          var posx = (_this2.block.x + x + SIZE_WIDTH) % SIZE_WIDTH;

          _this2.data[posy] = _this2.data[posy] || {};
          _this2.data[posy][posx] = _this2.block.color;}});});};





  this._removeBlock = function () {var _this3 = this;
    _.each(this.block.cells[this.block.rotation], function (row, y) {
      _.each(row, function (cell, x) {
        if (cell) {
          var posy = _this3.block.y - y;
          var posx = (_this3.block.x + x + SIZE_WIDTH) % SIZE_WIDTH;

          _this3.data[posy] = _this3.data[posy] || {};
          _this3.data[posy][posx] = null;}});});};





  this._meltBlocks = function () {var _this4 = this;
    this._removeBlock();

    var y = 0;
    var melt = 0;

    while (y < SIZE_HEIGHT) {
      if (_.get(this.data[y], 'removed')) {
        _.each(_.range(y, SIZE_HEIGHT - 1), function (ny) {
          _this4.data[ny] = _this4.data[ny + 1] || null;});


        this.interval -= 2;
        this.data.lines++;
        this.data.score += ++melt * SCORE.LINE;
        this.data[SIZE_HEIGHT - 1] = null;} else 
      {
        y++;}}



    this._addBlock();};


  this._fixBlocks = function () {var _this5 = this;
    _.each(_.range(SIZE_HEIGHT), function (y) {
      var count = 0;

      if (_this5.data[y]) {
        _.each(_.range(SIZE_WIDTH), function (x) {
          if (_this5.data[y][x] === 'gray') {
            count++;} else 
          if (_this5.data[y][x]) {
            _this5.data[y][x] = 'gray';
            count++;}});



        if (count === SIZE_WIDTH) {
          _this5.data[y].removed = true;}}});};





  this._canMove = function (dy, dx) {var _this6 = this;
    this._removeBlock();

    var movable = true;

    _.each(this.block.cells[this.block.rotation], function (row, y) {
      _.each(row, function (cell, x) {
        if (movable && cell) {
          var posy = _this6.block.y + dy - y;
          var posx = (_this6.block.x + dx + x + SIZE_WIDTH) % SIZE_WIDTH;

          if (posy < 0 || _this6.data[posy] && _this6.data[posy][posx]) {
            movable = false;}}});});





    this._addBlock();

    return movable;};


  this._moveHoriz = function (dx) {
    if (this._canMove(0, dx)) {
      this._removeBlock();
      this.block.x = (this.block.x + dx + SIZE_WIDTH) % SIZE_WIDTH;
      this._addBlock();

      return true;}


    return false;};


  this._moveLeft = function () {
    return this._moveHoriz(-1);};


  this._moveRight = function () {
    return this._moveHoriz(1);};


  this._moveDown = function () {
    if (this._canMove(-1, 0)) {
      this._removeBlock();
      this.block.y -= 1;
      this._addBlock();

      return true;}


    this.data.score += SCORE.BLOCK;
    this._newBlock();

    return false;};


  this._dropDown = function () {
    var drop = 0;
    while (this._moveDown()) {
      drop++;}


    this.data.score += drop * SCORE.BLOCK;};


  this._canRotate = function (rot) {var _this7 = this;
    this._removeBlock();

    var rotatable = true;

    _.each(this.block.cells[rot], function (row, y) {
      _.each(row, function (cell, x) {
        if (rotatable && cell) {
          var posy = _this7.block.y - y;
          var posx = (_this7.block.x + x + SIZE_WIDTH) % SIZE_WIDTH;

          if (posy < 0 || _this7.data[posy] && _this7.data[posy][posx]) {
            rotatable = false;}}});});





    this._addBlock();

    return rotatable;};


  this._rotate = function (dr) {
    var rotation = this.block.rotation + dr;

    if (rotation < 0) {
      rotation = this.block.cells.length - 1;} else 
    if (rotation === this.block.cells.length) {
      rotation = 0;}


    if (this._canRotate(rotation)) {
      this._removeBlock();
      this.block.rotation = rotation;
      this._addBlock();

      return true;}


    return false;};


  this._rotateLeft = function () {
    return this._rotate(1);};


  this._rotateRight = function () {
    return this._rotate(-1);};


  this.isRunning = function () {
    return this.data && Game.data && Game.data.started && !Game.data.ended; // && Game.player === this.data.id;
  };

  this.save = function () {
    this.data.$save();};


  this.tick = function () {var _this8 = this;
    if (this.isRunning()) {
      if (!this.block) {
        this._newBlock();} else 
      {
        this._meltBlocks();
        this._moveDown();}


      this.save();}


    $timeout(function () {
      _this8.tick();}, 
    this.interval);};


  this.tick();

  var keyHandler = function keyHandler(evt) {
    var action = undefined;

    switch (evt.keyCode) {
      case 32:action = '_dropDown';break;
      case 37:action = '_moveLeft';break;
      case 38:action = '_rotateLeft';break;
      case 39:action = '_moveRight';break;
      case 40:action = '_rotateRight';break;
      default:break;}


    if (action && _this9.isRunning()) {
      $timeout(function () {
        _this9[action]();});}};




  var $doc = angular.element(document);
  $doc.on('keydown', keyHandler);}]);
'use strict';angular.
module('blockwars').
service('User', ["$cookies", "$injector", "$timeout", "$firebaseAuth", "Db", function ($cookies, $injector, $timeout, $firebaseAuth, Db) {var _this2 = this;
  var USER_COOKIE = 'fbuid';

  this.uid = null;

  this._start = function (uid) {
    this.uid = uid;

    $cookies.put(USER_COOKIE, this.uid);

    var session = Db.ref('sessions').push();

    session.
    onDisconnect().
    update({ 
      ended: Firebase.ServerValue.TIMESTAMP // eslint-disable-line
    });

    session.update({ 
      uid: uid, 
      started: Firebase.ServerValue.TIMESTAMP // eslint-disable-line
    });};


  this._auth = function () {var _this = this;
    var uid = $cookies.get(USER_COOKIE);

    if (uid) {
      console.log('Cookie retrieved', uid);

      this._start(uid);
      return;}


    $firebaseAuth(Db.base()).
    $authAnonymously().
    then(function (auth) {
      console.log('Authenticated', auth);

      _this._start(auth.uid);}).

    catch(function (err) {
      console.error('Authentication', err);});};



  $timeout(function () {
    _this2._auth();});}]);