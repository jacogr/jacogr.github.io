angular
  .module('cv')
  .service('Data', function() {
    this.cv = [
      {
        start: { year: 2012, month: 10 },
        type: 'employed',
        company: 'CQS Technology Holdings',
        location: 'Johannesburg, ZA',
        position: 'CTO',
        level: 'executive'
      },
      {
        start: { year: 2011, month: 7 },
        end: { year: 2012, month: 9 },
        type: 'founded',
        company: 'Tabula',
        location: 'Johannesburg, ZA',
        position: 'CTO & Founder',
        level: 'executive'
      },
      {
        start: { year: 2008, month: 9 },
        end: { year: 2011, month: 6 },
        type: 'employed',
        company: 'Cura Software Solutions',
        location: 'Johannesburg, ZA & Hyderabad, IN',
        position: 'CTO',
        level: 'executive'
      },
      {
        start: { year: 2007, month: 7 },
        end: { year: 2008, month: 8 },
        type: 'founded',
        company: 'Various',
        location: 'Johannesburg, ZA',
        position: 'Consultant',
        level: 'management'
      },
      {
        start: { year: 2003, month: 4 },
        end: { year: 2007, month: 6 },
        type: 'employed',
        company: 'Discovery Health',
        location: 'Johannesburg, ZA',
        position: 'Senior Architect',
        level: 'management'
      },
      {
        start: { year: 1999, month: 4 },
        end: { year: 2003, month: 3 },
        type: 'employed',
        company: 'healthbridge',
        location: 'Johannesburg, ZA',
        position: 'Technical Manager',
        level: 'management'
      },
      {
        start: { year: 1998, month: 10 },
        end: { year: 1999, month: 3 },
        type: 'employed',
        company: 'Internet Solutions',
        location: 'Johannesburg, ZA',
        position: 'Senior Developer',
        level: 'staff',
        description: `Internet Solution is a leading ISP in ZA. In addition to the traditional ISP business, they also did project-based work for clients with Internet deployments and website development.
* Team Lead for the Dimension Data Healthcare project
* Design and development of a real-time messaging switch for the Dimension Data Healthcare initiative
* Dimension Data Healthcare led to the formation of HealthBridge`
      },
      {
        start: { year: 1998, month: 1 },
        end: { year: 1998, month: 10 },
        type: 'employed',
        company: 'Crusader Systems',
        location: 'Stellenbosch & Pretoria, ZA',
        position: 'Developer',
        level: 'staff',
        description: `Crusader System is an Artificial Intelligence consulting company with a large focus on process optimization in the mining industry.
* Development of the first-generation AI modeling tool, ModelGen
* Consulting to Richard’s Bay Mineral and Karee Platinum mines on process optimization using the ModelGen toolset`
      },
      {
        start: { year: 1996, month: 1 },
        end: { year: 1997, month: 12 },
        type: 'employed',
        company: 'Grinaker Electronics',
        location: 'Tokai, ZA',
        position: 'Developer',
        level: 'staff',
        description: `Grinaker Electronics is a project-based company in the commercial sector (vehicle tracking) along with the implementation of projects for defense agencies such as ARMSCOR.
* Development and maintenance of the G-Track vehicle tracking system
* Development of a full ISO networking implementation (Physical to Application layers) for ARMSCOR as part of a new radio communications platform`
      },
      {
        start: { year: 1992, month: 1 },
        end: { year: 1995, month: 12 },
        type: 'education',
        company: 'University of Stellenbosch',
        location: 'Stellenbosh, ZA',
        position: 'B.Eng (Electronic)',
        level: 'student'
      }
    ];
  });
