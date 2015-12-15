angular
  .module('cuberoom')
  .service('Cells', function() {
    const DISPLAY = {
      crate: { one: 'crate', two: 'crate' },
      door: { zero: 'entrance', four: 'door-top' },
      entrance: { zero: 'entrance' },
      floor: { zero: 'floor' },
      wall: { one: 'wall', two: 'wall', three: 'wall', four: 'wall' }
    };

    this.setDisplay = function(cell) {
      cell.display = DISPLAY[cell.type];
    };

    this.crate = function(cell) {
      cell.type = 'crate';
      cell.blocked = true;
      return cell;
    };

    this.door = function(cell) {
      cell.type = 'door';
      return cell;
    };

    this.entrance = function(cell) {
      cell.type = 'entrance';
      return cell;
    };

    this.floor = function(cell) {
      cell.type = 'floor';
      return cell;
    };

    this.wall = function(cell) {
      cell.type = 'wall';
      cell.blocked = true;
      return cell;
    };
  });
