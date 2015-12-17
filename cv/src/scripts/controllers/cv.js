angular
  .module('cv')
  .controller('cvController', function($location, Data) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.data = Data;
    this.entry = undefined;

    this.isPath = function(path) {
      return $location.path() === path;
    };

    this.show = function(entry) {
      if (!this.isPath('/summary')) {
        return;
      }

      this.entry = entry !== this.entry ? entry : undefined;
    };

    this.getDate = function(entry) {
      const start = `${months[entry.start.month - 1]} ${entry.start.year}`;
      const end = entry.end ? `${months[entry.end.month - 1]} ${entry.end.year}` : 'Current';

      return `${start} - ${end}`;
    };

    this.getYear = function(entry) {
      const year = `${(entry.end ? entry.end.year : new Date().getFullYear())}`.slice(-2);

      return `'${year}`;
    };

    if ($location.path() === '') {
      $location.path('/summary');
    }
  });
