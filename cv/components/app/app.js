'use strict';

(function () {
  var printPath = '#/print';
  var summaryPath = '#/summary';

  Polymer({
    is: 'comp-app',
    behaviors: [PathBehavior],
    _pathChanged: function _pathChanged() {
      if (this.path === printPath) {
        setTimeout(function () {
          return window.print();
        }, 1000);
      }
    },
    ready: function ready() {
      this.data = this.$.cvdata.data;

      if (window.location.hash === '') {
        window.location.hash = summaryPath;
      }
    }
  });
})();