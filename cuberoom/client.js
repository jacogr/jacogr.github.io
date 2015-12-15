'use strict';angular.
module('cuberoom', ['ngRoute']).
constant('SIZE_DISPLAY', 21).
config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {// eslint-disable-line prefer-arrow-callback
  $locationProvider.html5Mode(false);}]);
'use strict';angular.
module('cuberoom').
controller('worldController', ["$scope", "$timeout", "SIZE_DISPLAY", "Player", "Rooms", function ($scope, $timeout, SIZE_DISPLAY, Player, Rooms) {var _this = this;
  this.pos = { room: {} };

  this.room = null;
  this.cell = {};

  this.translate = function (y, x) {
    return { 
      room: { 
        y: Math.floor(y / SIZE_DISPLAY), 
        x: Math.floor(x / SIZE_DISPLAY) }, 

      pos: { 
        y: (y % SIZE_DISPLAY + SIZE_DISPLAY) % SIZE_DISPLAY, 
        x: (x % SIZE_DISPLAY + SIZE_DISPLAY) % SIZE_DISPLAY } };};




  this.isBlocked = function (dy, dx) {
    if (!this.room) {
      return false;}


    var player = Player.getPos();
    var txpos = this.translate(player.y + dy, player.x + dx);

    if (txpos.room.x !== this.pos.room.x || txpos.room.y !== this.pos.room.y) {
      return this.cell.display.zero !== 'entrance';}


    return this.room.cells[txpos.pos.y][txpos.pos.x].blocked;};


  this.move = function (dy, dx) {
    if (this.isBlocked(dy, dx)) {
      return;}


    this.cell.player = false;

    var player = Player.incPos(dy, dx);
    var txpos = this.translate(player.y, player.x);

    if (txpos.room.x !== this.pos.room.x || txpos.room.y !== this.pos.room.y) {
      this.room = Rooms.get(txpos.room.y, txpos.room.x);}


    this.cell = this.room.cells[txpos.pos.y][txpos.pos.x];
    this.cell.player = true;
    this.pos = txpos;};


  this.move(0, 0);

  var keyHandler = function keyHandler(evt) {
    var x = 0;
    var y = 0;

    switch (evt.keyCode) {
      case 37:x--;break;
      case 38:y--;break;
      case 39:x++;break;
      case 40:y++;break;
      default:break;}


    if (x || y) {
      $timeout(function () {return _this.move(y, x);});}};



  var $doc = angular.element(document);
  $doc.on('keydown', keyHandler);
  $scope.$on('$destroy', function () {
    $doc.off('keydown', keyHandler);});}]);
'use strict';angular.
module('cuberoom').
service('Cells', function () {
  var DISPLAY = { 
    crate: { one: 'crate', two: 'crate' }, 
    door: { zero: 'entrance', four: 'door-top' }, 
    entrance: { zero: 'entrance' }, 
    floor: { zero: 'floor' }, 
    wall: { one: 'wall', two: 'wall', three: 'wall', four: 'wall' } };


  this.setDisplay = function (cell) {
    cell.display = DISPLAY[cell.type];};


  this.crate = function (cell) {
    cell.type = 'crate';
    cell.blocked = true;
    return cell;};


  this.door = function (cell) {
    cell.type = 'door';
    return cell;};


  this.entrance = function (cell) {
    cell.type = 'entrance';
    return cell;};


  this.floor = function (cell) {
    cell.type = 'floor';
    return cell;};


  this.wall = function (cell) {
    cell.type = 'wall';
    cell.blocked = true;
    return cell;};});
'use strict';angular.
module('cuberoom').
service('Objects', ["SIZE_DISPLAY", "Cells", "Random", function (SIZE_DISPLAY, Cells, Random) {
  var SIZE = { 
    CRATE: 3, 
    DOOR: 3 };


  var _crateTopLeft = function _crateTopLeft() {
    var off = SIZE_DISPLAY - SIZE.CRATE;
    return { y: Random.get(3, off - 3), x: Random.get(3, off - 3) };};


  this.crate = function (room) {
    var pos = _crateTopLeft();

    _.each([pos.y - 1, pos.y, pos.y + 1], function (y) {
      _.each([pos.x - 1, pos.x, pos.x + 1], function (x) {
        Cells.crate(room.cells[y][x]);});});};




  this.entranceBottom = function (room, pos) {
    if (!pos) {
      return;}


    _.each([pos.x - 1, pos.x, pos.x + 1], function (x) {
      Cells.entrance(room.cells[SIZE_DISPLAY - 1][x]);});};



  this.entranceLeft = function (room, pos) {
    if (!pos) {
      return;}


    _.each([pos.y - 1, pos.y, pos.y + 1], function (y) {
      Cells.entrance(room.cells[y][SIZE_DISPLAY - 1]);});};



  var _doorMid = function _doorMid() {
    return Random.get(3, SIZE_DISPLAY - SIZE.DOOR - 3) + 1;};


  this.wallTop = function (room) {var door = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var doorpos = [];
    if (door) {
      room.doors = room.doors || {};
      room.doors.top = { y: 0, x: _doorMid() };
      doorpos = [room.doors.top.x - 1, room.doors.top.x, room.doors.top.x + 1];}


    _.each(_.range(0, SIZE_DISPLAY), function (x) {
      if (_.contains(doorpos, x)) {
        Cells.door(room.cells[0][x]);
        Cells.entrance(room.cells[1][x]);} else 
      {
        Cells.wall(room.cells[0][x]);}});};




  this.wallRight = function (room) {var door = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var doorpos = [];
    if (door) {
      room.doors = room.doors || {};
      room.doors.right = { y: _doorMid(), x: 0 };
      doorpos = [room.doors.right.y - 1, room.doors.right.y, room.doors.right.y + 1];}


    _.each(_.range(0, SIZE_DISPLAY), function (y) {
      if (_.contains(doorpos, y)) {
        Cells.door(room.cells[y][0]);
        Cells.entrance(room.cells[y][1]);} else 
      {
        Cells.wall(room.cells[y][0]);}});};




  this.walls = function (room) {
    var doors = [{ top: true, right: true }, { top: true }, { right: true }][Random.get(3)];

    this.wallTop(room, doors.top);
    this.wallRight(room, doors.right);};}]);
