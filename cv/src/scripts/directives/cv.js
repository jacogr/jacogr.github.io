@Component({
  selector: 'cv'
})
@View({
  directives: [CSSClass, For, Markdown, Position],
  template: `
    <div class="content" [class]="isPrint() && 'print'">
      <markdown class="introduction" data="data.summary"></markdown>
      <div class="positions">
        <position *for="#position in data.positions" data="position"></position>
      </div>
    </div>`
})
class CV {
  constructor(location: Location, data: CVData) {
    this.data = data;
    this.location = location;
  }

  isPrint() {
    return this.location.path() === '/print';
  }
}
