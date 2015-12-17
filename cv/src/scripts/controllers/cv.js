angular
  .module('cv')
  .controller('cvController', function(Data) {
    this.positions = Data.cv;
    this.entry = undefined;

    this.show = function(entry) {
      this.entry = entry !== this.entry ? entry : undefined;
    };

    this.getClass = function(entry) {
      return `${entry.type}`;
    };

    this.getDate = function(entry) {
      const start = `${this.months[entry.start.month - 1]} ${entry.start.year}`;
      let end = 'Current';

      if (entry.end) {
        end = `${this.months[entry.end.month - 1]} ${entry.end.year}`;
      }

      return `${start} - ${end}`;
    };

    this._initRange = function() {
      const now = new Date();

      this.currentYear = now.getFullYear();
      this.currentMonth = now.getMonth() + 1;

      this.startYear = now.getFullYear() + 1;
      this.startMonth = 13;

      this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      _.each(Data.cv, (entry) => {
        if (entry.start.year < this.startYear) {
          this.startYear = entry.start.year;
          this.startMonth = entry.start.month;
        } else if (entry.start.month <= this.startMonth) {
          this.startMonth = entry.start.Month;
        }
      });

      this.years = _.range(this.currentYear, this.startYear - 1, -1);
    };

    this._initRange();
  });
