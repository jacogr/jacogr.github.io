angular
  .module('blockwars')
  .service('Blocks', function() {
    const blocks = {
      i: {
        color: 'green',
        rotation: 0,
        cells: [[
          [1, 1, 1, 1]
        ]]
      },
      j: {
        color: 'red',
        rotation: 0,
        cells: [[
          [1, 1, 1],
          [0, 0, 1]
        ]]
      },
      l: {
        color: 'red2',
        rotation: 0,
        cells: [[
          [1, 1, 1],
          [1, 0, 0]
        ]]
      },
      o: {
        color: 'yellow',
        rotation: 0,
        cells: [[
          [1, 1],
          [1, 1]
        ]]
      },
      s: {
        color: 'blue',
        rotation: 0,
        cells: [[
          [0, 1, 1],
          [1, 1, 0]
        ]]
      },
      t: {
        color: 'purple',
        rotation: 0,
        cells: [[
          [1, 1, 1],
          [0, 1, 0]
        ]]
      },
      z: {
        color: 'blue2',
        rotation: 0,
        cells: [[
          [1, 1, 0],
          [0, 1, 1]
        ]]
      }
    };
    const types = Object.keys(blocks);

    this.nextType = function() {
      return types[_.random(types.length - 1)];
    };

    this.get = function(_type) {
      return _.clone(blocks[_type || this.nextType()], true);
    };

    _.each(blocks, (block) => {
      let prev = block.cells[0];

      _.times(3, () => {
        const rotation = [];
        const rows = prev[0].length;
        const cols = prev.length;

        _.times(rows, (ridx) => {
          const row = [];
          rotation.push(row);

          _.times(cols, (cidx) => {
            row.push(prev[cidx][prev[cidx].length - ridx - 1]);
          });
        });

        prev = rotation;
        block.cells.push(rotation);
      });
    });
  });
