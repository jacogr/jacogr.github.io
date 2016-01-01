'use strict';

(function () {
  Polymer({
    is: 'comp-menu',
    properties: {
      data: {
        type: Object
      },
      path: {
        type: String
      }
    },
    itemClass: function itemClass(path, itempath) {
      return 'item ' + (path === itempath ? 'selected' : '');
    },
    ready: function ready() {
      var _this = this;

      window.addEventListener('hashchange', function () {
        _this.path = window.location.hash;

        if (_this.path === '#/print') {
          setTimeout(function () {
            return window.print();
          }, 1000);
        }
      }, false);

      this.path = window.location.hash;
      if (window.location.hash === '') {
        window.location.hash = '#/summary';
      }
    }
  });
})();