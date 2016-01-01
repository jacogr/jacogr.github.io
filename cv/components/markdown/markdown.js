'use strict';

(function () {
  Polymer({
    is: 'comp-markdown',
    properties: {
      text: {
        type: String,
        observer: '_textChanged'
      }
    },
    _textChanged: function _textChanged() {
      var conv = new showdown.Converter(); // eslint-disable-line no-undef

      this.$.markdown.innerHTML = conv.makeHtml(this.text);
    }
  });
})();