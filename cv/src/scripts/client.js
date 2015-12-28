document.addEventListener('DOMContentLoaded', () => {
  bootstrap(CV, [
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ]);
});
/*  .run(function($location, $rootScope, $timeout) {
    $rootScope.$on('$locationChangeSuccess', (evt, url) => {
      if (url.indexOf('#/print') !== -1) {
        $timeout(() => window.print(), 1000);
      }
    });

    if ($location.path() === '') {
      $location.path('/summary');
    }
  });
*/
