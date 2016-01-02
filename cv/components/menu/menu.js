'use strict';

(function () {
  Polymer({
    is: 'comp-menu',
    behaviors: [PathBehavior],
    properties: {
      data: {
        type: Object
      }
    },
    itemClass: function itemClass(path, itempath) {
      return 'item ' + (path === itempath ? 'selected' : '');
    }
  });
})();