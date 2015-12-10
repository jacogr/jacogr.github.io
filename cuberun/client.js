'use strict';angular.
module('iso', ['ngRoute']).
constant('FULL', 15).
config(function ($routeProvider, $locationProvider) {// eslint-disable-line prefer-arrow-callback
  $locationProvider.html5Mode(false);});
'use strict';angular.
module('iso').
controller('worldController', function ($scope, $window, $timeout, $interval, $routeParams, Player, World, FULL) {var _this = this; // eslint-disable-line prefer-arrow-callback
  var HALF = Math.floor(FULL / 2);
  var CENTER = FULL * HALF + HALF;

  this.world = World.get(Player.getY(), Player.getX());
  this.grid = _.range(0, FULL * FULL);
  this.blocks = 0;
  this.time = 0;
  this.start = Date.now();

  this.restart = function () {
    $window.location.reload();};


  this.isDead = function () {
    return Player.isDead();};


  this.hasVisited = function (idx) {
    return this.world[idx].visited;};


  this.isBlocked = function (dy, dx) {
    var cell = this.world[CENTER + dx + dy * FULL];
    return Player.isDead() || _.contains(['cube'], cell.type);};


  this.move = function (dy, dx) {
    if (this.isBlocked(dy, dx)) {
      return;}


    this.world[CENTER].type = 'visited-player';
    Player.incPos(dy, dx);

    this.world = World.get(Player.getY(), Player.getX());
    if (_.contains(['enemy', 'visited-enemy'], this.world[CENTER].type)) {
      Player.kill();}


    if (!Player.isDead()) {
      this.world[CENTER].type = 'visited-player';
      this.blocks++;}};



  this.getOpacity = function (idx) {
    var row = Math.floor(idx / FULL);
    var col = (idx - row * FULL) % FULL;
    var dist = Math.sqrt(Math.pow(1 + HALF - row, 2) + Math.pow(1 + HALF - col, 2));

    return Math.max(0, 1.0 - dist / (FULL + HALF));};


  this.getClass = function (idx) {
    if (CENTER === idx) {
      return 'player';}


    return this.world[idx].type;};


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
    $doc.off('keydown', keyHandler);});


  $interval(function () {
    if (!Player.isDead()) {
      _this.time = (1 + Date.now() - _this.start) / 1000;}}, 

  1000);});
'use strict';angular.
module('iso').
service('Enemy', function ($interval, Player, FULL) {var _this2 = this; // eslint-disable-line prefer-arrow-callback
  var MAXDIST = FULL * 3;

  this.enemies = [];
  this.world = undefined;

  this.add = function (world, cell, y, x) {
    this.world = world.world;

    this.enemies.push({ 
      pos: { x: x, y: y }, 
      move: { x: 0, y: 0 }, 
      cell: cell });};



  this._isEmpty = function (enemy, dy, dx) {
    var posy = enemy.pos.y + dy;
    var posx = enemy.pos.x + dx;

    if (_.isUndefined(this.world[posy]) || _.isUndefined(this.world[posy][posx])) {
      return false;}


    var cell = this.world[posy][posx];
    return _.isUndefined(cell.type) || _.contains(['enemy', 'visited-enemy', 'visited-player'], cell.type);};


  this._canMove = function (enemy, dy, dx) {
    if (dx && enemy.move.x && dx !== enemy.move.x || dy && enemy.move.y && dy !== enemy.move.y) {
      return false;}


    return this._isEmpty(enemy, dy, dx);};


  this._kill = function (enemy) {
    if (Player.getY() === enemy.pos.y && Player.getX() === enemy.pos.x) {
      Player.kill();}};



  this._move = function (enemy, dy, dx) {
    enemy.pos.x += dx;
    enemy.pos.y += dy;
    enemy.move.x = dx;
    enemy.move.y = dy;

    this._kill(enemy);

    enemy.cell.type = 'visited-enemy';
    enemy.cell = this.world[enemy.pos.y][enemy.pos.x];
    enemy.cell.type = 'enemy';};


  this._hasClearCol = function (enemy) {
    var inc = enemy.pos.x < Player.getX() ? 1 : -1;
    var clear = true;
    var delta = 0;

    while (clear && enemy.pos.x + delta !== Player.getX()) {
      delta += inc;
      clear = this._isEmpty(enemy, 0, delta);}


    return clear;};


  this._hasClearRow = function (enemy) {
    var inc = enemy.pos.y < Player.getY() ? 1 : -1;
    var clear = true;
    var delta = 0;

    while (clear && enemy.pos.y + delta !== Player.getY()) {
      delta += inc;
      clear = this._isEmpty(enemy, delta, 0);}


    return clear;};


  this._moveAll = function () {var _this = this;
    if (!this.enemies.length) {
      return;}


    _.each(this.enemies, function (enemy) {
      _this._kill(enemy);

      var dx = Math.abs(enemy.pos.x - Player.getX());
      var dy = Math.abs(enemy.pos.y - Player.getY());
      var incy = enemy.pos.y < Player.getY() ? 1 : -1;
      var incx = enemy.pos.x < Player.getX() ? 1 : -1;

      if (dx < MAXDIST && dy < MAXDIST) {
        if (!dx && _this._hasClearRow(enemy)) {
          return _this._move(enemy, incy, 0);} else 
        if (!dy && _this._hasClearCol(enemy)) {
          return _this._move(enemy, 0, incx);} else 
        if (dx && _this._canMove(enemy, 0, incx)) {
          return _this._move(enemy, 0, incx);} else 
        if (dy && _this._canMove(enemy, incy, 0)) {
          return _this._move(enemy, incy, 0);}}



      if (_this._canMove(enemy, enemy.move.y, enemy.move.x)) {
        return _this._move(enemy, enemy.move.y, enemy.move.x);}


      var randx = [1, -1][_.random()];
      var randy = [1, -1][_.random()];

      if (!enemy.move.y && _this._canMove(enemy, randy, 0)) {
        _this._move(enemy, randy, 0);} else 
      if (!enemy.move.x && _this._canMove(enemy, 0, randx)) {
        _this._move(enemy, 0, randx);} else 
      if (_this._isEmpty(enemy, randy, 0)) {
        _this._move(enemy, randy, 0);} else 
      if (_this._isEmpty(enemy, 0, randx)) {
        _this._move(enemy, 0, randx);}});};




  $interval(function () {
    if (!Player.isDead()) {
      _this2._moveAll();}}, 

  750);});
