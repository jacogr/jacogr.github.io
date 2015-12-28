@Component({
  selector: 'cv'
})
@View({
  directives: [CSSClass, Markdown, Position],
  template: `
    <div class="content" [class]="isPrint() && 'print'">
      <markdown class="introduction" data="data.summary"></markdown>
      <div class="positions">
        <position ng-repeat="position in data.positions" data="position"></position>
      </div>
    </div>`
})
class CV {
  constructor(data: CVData) {
    this.data = data;
  }

  isPrint() {
    return $location.path() === '/print';
  }
}
