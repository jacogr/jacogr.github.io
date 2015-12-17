angular
  .module('cv')
  .controller('cvController', function($location, Data) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.positions = Data.positions;
    this.summary = Data.summary;

    this.entry = this.prevEntry = undefined;

    this.isPath = function(path) {
      return $location.path() === path;
    };

    this.show = function(entry) {
      if (!this.isPath('/summary')) {
        return;
      }

      this.prevEntry = this.entry;
      this.entry = entry !== this.entry ? entry : undefined;
    };

    this.getDate = function(entry) {
      const start = `${months[entry.start.month - 1]} ${entry.start.year}`;
      const end = entry.end ? `${months[entry.end.month - 1]} ${entry.end.year}` : 'Current';

      return `${start} - ${end}`;
    };

    if ($location.path() === '') {
      $location.path('/summary');
    }
  });
