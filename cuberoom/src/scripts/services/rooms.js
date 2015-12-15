angular
  .module('cuberoom')
  .service('Rooms', function(SIZE_DISPLAY, Cells, Objects, Random) {
    const COLORS = ['default', 'blue', 'gray', 'red'];
    const rooms = {};

    this._generate = function(y, x) {
      rooms[y] = rooms[y] || {};

      if (!rooms[y][x]) {
        rooms[y][x] = rooms[y][x] || { cells: {} };
        const room = rooms[y][x];
        room.color = COLORS[Random.get(COLORS.length)];

        _.each(_.range(0, SIZE_DISPLAY), (ycell) => {
          room.cells[ycell] = {};

          _.each(_.range(0, SIZE_DISPLAY), (xcell) => {
            room.cells[ycell][xcell] = Cells.floor({});
          });
        });

        Objects.walls(room);
      }

      return rooms[y][x];
    };

    this.get = function(y, x) {
      const range = [-1, 0, 1];
      _.each(range, (dy) => {
        _.each(range, (dx) => {
          this._generate(y + dy, x + dx);
        });
      });

      const room = rooms[y][x];
      if (!room.initialized) {
        room.initialized = true;

        Objects.entranceBottom(room, rooms[y + 1][x].doors.top);
        Objects.entranceLeft(room, rooms[y][x + 1].doors.right);
        // Objects.crate(room);

        _.each(_.range(0, SIZE_DISPLAY), (ycell) => {
          _.each(_.range(0, SIZE_DISPLAY), (xcell) => {
            Cells.setDisplay(room.cells[ycell][xcell]);
          });
        });
      }

      return room;
    };
  });