'use strict';angular.
module('cuberoom').
service('Player', ["SIZE_DISPLAY", function (SIZE_DISPLAY) {
  var HALF = Math.floor(SIZE_DISPLAY / 2);

  this.pos = { y: HALF, x: HALF };
  this.dead = false;

  this.isDead = function () {
    return this.dead;};


  this.incPos = function (dy, dx) {
    this.pos.x += dx;
    this.pos.y += dy;

    return this.pos;};


  this.getPos = function () {
    return this.pos;};


  this.kill = function () {
    this.dead = true;};}]);
'use strict';angular.
module('cuberoom').
service('Random', function () {
  /*
    simplified Angularised MersenneTwister
    from JS https://gist.github.com/banksean/300494
    from C http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
  */
  this.seed = new Date().getTime();

  var N = 624;
  var M = 397;
  var MATRIX_A = 0x9908b0df;
  var UPPER_MASK = 0x80000000;
  var LOWER_MASK = 0x7fffffff;

  var mt = new Array(N);
  var mti = N + 1;

  var _initRandom = function _initRandom(seed) {
    mt[0] = seed >>> 0;
    for (mti = 1; mti < N; mti++) {
      var s = mt[mti - 1] ^ mt[mti - 1] >>> 30;
      mt[mti] = (((s & 0xffff0000) >>> 16) * 1812433253 << 16) + (s & 0x0000ffff) * 1812433253 + mti;
      mt[mti] >>>= 0;}};



  var _generateInt32 = function _generateInt32() {
    var y = undefined;
    var mag01 = new Array(0x0, MATRIX_A);

    if (mti >= N) {
      var kk = undefined;

      for (kk = 0; kk < N - M; kk++) {
        y = mt[kk] & UPPER_MASK | mt[kk + 1] & LOWER_MASK;
        mt[kk] = mt[kk + M] ^ y >>> 1 ^ mag01[y & 0x1];}


      for (; kk < N - 1; kk++) {
        y = mt[kk] & UPPER_MASK | mt[kk + 1] & LOWER_MASK;
        mt[kk] = mt[kk + (M - N)] ^ y >>> 1 ^ mag01[y & 0x1];}


      y = mt[N - 1] & UPPER_MASK | mt[0] & LOWER_MASK;
      mt[N - 1] = mt[M - 1] ^ y >>> 1 ^ mag01[y & 0x1];
      mti = 0;}


    y = mt[mti++];
    y ^= y >>> 11;
    y ^= y << 7 & 0x9d2c5680;
    y ^= y << 15 & 0xefc60000;
    y ^= y >>> 18;

    return y >>> 0;};


  var _generateInt31 = function _generateInt31() {
    return _generateInt32() >>> 1;};


  this.get = function (_min, _max) {
    var min = _min;
    var max = _max;

    if (_.isUndefined(_max)) {
      max = _min;
      min = 0;}


    return min + _generateInt31() % (max - min);};


  this.setSeed = function (seed) {
    this.seed = seed;
    _initRandom(seed);};


  this.getSeed = function () {
    return this.seed;};


  this.nextSeed = function () {
    this.setSeed(this.get(98765432));};


  this.setSeed(this.seed);});
'use strict';angular.
module('cuberoom').
service('Rooms', ["SIZE_DISPLAY", "Cells", "Objects", "Random", function (SIZE_DISPLAY, Cells, Objects, Random) {
  var COLORS = ['default', 'blue', 'gray', 'red'];
  var rooms = {};

  this._generate = function (y, x) {
    rooms[y] = rooms[y] || {};

    if (!rooms[y][x]) {(function () {
        rooms[y][x] = rooms[y][x] || { cells: {} };
        var room = rooms[y][x];
        room.color = COLORS[Random.get(COLORS.length)];

        _.each(_.range(0, SIZE_DISPLAY), function (ycell) {
          room.cells[ycell] = {};

          _.each(_.range(0, SIZE_DISPLAY), function (xcell) {
            room.cells[ycell][xcell] = Cells.floor({});});});



        Objects.walls(room);})();}


    return rooms[y][x];};


  this.get = function (y, x) {var _this = this;
    var range = [-1, 0, 1];
    _.each(range, function (dy) {
      _.each(range, function (dx) {
        _this._generate(y + dy, x + dx);});});



    var room = rooms[y][x];
    if (!room.initialized) {
      room.initialized = true;

      Objects.entranceBottom(room, rooms[y + 1][x].doors.top);
      Objects.entranceLeft(room, rooms[y][x + 1].doors.right);
      // Objects.crate(room);

      _.each(_.range(0, SIZE_DISPLAY), function (ycell) {
        _.each(_.range(0, SIZE_DISPLAY), function (xcell) {
          Cells.setDisplay(room.cells[ycell][xcell]);});});}




    return room;};}]);