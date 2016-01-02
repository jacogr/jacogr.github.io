(function() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  Polymer({
    is: 'comp-position',
    properties: {
      data: {
        type: Object
      }
    },

    getDate: function(data) {
      const start = `${months[data.start.month - 1]} ${data.start.year}`;
      const end = data.end ? `${months[data.end.month - 1]} ${data.end.year}` : 'Current';

      return `${start} - ${end}`;
    },

    getShortYear: function(data) {
      return `${(data.end ? data.end.year : new Date().getFullYear())}`.slice(-2);
    }
  });
})();
