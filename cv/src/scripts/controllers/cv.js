angular
  .module('cv')
  .controller('cvController', function(Data) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    this.positions = Data.cv;
    this.entry = undefined;

    this.show = function(entry) {
      this.entry = entry !== this.entry ? entry : undefined;
    };

    this.getDate = function(entry) {
      const start = `${months[entry.start.month - 1]} ${entry.start.year}`;
      const end = entry.end ? `${months[entry.end.month - 1]} ${entry.end.year}` : 'Current';

      return `${start} - ${end}`;
    };
  });
