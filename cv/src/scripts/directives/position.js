@Component({
  selector: 'position'
})
@View({
  directives: [Markdown],
  template: `
    <div class="position" ng-class="(isHidden() && 'hide') || (isExtended() && 'show')" (click)="show()">
      <div class="summary">
        <div class="action fa" ng-class="isExtended() ? 'fa-level-up' : 'fa-level-down'"></div>
        <div class="title">{{ data.position }}</div>
        <div class="company">{{ data.company }}</div>
        <div class="sub">
          <div class="location">{{ data.location }}</div>
          <div class="fromto">{{ getDate() }}</div>
        </div>
        <div class="year">'{{ getShortYear() }}</div>
      </div>
      <markdown class="expanded" data="data.description" ng-class="isExtended() && 'show'"></markdown>
    </div>`
})
class Position {
  constructor(@Attribute('data') data) {
    this.data = data;

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.viewPath = `/${data.id}`;
    this.summaryPath = '/summary';
    this.printPath = '/print';
  }

  show() {
    const path = $location.path();

    if (path === this.viewPath) {
      $location.path(this.summaryPath);
    } else if (path === this.summaryPath) {
      $location.path(this.viewPath);
    }
  }

  isExtended() {
    return _.contains([this.printPath, this.viewPath], $location.path());
  }

  isHidden() {
    return !_.contains([this.printPath, this.summaryPath, this.viewPath], $location.path());
  }

  getDate() {
    const start = `${this.months[this.data.start.month - 1]} ${this.data.start.year}`;
    const end = this.data.end ? `${this.months[this.data.end.month - 1]} ${this.data.end.year}` : 'Current';

    return `${start} - ${end}`;
  }

  getShortYear() {
    return `${(this.data.end ? this.data.end.year : new Date().getFullYear())}`.slice(-2);
  }
}
