'use strict';

(function () {
  var printPath = '#/print';
  var summaryPath = '#/summary';

  Polymer({
    is: 'comp-cv',
    properties: {
      data: {
        type: Object
      },
      path: {
        type: String
      }
    },
    printClass: function printClass(path) {
      return path === printPath ? 'print' : '';
    },
    positionClass: function positionClass(path, id) {
      var viewPath = '#/' + id;

      if (_.contains([printPath, viewPath], path)) {
        return 'show';
      } else if (!_.contains([printPath, summaryPath, viewPath], path)) {
        return 'hide';
      }
      return '';
    },
    showItem: function showItem(evt) {
      var item = Polymer.dom(evt).localTarget;
      var viewPath = '#/' + item.id;
      var path = window.location.hash;

      if (path === viewPath) {
        window.location.hash = summaryPath;
      } else if (path === summaryPath) {
        window.location.hash = viewPath;
      }
    },
    ready: function ready() {
      var _this = this;

      window.addEventListener('hashchange', function () {
        _this.path = window.location.hash;
      }, false);

      this.path = window.location.hash;
    }
  });
})();