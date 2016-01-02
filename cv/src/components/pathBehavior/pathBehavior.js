const PathBehavior = (function() {
  return {
    properties: {
      path: {
        type: String,
        notify: true,
        observer: '_pathChanged'
      }
    },

    _pathChanged: function() {
    },

    ready: function() {
      window.addEventListener('hashchange', () => {
        this.path = window.location.hash;
      }, false);

      this.path = window.location.hash;
    }
  };
})();