'use strict';angular.
module('iso').
service('Player', function () {// eslint-disable-line prefer-arrow-callback
  this.x = 0;
  this.y = 0;
  this.dead = false;

  this.isDead = function () {
    return this.dead;};


  this.incPos = function (dy, dx) {
    this.x += dx;
    this.y += dy;};


  this.getX = function () {
    return this.x;};


  this.getY = function () {
    return this.y;};


  this.kill = function () {
    this.dead = true;};});
'use strict';angular.
module('iso').
service('World', function (Enemy, FULL) {// eslint-disable-line prefer-arrow-callback
  var HALF = Math.floor(FULL / 2);
  var QUATER = Math.floor(FULL / 4);

  this.world = {};
  this.maps = {};
  this.enemies = [];
  this.player = { 
    pos: {}, 
    move: {} };


  this._randomMap = function (offset) {
    var width = _.random(QUATER, Math.floor(HALF - offset / 2));
    var height = _.random(QUATER, Math.floor(HALF - offset / 2));
    var range = _.range(0, FULL);
    var map = {};

    var x = _.random(HALF - offset, HALF + offset);
    var xmin = x - width;
    var xmax = x + width;
    var xrange = _.range(xmin, xmax + 1);

    var y = _.random(HALF - offset, HALF + offset);
    var ymin = y - height;
    var ymax = y + height;
    var yrange = _.range(ymin, ymax + 1);

    _.each(range, function (row) {
      map[row] = {};
      _.each(range, function (col) {return map[row][col] = {};});});


    _.each(xrange, function (col) {
      if (col < FULL && col >= 0 && !_.contains([x - 1, x, x + 1], col)) {
        if (ymin >= 0 && ymin < FULL) {
          map[ymin][col].type = 'cube';}

        if (ymax >= 0 && ymax < FULL) {
          map[ymax][col].type = 'cube';}}});




    _.each(yrange, function (row) {
      if (row < FULL && row >= 0 && !_.contains([y - 1, y, y + 1], row)) {
        if (xmin >= 0 && xmin < FULL) {
          map[row][xmin].type = 'cube';}

        if (xmax >= 0 && xmax < FULL) {
          map[row][xmax].type = 'cube';}}});




    return map;};


  this._generateMap = function () {
    var result = {};
    var range = _.range(0, FULL);
    // const colors = ['white', 'blue', '', '', '', '', '', '', '', '', '', ''];
    var color = undefined; // colors[_.random(colors.length - 1)];

    _.each(range, function (row) {
      result[row] = {};
      _.each(range, function (col) {return result[row][col] = {};});});


    _.each([this._randomMap(0), this._randomMap(QUATER)], function (map) {
      _.each(map, function (row, ridx) {
        _.each(row, function (cell, cidx) {
          if (cell.type && !result[ridx][cidx].type) {
            result[ridx][cidx].type = cell.type;
            result[ridx][cidx].color = color;}});});});





    if (true || !_.random(5)) {
      var ridx = _.random(FULL - 1);
      var cidx = _.random(FULL - 1);

      if (!result[ridx][cidx].type) {
        result[ridx][cidx].type = 'enemy';}}



    return result;};


  this.get = function (posy, posx) {var _this = this;
    var crow = posy >= 0 ? Math.ceil(posy / FULL) : Math.floor(posy / FULL);

    _.each([crow - 1, crow, crow + 1], function (maprow) {
      if (!_this.maps[maprow]) {
        _this.maps[maprow] = {};}


      var ccol = posx >= 0 ? Math.ceil(posx / FULL) : Math.floor(posx / FULL);

      _.each([ccol - 1, ccol, ccol + 1], function (mapcol) {
        if (!_this.maps[maprow][mapcol]) {(function () {
            _this.maps[maprow][mapcol] = _this._generateMap();
            var ridx = maprow * FULL - HALF;

            _.each(_this.maps[maprow][mapcol], function (row) {
              _this.world[ridx] = _this.world[ridx] || {};
              var cidx = mapcol * FULL - HALF;

              _.each(row, function (cell) {
                _this.world[ridx][cidx] = cell;
                if (cell.type === 'enemy') {
                  Enemy.add(_this, cell, ridx, cidx);}

                cidx++;});


              ridx++;});})();}});});





    var map = [];
    _.each(_.range(posy - HALF, posy + HALF + 1), function (ridx) {
      _.each(_.range(posx - HALF, posx + HALF + 1), function (cidx) {
        var cell = _this.world[ridx][cidx];
        if (!cell.pos) {
          cell.pos = { x: cidx, y: ridx };}


        if (ridx % FULL === 0 && cidx % FULL === 0 && _.contains(['cube'], cell.type)) {
          cell.type = undefined;}


        map.push(cell);});});



    return map;};});