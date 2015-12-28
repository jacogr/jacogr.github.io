@Component({
  selector: 'menu'
})
@View({
  directives: [CSSClass],
  template: `
    <div class="menu">
      <div class="cv">CV</div>
      <div class="person">
        <p>{{ data.name }}</p>
        <p>{{ data.position }}</p>
      </div>
      <div class="items">
        <a class="item" ng-repeat="item in menu" ng-href="#{{ item.url }}" [class]="isPath(item.url) && 'selected'">{{ item.title }}</a>
      </div>
    </div>`
})
class Menu {
  constructor(data: CVData) {
    this.menu = [
      { url: '/summary', title: 'Summary' },
      { url: '/print', title: 'Print' }
    ];

    this.data = data;
  }

  isPath(url) {
    return $location.path() === url;
  }
}
