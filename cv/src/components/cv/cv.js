(function() {
  const printPath = '#/print';
  const summaryPath = '#/summary';

  Polymer({
    is: 'comp-cv',
    behaviors: [PathBehavior],
    properties: {
      data: {
        type: Object
      }
    },
    printClass: function(path) {
      return path === printPath ? 'print' : '';
    },
    positionClass: function(path, id) {
      const viewPath = `#/${id}`;

      if (_.contains([printPath, viewPath], path)) {
        return 'show';
      } else if (!_.contains([printPath, summaryPath, viewPath], path)) {
        return 'hide';
      }
      return '';
    },
    showItem: function(evt) {
      const item = Polymer.dom(evt).localTarget;
      const viewPath = `#/${item.id}`;
      const path = window.location.hash;

      if (path === viewPath) {
        window.location.hash = summaryPath;
      } else if (path === summaryPath) {
        window.location.hash = viewPath;
      }
    }
  });
})();
