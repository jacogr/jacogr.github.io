(function() {
  const printPath = '#/print';
  const summaryPath = '#/summary';

  Polymer({
    is: 'comp-app',
    behaviors: [PathBehavior],
    _pathChanged: function() {
      if (this.path === printPath) {
        setTimeout(() => window.print(), 1000);
      }
    },
    ready: function() {
      this.data = this.$.cvdata.data;

      if (window.location.hash === '') {
        window.location.hash = summaryPath;
      }
    }
  });
})();
