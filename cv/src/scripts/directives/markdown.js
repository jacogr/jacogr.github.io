angular
  .module('cv')
  .directive('markdown', function($sanitize) {
    const conv = new showdown.Converter(); // eslint-disable-line no-undef

    return {
      restrict: 'AE',
      link: function(scope, element, attrs) {
        if (attrs.markdown) {
          scope.$watch(attrs.markdown, function(newVal) {
            const html = newVal ? $sanitize(conv.makeHtml(newVal)) : '';
            element.html(html);
          });
        } else {
          const html = $sanitize(conv.makeHtml(element.text()));
          element.html(html);
        }
      }
    };
  });
