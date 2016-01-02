'use strict';

(function () {
  Polymer({
    is: 'comp-menu',
    behaviors: [PathBehavior],
    properties: {
      data: {
        type: Object
      },
      items: {
        type: Array,
        value: [{ url: '#/summary', name: 'Summary' }, { url: '#/print', name: 'Print' }]
      }
    },
    itemClass: function itemClass(path, itempath) {
      return 'item ' + (path === itempath ? 'selected' : '');
    }
  });
})();