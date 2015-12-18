'use strict';angular.
module('cv', ['ngSanitize']).
config(["$locationProvider", function ($locationProvider) {
  $locationProvider.html5Mode(false);}]).

run(["$location", "$rootScope", "$timeout", function ($location, $rootScope, $timeout) {
  $rootScope.$on('$locationChangeSuccess', function (evt, url) {
    if (url.indexOf('#/print') !== -1) {
      $timeout(function () {return window.print();}, 1000);}});



  if ($location.path() === '') {
    $location.path('/summary');}}]);
'use strict';angular.
module('cv').
directive('cv', function () {
  return { 
    restrict: 'E', 
    controller: 'cvController', 
    replace: true, 
    template: '\n        <div class="content" ng-class="isPrint() && \'print\'">\n          <div class="introduction" markdown="data.summary"></div>\n          <div class="positions">\n            <position ng-repeat="position in data.positions" data="position"></position>\n          </div>\n        </div>' };}).








controller('cvController', ["$location", "$scope", "CVData", function ($location, $scope, CVData) {
  $scope.data = CVData;

  $scope.isPrint = function () {
    return $location.path() === '/print';};}]);
'use strict';angular.
module('cv').
directive('markdown', ["$sanitize", function ($sanitize) {
  var conv = new showdown.Converter(); // eslint-disable-line no-undef

  return { 
    restrict: 'AE', 
    link: function link(scope, element, attrs) {
      if (attrs.markdown) {
        scope.$watch(attrs.markdown, function (newVal) {
          var html = newVal ? $sanitize(conv.makeHtml(newVal)) : '';
          element.html(html);});} else 

      {
        var html = $sanitize(conv.makeHtml(element.text()));
        element.html(html);}} };}]);
'use strict';angular.
module('cv').
directive('menu', function () {
  return { 
    restrict: 'E', 
    controller: 'menuController', 
    replace: true, 
    template: '\n        <div class="menu">\n          <div class="cv">CV</div>\n          <div class="person">\n            <p>{{ data.name }}</p>\n            <p>{{ data.position }}</p>\n          </div>\n          <div class="items">\n            <a class="item" ng-repeat="item in menu" ng-href="#{{ item.url }}" ng-class="isPath(item.url) && \'selected\'">\n              {{ item.title }}\n            </a>\n          </div>\n        </div>' };}).














controller('menuController', ["$location", "$scope", "CVData", function ($location, $scope, CVData) {
  $scope.menu = [
  { url: '/summary', title: 'Summary' }, 
  { url: '/print', title: 'Print' }];


  $scope.data = CVData;

  $scope.isPath = function (url) {
    return $location.path() === url;};}]);
'use strict';angular.
module('cv').
directive('position', function () {
  return { 
    restrict: 'E', 
    controller: 'positionController', 
    scope: { 
      data: '=data' }, 

    replace: true, 
    template: '\n        <div class="position" ng-class="isHidden() && \'hide\'" ng-click="show()">\n          <div class="summary">\n            <div class="action fa" ng-class="isExtended() ? \'fa-level-up\' : \'fa-level-down\'"></div>\n            <div class="title">{{ data.position }}</div>\n            <div class="company">{{ data.company }}</div>\n            <div class="sub">\n              <div class="location">{{ data.location }}</div>\n              <div class="fromto">{{ getDate() }}</div>\n            </div>\n            <div class="year">\'{{ getShortYear() }}</div>\n          </div>\n          <div class="expanded" ng-class="isExtended() && \'show\'">\n            <div class="section" markdown="data.description"></div>\n          </div>\n        </div>' };}).

















controller('positionController', ["$scope", "$location", function ($scope, $location) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var viewPath = '/' + $scope.data.id;
  var summaryPath = '/summary';
  var printPath = '/print';

  $scope.show = function () {
    var path = $location.path();

    if (path === viewPath) {
      $location.path(summaryPath);} else 
    if (path === summaryPath) {
      $location.path(viewPath);}};



  $scope.isExtended = function () {
    return _.contains([printPath, viewPath], $location.path());};


  $scope.isHidden = function () {
    return !_.contains([printPath, summaryPath, viewPath], $location.path());};


  $scope.getDate = function () {
    var start = months[$scope.data.start.month - 1] + ' ' + $scope.data.start.year;
    var end = $scope.data.end ? months[$scope.data.end.month - 1] + ' ' + $scope.data.end.year : 'Current';

    return start + ' - ' + end;};


  $scope.getShortYear = function () {
    return ('' + ($scope.data.end ? $scope.data.end.year : new Date().getFullYear())).slice(-2);};}]);
