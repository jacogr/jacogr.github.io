@Component({
  selector: 'markdown'
})
@View({
  template: '<div class="markdown" [inner-html]="html"></div>'
})
class Markdown {
  constructor(@Attribute('data') data) {
    const conv = new showdown.Converter(); // eslint-disable-line no-undef

    this.html = conv.makeHtml(data);
  }
}
