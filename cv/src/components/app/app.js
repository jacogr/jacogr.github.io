(function() {
  const printPath = '#/print';
  const summaryPath = '#/summary';

  Polymer({
    is: 'comp-app',
    behaviors: [PathBehavior],

    _pathChanged: function() {
      let print = false;

      if (this.path === printPath) {
        print = true;

        setTimeout(() => {
          window.print();
        }, 1000);
      }

      this.toggleClass('print', print);
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
