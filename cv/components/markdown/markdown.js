'use strict';

// usage
//    <comp-markdown text="md"></comp-markdown>
// or
//    <comp-markdown>md</comp-markdown>
Polymer({
  is: 'comp-markdown',
  properties: {
    text: {
      type: String,
      observer: '_textChanged'
    },
    html: {
      type: String
    }
  },
  _textChanged: function _textChanged() {
    var conv = new showdown.Converter(); // eslint-disable-line no-undef

    this.$.markdown.innerHTML = conv.makeHtml(this.text);
  }
});