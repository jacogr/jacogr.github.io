'use strict';

var PathBehavior = (function () {
  return {
    properties: {
      path: {
        type: String,
        notify: true,
        observer: '_pathChanged'
      }
    },
    _pathChanged: function _pathChanged() {},
    ready: function ready() {
      var _this = this;

      window.addEventListener('hashchange', function () {
        _this.path = window.location.hash;
      }, false);

      this.path = window.location.hash;
    }
  };
})();