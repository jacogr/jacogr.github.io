angular
  .module('cuberoom')
  .service('Objects', function(SIZE_DISPLAY, Cells, Random) {
    const SIZE = {
      CRATE: 3,
      DOOR: 3
    };

    const _crateTopLeft = function() {
      const off = SIZE_DISPLAY - SIZE.CRATE;
      return { y: Random.get(3, off - 3), x: Random.get(3, off - 3) };
    };

    this.crate = function(room) {
      const pos = _crateTopLeft();

      _.each([pos.y - 1, pos.y, pos.y + 1], (y) => {
        _.each([pos.x - 1, pos.x, pos.x + 1], (x) => {
          Cells.crate(room.cells[y][x]);
        });
      });
    };

    this.entranceBottom = function(room, pos) {
      if (!pos) {
        return;
      }

      _.each([pos.x - 1, pos.x, pos.x + 1], (x) => {
        Cells.entrance(room.cells[SIZE_DISPLAY - 1][x]);
      });
    };

    this.entranceLeft = function(room, pos) {
      if (!pos) {
        return;
      }

      _.each([pos.y - 1, pos.y, pos.y + 1], (y) => {
        Cells.entrance(room.cells[y][SIZE_DISPLAY - 1]);
      });
    };

    const _doorMid = function() {
      return Random.get(3, SIZE_DISPLAY - SIZE.DOOR - 3) + 1;
    };

    this.wallTop = function(room, door = false) {
      let doorpos = [];
      if (door) {
        room.doors = room.doors || {};
        room.doors.top = { y: 0, x: _doorMid() };
        doorpos = [room.doors.top.x - 1, room.doors.top.x, room.doors.top.x + 1];
      }

      _.each(_.range(0, SIZE_DISPLAY), (x) => {
        if (_.contains(doorpos, x)) {
          Cells.door(room.cells[0][x]);
          Cells.entrance(room.cells[1][x]);
        } else {
          Cells.wall(room.cells[0][x]);
        }
      });
    };

    this.wallRight = function(room, door = false) {
      let doorpos = [];
      if (door) {
        room.doors = room.doors || {};
        room.doors.right = { y: _doorMid(), x: 0 };
        doorpos = [room.doors.right.y - 1, room.doors.right.y, room.doors.right.y + 1];
      }

      _.each(_.range(0, SIZE_DISPLAY), (y) => {
        if (_.contains(doorpos, y)) {
          Cells.door(room.cells[y][0]);
          Cells.entrance(room.cells[y][1]);
        } else {
          Cells.wall(room.cells[y][0]);
        }
      });
    };

    this.walls = function(room) {
      const doors = [{ top: true, right: true }, { top: true }, { right: true }][Random.get(3)];

      this.wallTop(room, doors.top);
      this.wallRight(room, doors.right);
    };
  });
