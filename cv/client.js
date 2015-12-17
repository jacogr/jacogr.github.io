'use strict';angular.
module('cv', ['ngSanitize']).
config(["$locationProvider", function ($locationProvider) {
  $locationProvider.html5Mode(false);}]);
'use strict';angular.
module('cv').
controller('cvController', ["Data", function (Data) {
  this.positions = Data.cv;
  this.entry = undefined;

  this.show = function (entry) {
    this.entry = entry !== this.entry ? entry : undefined;};


  this.getClass = function (entry) {
    return '' + entry.type;};


  this.getDate = function (entry) {
    var start = this.months[entry.start.month - 1] + ' ' + entry.start.year;
    var end = 'Current';

    if (entry.end) {
      end = this.months[entry.end.month - 1] + ' ' + entry.end.year;}


    return start + ' - ' + end;};


  this._initRange = function () {var _this = this;
    var now = new Date();

    this.currentYear = now.getFullYear();
    this.currentMonth = now.getMonth() + 1;

    this.startYear = now.getFullYear() + 1;
    this.startMonth = 13;

    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    _.each(Data.cv, function (entry) {
      if (entry.start.year < _this.startYear) {
        _this.startYear = entry.start.year;
        _this.startMonth = entry.start.month;} else 
      if (entry.start.month <= _this.startMonth) {
        _this.startMonth = entry.start.Month;}});



    this.years = _.range(this.currentYear, this.startYear - 1, -1);};


  this._initRange();}]);
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
service('Data', function () {
  this.cv = [
  { 
    start: { year: 2012, month: 10 }, 
    type: 'employed', 
    company: 'CQS Technology Holdings', 
    location: 'Johannesburg, ZA', 
    position: 'CTO', 
    level: 'executive' }, 

  { 
    start: { year: 2011, month: 7 }, 
    end: { year: 2012, month: 9 }, 
    type: 'founded', 
    company: 'Tabula', 
    location: 'Johannesburg, ZA', 
    position: 'CTO & Founder', 
    level: 'executive' }, 

  { 
    start: { year: 2008, month: 9 }, 
    end: { year: 2011, month: 6 }, 
    type: 'employed', 
    company: 'Cura Software Solutions', 
    location: 'Johannesburg, ZA & Hyderabad, IN', 
    position: 'CTO', 
    level: 'executive' }, 

  { 
    start: { year: 2007, month: 7 }, 
    end: { year: 2008, month: 8 }, 
    type: 'founded', 
    company: 'Various', 
    location: 'Johannesburg, ZA', 
    position: 'Consultant', 
    level: 'management' }, 

  { 
    start: { year: 2003, month: 4 }, 
    end: { year: 2007, month: 6 }, 
    type: 'employed', 
    company: 'Discovery Health', 
    location: 'Johannesburg, ZA', 
    position: 'Senior Architect', 
    level: 'management' }, 

  { 
    start: { year: 1999, month: 4 }, 
    end: { year: 2003, month: 3 }, 
    type: 'employed', 
    company: 'healthbridge', 
    location: 'Johannesburg, ZA', 
    position: 'Technical Manager', 
    level: 'management' }, 

  { 
    start: { year: 1998, month: 10 }, 
    end: { year: 1999, month: 3 }, 
    type: 'employed', 
    company: 'Internet Solutions', 
    location: 'Johannesburg, ZA', 
    position: 'Senior Developer', 
    level: 'staff', 
    description: 'Internet Solution is a leading ISP in ZA. In addition to the traditional ISP business, they also did project-based work for clients with Internet deployments and website development.\n* Team Lead for the Dimension Data Healthcare project\n* Design and development of a real-time messaging switch for the Dimension Data Healthcare initiative\n* Dimension Data Healthcare led to the formation of HealthBridge' }, 




  { 
    start: { year: 1998, month: 1 }, 
    end: { year: 1998, month: 10 }, 
    type: 'employed', 
    company: 'Crusader Systems', 
    location: 'Stellenbosch & Pretoria, ZA', 
    position: 'Developer', 
    level: 'staff', 
    description: 'Crusader System is an Artificial Intelligence consulting company with a large focus on process optimization in the mining industry.\n* Development of the first-generation AI modeling tool, ModelGen\n* Consulting to Richard’s Bay Mineral and Karee Platinum mines on process optimization using the ModelGen toolset' }, 



  { 
    start: { year: 1996, month: 1 }, 
    end: { year: 1997, month: 12 }, 
    type: 'employed', 
    company: 'Grinaker Electronics', 
    location: 'Tokai, ZA', 
    position: 'Developer', 
    level: 'staff', 
    description: 'Grinaker Electronics is a project-based company in the commercial sector (vehicle tracking) along with the implementation of projects for defense agencies such as ARMSCOR.\n* Development and maintenance of the G-Track vehicle tracking system\n* Development of a full ISO networking implementation (Physical to Application layers) for ARMSCOR as part of a new radio communications platform' }, 



  { 
    start: { year: 1992, month: 1 }, 
    end: { year: 1995, month: 12 }, 
    type: 'education', 
    company: 'University of Stellenbosch', 
    location: 'Stellenbosh, ZA', 
    position: 'B.Eng (Electronic)', 
    level: 'student' }];});