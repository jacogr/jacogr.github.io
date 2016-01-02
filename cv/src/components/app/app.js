(function() {
  const printPath = '#/print';
  const summaryPath = '#/summary';

  Polymer({
    is: 'comp-app',
    behaviors: [PathBehavior],
    _pathChanged: function() {
      if (this.path === printPath) {
        this.toggleClass('print', true);
        setTimeout(() => window.print(), 1000);
      } else {
        this.toggleClass('print', false);
      }
    },
    printClass: function(path) {
      return path === printPath ? 'print' : '';
    },
    ready: function() {
      this.data = this.$.cvdata.data;

      if (window.location.hash === '') {
        window.location.hash = summaryPath;
      }
    }
  });
})();
