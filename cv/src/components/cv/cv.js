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
  printClass: function(path) {
    return path === '#/print' ? 'print' : '';
  },
  positionClass: function(path, id) {
    const printPath = '#/print';
    const summaryPath = '#/summary';
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
    const summaryPath = '#/summary';
    const viewPath = `#/${item.id}`;
    const path = window.location.hash;

    if (path === viewPath) {
      window.location.hash = summaryPath;
    } else if (path === summaryPath) {
      window.location.hash = viewPath;
    }
  },
  ready: function() {
    window.addEventListener('hashchange', () => {
      this.path = window.location.hash;
    }, false);

    this.path = window.location.hash;
  }
});
