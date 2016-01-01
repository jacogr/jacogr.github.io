(function() {
  Polymer({
    is: 'comp-menu',
    properties: {
      data: {
        type: Object
      },
      path: {
        type: String
      }
    },
    itemClass: function(path, itempath) {
      return `item ${path === itempath ? 'selected' : ''}`;
    },
    ready: function() {
      window.addEventListener('hashchange', () => {
        this.path = window.location.hash;

        if (this.path === '#/print') {
          setTimeout(() => window.print(), 1000);
        }
      }, false);

      this.path = window.location.hash;
      if (window.location.hash === '') {
        window.location.hash = '#/summary';
      }
    }
  });
})();
