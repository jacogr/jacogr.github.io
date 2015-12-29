@Component({
  selector: 'menu'
})
@View({
  directives: [CSSClass, For],
  template: `
    <div class="menu">
      <div class="cv">CV</div>
      <div class="person">
        <p>{{ data.name }}</p>
        <p>{{ data.position }}</p>
      </div>
      <div class="items">
        <a class="item" *for="#item in menu" [href]="#{{ item.url }}" [class]="isPath(item.url) && 'selected'">{{ item.title }}</a>
      </div>
    </div>`
})
class Menu {
  constructor(location: Location, data: CVData) {
    this.menu = [
      { url: '/summary', title: 'Summary' },
      { url: '/print', title: 'Print' }
    ];

    this.location = location;
    this.data = data;
  }

  isPath(url) {
    return this.location.path() === url;
  }
}
