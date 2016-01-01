'use strict';

(function () {
  Polymer({
    is: 'comp-app',
    ready: function ready() {
      this.data = this.$.cvdata.data;
    }
  });
})();