'use strict';angular.
module('cv').
service('CVData', function () {
  var _date = function _date(year, month) {
    return { year: year, month: month };};


  var _pad0 = function _pad0(num) {
    return ('0' + num).slice(-2);};


  this._add = function (position) {
    var end = position.end ? '' + position.end.year + _pad0(position.end.month) : 'current';
    position.id = '' + position.start.year + _pad0(position.start.month) + '-' + end;

    this.positions.push(position);};


  this.name = 'Jaco Greeff';
  this.position = 'Chief Technology Officer';
  this.positions = [];
  this.summary = 'Technology Executive, Strategist & Architect.\n\nFocused technical manager with architecture, project and operational experience over a wide range of industries and companies ranging from start-up to large corporates. 20-years of industry experience with a track record of leading effective global teams to deliver on company objectives.\n\n* Management experience in high-pressure environments across multiple countries, cultures and timezones\n* Experience in defining and delivering on strategies whilst prioritizing tactical solutions as necessary for maximum efficiency\n* A strong architecture and design background and application of technical problem-solving into the improvement of processes and systems';







  this._add({ 
    start: _date(2012, 10), 
    type: 'employed', 
    company: 'CQS Technology Holdings', 
    location: 'Johannesburg, ZA', 
    position: 'CTO', 
    level: 'executive', 
    description: '# Company\nCQS is a provider of products for Audit and Accounting practices, growing to capture a commanding 80% marketshare in certain product categories. In addition to selling and supporting the CaseWare suite of products, it builds custom templates on the various CaseWare platforms (both desktop and Cloud) and supplies a line of BackOffice products for the management of Secretarial and Tax processes.\n# Role\nAs CTO Jaco was tasked with a new initiative, CQS Cloud, to grow the use and distribution of the CaseWare Cloud and related products. Managed as a startup-within-CQS, the initiatives around building Cloud products, establishment of the Cloud team and infrastructure management forms part of the portfolio. The vision is to look forward and re-define not only the way of building products, but also the way the customers operate.' });





  this._add({ 
    start: _date(2011, 7), 
    end: _date(2012, 9), 
    type: 'founded', 
    company: 'Tabula', 
    location: 'Johannesburg, ZA', 
    position: 'CTO & Founder', 
    level: 'executive', 
    description: '# Company\nTabula was an early-stage technology company with a primary focus on developing a prediction platform for social person-to-person predictions. In addition the scalable real-time back-end platform (PaaS) was made available to other startups in the online nReduce incubator to speed up their initiatives.\n# Role\nAs CTO & Founder the responsibilities of company growth, financing, product development and driving a culture of taking responsibility for all areas were at the forefront.\n# Responsibilities\n* Defining the overall vision and roadmap for the products\n* Defining the product architectures and driving the implementation thereof with the development team in Ukraine\n* Engagement with angel-investors for financing, product feedback and monthly board reporting\n* Performing product marketing and liaison with other companies around the use of the real-time platform\n* Coordination of closed-beta teams (South Africa, USA & France)\n# Exit\nThe Company and the technology assets were aquired in Aug 2012. At this point the company has grown to an average of 25,000 DAU and the underlying technology platform was used by a further 4 startups. The company was staffed by a permanent team of 5 and a further compliment of 5 contracting resources.' });













  this._add({ 
    start: _date(2008, 9), 
    end: _date(2011, 6), 
    type: 'employed', 
    company: 'Cura Software Solutions', 
    location: 'Johannesburg, ZA & Hyderabad, IN', 
    position: 'CTO', 
    level: 'executive', 
    description: '# Company\nCura is a GRC (Governance, Risk & Compliance) company listed on the BSE (Mumbai). Rated by Gartner as one of the Visionaries in GRC, the company has grown from a South African software start-up to a global force with offices in Boston (Head Office), Johannesburg, London, Melbourne and Hyderabad.\n# Role\nInitially employed as Chief Architect (Sep 2008 - Sep 2009), Jaco was responsible for the critical design and implementation of the next generation product architecture. As CTO, he had the overall responsibility for product design and delivery, managing a global team between South Africa (established, 30 staff) & India (new, 100 staff).\n# Responsibilities\n* Feedback on technology matters & product progress as member of the Global EXCO (CEO, County MD’s & CTO) and MANCOs in South Africa and India\n* Board presentations on technology, inclusive of product strategy, roadmap and budget tracking\n* Management of the global R&D team across continents\n* Direct-line responsibility over technical middle-management, including Global Support Manager, Global Product Managers, Directors of Engineering (SA and India), Development Managers and Lead Architects\n* Final responsibility for Architecture, Product Management, Product Releases & Product Support for 300 global clients\n# Leaving\nAs a South African-based CTO for an Indian-owned company (Cura was founded in ZA, but sold to a IN company), the travel and focus overheads leads a large number of inefficiencies.' });













  this._add({ 
    start: _date(2007, 7), 
    end: _date(2008, 8), 
    type: 'founded', 
    company: 'Various', 
    location: 'Johannesburg, ZA', 
    position: 'Consultant', 
    level: 'management', 
    description: '# Company\nSelf-employed Architecture consultant, working with a number of clients from the immediate network.\n# Role\nConsulting to a variety of companies on architecture, implementation and product design. Skills such as evaluation, mentoring and technical design were heavily used for a number of successful implementations.\n# Clients\n* HealthBridge (Johannesburg, South Africa): Technical evaluation of Web 2.0 RIA technologies and definition of the solutions architecture; Mentoring of In-house Architect to take the solution forward\n* Discovery Health (Johannesburg, South Africa): Architecture evaluation for re-designed claims and payment consolidation systems\n* Infinite Illusions (Tallahassee, USA): Design of on-line store flow/checkout, video streaming (live web TV channels), forum and payment solutions\n* Private (Orlando, USA): Design and architecture definition for integrated inventory control mechanisms for Amazon listings\n# Leaving\nAs an single independent consultant, reach, impact and execution capabilities are limited to the number of available hours in each day. Change is faster and more impactful with a like-minded team.' });












  this._add({ 
    start: _date(2003, 4), 
    end: _date(2007, 6), 
    type: 'employed', 
    company: 'Discovery Health', 
    location: 'Johannesburg, ZA', 
    position: 'Senior Architect', 
    level: 'management', 
    description: '# Company\nDiscovery Health is South Africa’s largest medical insurance company with a history of innovative and disruptive products.\n# Role\nAs Senior Architect & Divisional Manager, Jaco was responsible for the overall architecture alignment and direction accross the Health System division, the company\'s flagship. With a wide variety of technologies, new as well as legacy systems, 14 teams with different short and medium term deliverables and high-volume transaction processing with direct impacts on the client-base, the role was critical to the overall success of the product suite.\n# Responsibilities\n* Representing Health Systems on the Health Claims Operations EXCO\n* Representing Architects on Health Systems MANCO and Program Management forums\n* Performance review and employment of 14 area-specific System Architects\n* Responsible for the overall systems architecture of all clinical systems inside Discovery (Claims Processing, Discovery Care, Electronic Transaction Management, New Business, Member Administration)\n* Work with the System Architects (area/system specific) to align the clinical architectures across Health Systems, including overall reviews and setting standards for the 120+ development team\n* Working with General Manager responsible for Business Architecture to define the overall Business Architecture strategy for Discovery Health\n# Leaving\nWhile the reach was immense and the impact directly beneficial to the lives of ordinary people, large companies and the slower speed was not 100% suitable.' });














  this._add({ 
    start: _date(1999, 4), 
    end: _date(2003, 3), 
    type: 'employed', 
    company: 'healthbridge', 
    location: 'Johannesburg, ZA', 
    position: 'Technical Manager', 
    level: 'management', 
    description: '# Company\nHealthBridge is an innovative transaction switch with a focus on the medical industry. Since it inception in 1999, the company has expanded into the TradeBridge group covering markets such as debt consolidation and mobile payments.\n# Responsibilities\n* Day-to-day management and mentoring of the development team\n* Setting up the development team, growing from 0 to 12\n* Management of 3rd party development (Internet Solutions & Dimension Data)\n* Management of the software budget in conjunction with the CIO\n* Representing HealthBridge on industry committees on transaction standards\n* Feedback on projects and software initiatives to HealthBridge MANCO' });










  this._add({ 
    start: _date(1998, 10), 
    end: _date(1999, 3), 
    type: 'employed', 
    company: 'Internet Solutions', 
    location: 'Johannesburg, ZA', 
    position: 'Senior Developer', 
    level: 'staff', 
    description: '# Company\nInternet Solution is a leading ISP in ZA. In addition to the traditional ISP business, they also did project-based work for clients with Internet deployments and website development.\n# Responsibilities\n* Team Lead for the Dimension Data Healthcare project\n* Design and development of a real-time messaging switch for the Dimension Data Healthcare initiative\n* Dimension Data Healthcare led to the formation of HealthBridge' });







  this._add({ 
    start: _date(1998, 1), 
    end: _date(1998, 10), 
    type: 'employed', 
    company: 'Crusader Systems', 
    location: 'Stellenbosch & Pretoria, ZA', 
    position: 'Developer', 
    level: 'staff', 
    description: '# Company\nCrusader System is an Artificial Intelligence consulting company with a large focus on process optimization in the mining industry.\n# Responsibilities\n* Development of the first-generation AI modeling tool, ModelGen\n* Consulting to Richard’s Bay Mineral and Karee Platinum mines on process optimization using the ModelGen toolset' });






  this._add({ 
    start: _date(1996, 1), 
    end: _date(1997, 12), 
    type: 'employed', 
    company: 'Grinaker Electronics', 
    location: 'Tokai, ZA', 
    position: 'Developer', 
    level: 'staff', 
    description: '# Company\nGrinaker Electronics is a project-based company in the commercial sector (vehicle tracking) along with the implementation of projects for defense agencies such as ARMSCOR.\n# Responsibilities\n* Development and maintenance of the G-Track vehicle tracking system\n* Development of a full ISO networking implementation (Physical to Application layers) for ARMSCOR as part of a new radio communications platform' });






  this._add({ 
    start: _date(1992, 1), 
    end: _date(1995, 12), 
    type: 'education', 
    company: 'University of Stellenbosch', 
    location: 'Stellenbosh, ZA', 
    position: 'B.Eng (Electronic)', 
    level: 'student' });});