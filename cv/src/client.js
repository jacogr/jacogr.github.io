(function() {
  const checkHttps = function() {
    if (window.location.host.substr(-10) === '.github.io' && window.location.protocol !== 'https:') {
      window.location.protocol = 'https:';
      return false;
    }

    return true;
  };

  const lazyLoadPolymerAndElements = function() {
    // window.Polymer = window.Polymer || {};
    // window.Polymer.dom = 'shadow';

    const elements = ['components/app/app.html'];

    elements.forEach(function(elementURL) {
      const elImport = document.createElement('link');

      elImport.rel = 'import';
      elImport.href = elementURL;

      document.head.appendChild(elImport);
    });
  };

  const checkWebComponents = function() {
    const webComponentsSupported = ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template'));

    if (!webComponentsSupported) {
      const wcPoly = document.createElement('script');

      wcPoly.src = 'bower_components/webcomponentsjs/webcomponents-lite.min.js';
      wcPoly.onload = lazyLoadPolymerAndElements;

      document.head.appendChild(wcPoly);
    } else {
      lazyLoadPolymerAndElements();
    }
  };

  checkHttps() && checkWebComponents();
})();
