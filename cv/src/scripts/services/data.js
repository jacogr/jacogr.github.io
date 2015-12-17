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
        level: 'executive',
        description: `CQS is a provider of products for Audit and Accounting practices, growing to capture a commanding 80% marketshare in certain product categories. In addition to selling and supporting the CaseWare suite of products, it builds custom templates on the various CaseWare platforms (both desktop and Cloud) and supplies a line of BackOffice products for the management of Secretarial and Tax processes.

As CTO Jaco was tasked with a new initiative to grow the use and distribution of the CaseWare Cloud platform. Managed as a startup-within-CQS initiatives around building Cloud products, establishment of the Cloud team and infrastructure management forms part of the portfolio. The vision is to look forward and re-define not only the way of building products, but also the way the customers operate.`
      },
      {
        start: { year: 2011, month: 7 },
        end: { year: 2012, month: 9 },
        type: 'founded',
        company: 'Tabula',
        location: 'Johannesburg, ZA',
        position: 'CTO & Founder',
        level: 'executive',
        description: `Tabula is a early-stage technology company with a primary focus on developing a prediction platform for social person-to-person predictions. In addition the scalable real-time back-end platform (PaaS) was made available to other startups in the online nReduce incubator to speed up their initiatives.

As CTO & Founder the responsibilities of company growth, financing, product development and driving a culture of taking responsibility for all areas were at the forefront. The Company and the technology assets were aquired in Aug 2012, after growing to an average of 25,000 DAU managed by a permanent team of 5 staff members and a further compliment of 5 contracting resources.

* Defining the overall vision and roadmap for the products
* Defining the product architectures and driving the implementation thereof with the development team in Ukraine
* Engagement with angel-investors for financing, product feedback nd monthly board reporting
* Performing product marketing and liaison with other companies around the use of the real-time platform
* Coordination of closed-beta teams (South Africa, USA & France)`
      },
      {
        start: { year: 2008, month: 9 },
        end: { year: 2011, month: 6 },
        type: 'employed',
        company: 'Cura Software Solutions',
        location: 'Johannesburg, ZA & Hyderabad, IN',
        position: 'CTO',
        level: 'executive',
        description: `Cura is a GRC (Governance, Risk & Compliance) company listed on the BSE (Mumbai). Rated by Gartner as one of the Visionaries in GRC, the company has grown from a South African software start-up to a global force with offices in Boston (Head Office), Johannesburg, London, Melbourne and Hyderabad.

Initially employed as Chief Architect (Sep 2008 - Sep 2009), Jaco was responsible for the critical design and implementation of the next generation product architecture. As CTO, he had the overall responsibility for product design and delivery, managing a global team between South Africa (established, 30 staff) & India (new, 100 staff).

* Member of the Global EXCO (CEO, EVP, County MD’s & CTO) and MANCOs in South Africa and India, reporting on technology matters
* Board presentations on technology, inclusive of product strategy, roadmap and budget tracking
* Management of the global R&D team across continents
* Direct-line responsibility over technical middle-management, including Global Support Manager, Global Product Managers, Directors of Engineering (SA and India), Development Managers and Lead Architects
* Final responsibility for Architecture, Product Management, Product Releases & Product Support for 300 global clients`
      },
      {
        start: { year: 2007, month: 7 },
        end: { year: 2008, month: 8 },
        type: 'founded',
        company: 'Various',
        location: 'Johannesburg, ZA',
        position: 'Consultant',
        level: 'management',
        description: `Consulting to various companies on architecture and implementations. Clients and projects include:

* HealthBridge (Johannesburg, South Africa): Technical evaluation of Web 2.0 RIA technologies and definition of the solutions architecture; Mentoring of In-house Architect to take the solution forward
* Discovery Health (Johannesburg, South Africa): Architecture evaluation for re-designed claims and payment consolidation systems
* Infinite Illusions (Tallahassee, USA): Design of on-line store flow/checkout, video streaming (live web TV channels), forum and payment solutions
* Private (Orlando, USA): Design and architecture definition for integrated inventory control mechanisms for Amazon listings`
      },
      {
        start: { year: 2003, month: 4 },
        end: { year: 2007, month: 6 },
        type: 'employed',
        company: 'Discovery Health',
        location: 'Johannesburg, ZA',
        position: 'Senior Architect',
        level: 'management',
        description: `Discovery Health is South Africa’s largest medical insurance company with a history of innovative and disruptive products.

* Representing Health Systems on the Health Claims Operations EXCO
* Representing Architects on Health Systems MANCO and Program Management forums
* Performance review and employment of 14 area-specific System Architects
* Responsible for the overall systems architecture of all clinical systems inside Discovery (Claims Processing, Discovery Care, Electronic Transaction Management, New Business, Member Administration)
* Work with the System Architects (area/system specific) to align the clinical architectures across Health Systems, including overall reviews and setting standards for the 120+ development team
* Working with General Manager responsible for Business Architecture to define the overall Business Architecture strategy for Discovery Health`
      },
      {
        start: { year: 1999, month: 4 },
        end: { year: 2003, month: 3 },
        type: 'employed',
        company: 'healthbridge',
        location: 'Johannesburg, ZA',
        position: 'Technical Manager',
        level: 'management',
        description: `HealthBridge is an innovative transaction switch with a focus on the medical industry. Since it inception in 1999, the company has expanded into the TradeBridge group covering markets such as debt consolidation and mobile payments.

* Day-to-day management and mentoring of the development team
* Setting up the development team, growing from 0 to 12
* Management of 3rd party development (Internet Solutions & Dimension Data)
* Management of the software budget in conjunction with the CIO
* Representing HealthBridge on industry committees on transaction standards
* Feedback on projects and software initiatives to HealthBridge MANCO`
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
