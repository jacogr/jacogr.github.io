(function() {
  Polymer({
    is: 'comp-app',
    ready: function() {
      this.data = this.$.cvdata.data;
    }
  });
})();
