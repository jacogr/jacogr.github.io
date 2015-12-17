angular
  .module('cv')
  .service('Data', function() {
    const _date = function(year, month) {
      return { year: year, month: month };
    };

    this.name = 'Jaco Greeff';
    this.position = 'Chief Technology Officer';
    this.summary = `Technology Executive, Strategist & Architect.

Focused technical manager with architecture, project and operational experience over a wide range of industries and companies ranging from start-up to large corporates. 20-years of industry experience with a track record of leading effective global teams to deliver on company objectives.

* Management experience in high-pressure environments across multiple countries, cultures and timezones
* Experience in defining and delivering on strategies whilst prioritizing tactical solutions as necessary for maximum efficiency
* A strong architecture and design background and application of technical problem-solving into the improvement of processes and systems`;

    this.positions = [
      {
        start: _date(2012, 10),
        type: 'employed',
        company: 'CQS Technology Holdings',
        location: 'Johannesburg, ZA',
        position: 'CTO',
        level: 'executive',
        description: `# Company
CQS is a provider of products for Audit and Accounting practices, growing to capture a commanding 80% marketshare in certain product categories. In addition to selling and supporting the CaseWare suite of products, it builds custom templates on the various CaseWare platforms (both desktop and Cloud) and supplies a line of BackOffice products for the management of Secretarial and Tax processes.

# Role
As CTO Jaco was tasked with a new initiative, CQS Cloud, to grow the use and distribution of the CaseWare Cloud and related products. Managed as a startup-within-CQS, the initiatives around building Cloud products, establishment of the Cloud team and infrastructure management forms part of the portfolio. The vision is to look forward and re-define not only the way of building products, but also the way the customers operate.`
      },
      {
        start: _date(2011, 7),
        end: _date(2012, 9),
        type: 'founded',
        company: 'Tabula',
        location: 'Johannesburg, ZA',
        position: 'CTO & Founder',
        level: 'executive',
        description: `# Company
Tabula was an early-stage technology company with a primary focus on developing a prediction platform for social person-to-person predictions. In addition the scalable real-time back-end platform (PaaS) was made available to other startups in the online nReduce incubator to speed up their initiatives.

# Role
As CTO & Founder the responsibilities of company growth, financing, product development and driving a culture of taking responsibility for all areas were at the forefront.

# Responsibilities
* Defining the overall vision and roadmap for the products
* Defining the product architectures and driving the implementation thereof with the development team in Ukraine
* Engagement with angel-investors for financing, product feedback and monthly board reporting
* Performing product marketing and liaison with other companies around the use of the real-time platform
* Coordination of closed-beta teams (South Africa, USA & France)

# Exit
The Company and the technology assets were aquired in Aug 2012. At this point the company has grown to an average of 25,000 DAU and the underlying technology platform was used by a further 4 startups. The company was staffed by a permanent team of 5 and a further compliment of 5 contracting resources.`
      },
      {
        start: _date(2008, 9),
        end: _date(2011, 6),
        type: 'employed',
        company: 'Cura Software Solutions',
        location: 'Johannesburg, ZA & Hyderabad, IN',
        position: 'CTO',
        level: 'executive',
        description: `# Company
Cura is a GRC (Governance, Risk & Compliance) company listed on the BSE (Mumbai). Rated by Gartner as one of the Visionaries in GRC, the company has grown from a South African software start-up to a global force with offices in Boston (Head Office), Johannesburg, London, Melbourne and Hyderabad.

# Role
Initially employed as Chief Architect (Sep 2008 - Sep 2009), Jaco was responsible for the critical design and implementation of the next generation product architecture. As CTO, he had the overall responsibility for product design and delivery, managing a global team between South Africa (established, 30 staff) & India (new, 100 staff).

# Responsibilities
* Feedback on technology matters & product progress as member of the Global EXCO (CEO, County MD’s & CTO) and MANCOs in South Africa and India
* Board presentations on technology, inclusive of product strategy, roadmap and budget tracking
* Management of the global R&D team across continents
* Direct-line responsibility over technical middle-management, including Global Support Manager, Global Product Managers, Directors of Engineering (SA and India), Development Managers and Lead Architects
* Final responsibility for Architecture, Product Management, Product Releases & Product Support for 300 global clients

# Leaving
As a South African-based CTO for an Indian-owned company (Cura was founded in ZA, but sold to a IN company), the travel and focus overheads leads a large number of inefficiencies.`
      },
      {
        start: _date(2007, 7),
        end: _date(2008, 8),
        type: 'founded',
        company: 'Various',
        location: 'Johannesburg, ZA',
        position: 'Consultant',
        level: 'management',
        description: `# Company
Self-employed Architecture consultant, working with a number of clients from the immediate network.

# Role
Consulting to a variety of companies on architecture, implementation and product design. Skills such as evaluation, mentoring and technical design were heavily used for a number of successful implementations.

# Clients
* HealthBridge (Johannesburg, South Africa): Technical evaluation of Web 2.0 RIA technologies and definition of the solutions architecture; Mentoring of In-house Architect to take the solution forward
* Discovery Health (Johannesburg, South Africa): Architecture evaluation for re-designed claims and payment consolidation systems
* Infinite Illusions (Tallahassee, USA): Design of on-line store flow/checkout, video streaming (live web TV channels), forum and payment solutions
* Private (Orlando, USA): Design and architecture definition for integrated inventory control mechanisms for Amazon listings`
      },
      {
        start: _date(2003, 4),
        end: _date(2007, 6),
        type: 'employed',
        company: 'Discovery Health',
        location: 'Johannesburg, ZA',
        position: 'Senior Architect',
        level: 'management',
        description: `# Company
Discovery Health is South Africa’s largest medical insurance company with a history of innovative and disruptive products.

# Responsibilities
* Representing Health Systems on the Health Claims Operations EXCO
* Representing Architects on Health Systems MANCO and Program Management forums
* Performance review and employment of 14 area-specific System Architects
* Responsible for the overall systems architecture of all clinical systems inside Discovery (Claims Processing, Discovery Care, Electronic Transaction Management, New Business, Member Administration)
* Work with the System Architects (area/system specific) to align the clinical architectures across Health Systems, including overall reviews and setting standards for the 120+ development team
* Working with General Manager responsible for Business Architecture to define the overall Business Architecture strategy for Discovery Health`
      },
      {
        start: _date(1999, 4),
        end: _date(2003, 3),
        type: 'employed',
        company: 'healthbridge',
        location: 'Johannesburg, ZA',
        position: 'Technical Manager',
        level: 'management',
        description: `# Company
HealthBridge is an innovative transaction switch with a focus on the medical industry. Since it inception in 1999, the company has expanded into the TradeBridge group covering markets such as debt consolidation and mobile payments.

# Responsibilities
* Day-to-day management and mentoring of the development team
* Setting up the development team, growing from 0 to 12
* Management of 3rd party development (Internet Solutions & Dimension Data)
* Management of the software budget in conjunction with the CIO
* Representing HealthBridge on industry committees on transaction standards
* Feedback on projects and software initiatives to HealthBridge MANCO`
      },
      {
        start: _date(1998, 10),
        end: _date(1999, 3),
        type: 'employed',
        company: 'Internet Solutions',
        location: 'Johannesburg, ZA',
        position: 'Senior Developer',
        level: 'staff',
        description: `# Company
Internet Solution is a leading ISP in ZA. In addition to the traditional ISP business, they also did project-based work for clients with Internet deployments and website development.

# Responsibilities
* Team Lead for the Dimension Data Healthcare project
* Design and development of a real-time messaging switch for the Dimension Data Healthcare initiative
* Dimension Data Healthcare led to the formation of HealthBridge`
      },
      {
        start: _date(1998, 1),
        end: _date(1998, 10),
        type: 'employed',
        company: 'Crusader Systems',
        location: 'Stellenbosch & Pretoria, ZA',
        position: 'Developer',
        level: 'staff',
        description: `# Company
Crusader System is an Artificial Intelligence consulting company with a large focus on process optimization in the mining industry.

# Responsibilities
* Development of the first-generation AI modeling tool, ModelGen
* Consulting to Richard’s Bay Mineral and Karee Platinum mines on process optimization using the ModelGen toolset`
      },
      {
        start: _date(1996, 1),
        end: _date(1997, 12),
        type: 'employed',
        company: 'Grinaker Electronics',
        location: 'Tokai, ZA',
        position: 'Developer',
        level: 'staff',
        description: `# Company
Grinaker Electronics is a project-based company in the commercial sector (vehicle tracking) along with the implementation of projects for defense agencies such as ARMSCOR.

# Responsibilities
* Development and maintenance of the G-Track vehicle tracking system
* Development of a full ISO networking implementation (Physical to Application layers) for ARMSCOR as part of a new radio communications platform`
      },
      {
        start: _date(1992, 1),
        end: _date(1995, 12),
        type: 'education',
        company: 'University of Stellenbosch',
        location: 'Stellenbosh, ZA',
        position: 'B.Eng (Electronic)',
        level: 'student'
      }
    ];
  });
