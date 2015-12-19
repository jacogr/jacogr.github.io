angular
  .module('cv')
  .directive('markdown', function() {
    return {
      restrict: 'E',
      controller: 'markdownController',
      replace: true,
      scope: {
        data: '=data'
      },
      template: '<div class="markdown" ng-bind-html="html"></div>'
    };
  })
  .controller('markdownController', function($scope) {
    const conv = new showdown.Converter(); // eslint-disable-line no-undef

    $scope.html = conv.makeHtml($scope.data);
  });
