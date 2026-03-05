// data/services.ts
export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  color: string;
  faqs: FAQ[];
}

export const services: Service[] = [
  {
    id: 'electric-sliding',
    title: 'Electric Sliding Gates',
    slug: 'electric-sliding-gates',
    description: 'The practical choice for driveways where swing clearance is limited. Sliding gates run on a ground track or cantilever system and handle wide openings that swing gates cannot cover.',
    image: '/images/gates/gate-aluminium-sliding-modern-dark-brick.png',
    icon: 'Zap',
    color: 'slate',
    faqs: [
      {
        question: 'How much run-back space does a sliding gate need?',
        answer: 'The gate needs to retract fully to one side of the opening, so you need a clear run of wall or fence at least as wide as the gate itself, plus around 500mm for the motor housing and end stop. A 4-metre gate needs roughly 4.5 metres of unobstructed boundary to one side. Where that space is not available, a cantilever system can eliminate the ground track entirely and reduce the run-back requirement. Your installer will assess both options during the site survey.',
      },
      {
        question: 'Can a sliding gate be installed on a sloped driveway in Surrey?',
        answer: 'Yes, though it requires more planning than a flat site. The track itself must be level regardless of the gradient, which means the installer needs to build up the track bed on a slope or opt for a cantilever system that clears the ground entirely. Both solutions are well-established and widely used across Surrey, particularly on the hilly ground around Epping and Loughton. Bring photographs of your driveway to the site survey so the installer can assess the gradient before visiting.',
      },
      {
        question: 'How long does a sliding gate installation take in Surrey?',
        answer: 'A standard residential sliding gate installation takes 3 to 4 days. Day one is groundwork: excavating for the track foundation, laying the concrete base, and running electrical conduit for the motor supply. Day two is the track installation and gate hanging. Day three covers motor mounting, safety sensor installation, and wiring. The final day handles commissioning, remote programming, intercom setup if included, and handover. Larger or more complex installations may run to 5 days.',
      },
    ],
  },
  {
    id: 'electric-swing',
    title: 'Electric Swing Gates',
    slug: 'electric-swing-gates',
    description: 'The most widely installed gate type across Surrey. A single or double leaf gate powered by underground or ram-arm motors, combining a traditional appearance with modern automated convenience.',
    image: '/images/gates/gate-aluminium-swing-open-luxury-garden.png',
    icon: 'Shield',
    color: 'emerald',
    faqs: [
      {
        question: 'Should electric swing gates open inward or outward?',
        answer: 'Inward is the standard and, in most cases, the only permitted option. UK highway regulations prohibit gates from opening over a public footpath or road, which rules out outward-opening designs for most residential properties. The exception is where the driveway slopes steeply downward from the road toward the house, making inward opening mechanically difficult. In those cases, installers typically use articulated hinge systems or higher-torque underground motors to manage the gradient rather than reversing the opening direction.',
      },
      {
        question: 'What is the right width for electric swing gates?',
        answer: 'The gate opening should match your actual traffic requirement, not just the width of the gap. A single car requires a minimum clear opening of 2.7 metres; two cars passing comfortably need at least 5 metres. Most residential driveways in Surrey fall between 3 and 4 metres, which works well with a standard double gate split into two equal leaves. If the opening is wider than 5 metres, your installer will likely recommend sliding as a more structurally sound option, as very wide swing leaves put significant stress on the post foundations and motors.',
      },
      {
        question: 'Do electric swing gates require planning permission in Surrey?',
        answer: 'In the majority of cases, no. Permitted development rights cover gates up to 2 metres in height that open inward and are not adjacent to a classified road. The limit drops to 1 metre for gates that front a highway. Listed buildings and conservation area properties require consent regardless of height, and several Surrey districts, including Epping Forest and parts of Colchester, have additional local conditions that apply in designated areas. Your installer will confirm the position at the site survey stage.',
      },
    ],
  },
  {
    id: 'wooden-gates',
    title: 'Wooden Driveway Gates',
    slug: 'wooden-driveway-gates',
    description: 'Bespoke hardwood gates crafted to specification in iroko, European oak, or Accoya. The natural choice for period properties, barn conversions, and rural Surrey homes where character matters as much as security.',
    image: '/images/gates/gate-wooden-oak-swing-cottage-garden.png',
    icon: 'Sparkles',
    color: 'amber',
    faqs: [
      {
        question: 'How long do hardwood driveway gates last in Surrey?',
        answer: 'A properly specified and maintained hardwood gate will outlast almost any other material. Iroko, the most widely used species for Surrey residential gates, has a natural oil content that resists moisture absorption and resists warping through damp winters and dry summers. With an oil treatment every two years, an iroko gate will remain structurally sound and presentable for 25 to 30 years. European oak performs similarly and weathers to an attractive silver-grey if left untreated. Accoya, a modified radiata pine with a 50-year above-ground durability guarantee, is the low-maintenance premium option.',
      },
      {
        question: 'Can hardwood gates be automated?',
        answer: 'Yes, and the combination works well. Hardwood gates are heavier than aluminium equivalents, so the motor selection is important. A well-specified underground swing motor or heavy-duty ram-arm system handles even large iroko or oak gates without difficulty. The installer needs the approximate weight and dimensions of the gate before specifying the motor, which is why the timber species and panel design are confirmed before any automation equipment is ordered. Gate and motor are matched to each other, not selected independently.',
      },
      {
        question: 'Which timber species works best for Surrey weather conditions?',
        answer: 'Iroko is the most reliable all-round choice for Surrey. It is naturally durable to Use Class 3 without treatment, resists surface checking in hot dry summers, and holds its shape through the damp winters typical of East Anglia. European oak is equally durable and preferred where the grain and character of the timber are a design priority. Western red cedar is a lighter option suited to smaller gates or slatted contemporary designs. Accoya is the right choice for homeowners who want a documented 50-year lifespan with minimal annual maintenance, particularly on coastal Surrey properties where the salt-laden air accelerates weathering.',
      },
    ],
  },
  {
    id: 'metal-gates',
    title: 'Metal Driveway Gates',
    slug: 'metal-driveway-gates',
    description: 'Fabricated steel, aluminium, and wrought iron gates built to last. From hand-forged ornate ironwork on Surrey estate properties to precision-cut contemporary aluminium on modern builds.',
    image: '/images/gates/gate-wrought-iron-ornate-daytime-manor.png',
    icon: 'Globe',
    color: 'sky',
    faqs: [
      {
        question: 'What is the practical difference between steel, aluminium, and wrought iron gates?',
        answer: 'Mild steel is the standard fabrication material for bespoke gates in Surrey. It is strong, weldable into any profile, and takes a hot-dip galvanised and powder-coated finish that protects against rust for 20 years or more. Aluminium is lighter than steel, will not rust under any conditions, and is the preferred choice for very wide gates or heavy automation where reducing the moving weight extends motor life. Wrought iron is a specialist material, hand-forged by blacksmiths rather than fabricated, and is used almost exclusively on high-value period properties where the authentic texture and character of the material justify the additional cost. The three are not interchangeable on appearance grounds.',
      },
      {
        question: 'Do metal gates rust in coastal Surrey locations?',
        answer: 'Untreated steel and iron will rust in any Surrey location, but the risk is significantly higher within a few kilometres of the coast, where salt-laden air accelerates corrosion. The correct specification for coastal properties is hot-dip galvanising before powder coating, which encases the steel in zinc and then a polymer finish to protect it from the marine environment. This two-stage process gives a minimum service life of 20 years even in exposed coastal locations. Aluminium is the sensible alternative where longevity with zero rust risk is the priority, as it forms a stable oxide layer that protects the metal without any additional treatment.',
      },
      {
        question: 'Can I commission a bespoke design for a metal gate in Surrey?',
        answer: 'Yes. Bespoke fabrication is standard practice for metal gates, and the majority of installations in our Surrey network involve a custom design rather than an off-the-shelf product. Installers work with specialist fabricators who can produce anything from a straightforward horizontal-bar contemporary gate to an ornate estate gate with scrollwork, a family crest, and gilded finials. Most fabricators provide detailed CAD drawings and, for larger projects, 3D renders showing the gate in position on your property. The design and approval process typically adds 2 to 4 weeks before fabrication begins.',
      },
    ],
  },
  {
    id: 'automated-systems',
    title: 'Automated Gate Systems',
    slug: 'automated-gate-systems',
    description: 'Complete automation packages for new and existing gates. Motors, safety systems, video intercom, keypad and proximity access, smart home integration, and battery backup as standard.',
    image: '/images/gates/gate-automation-intercom-evening-lighting.png',
    icon: 'Medal',
    color: 'indigo',
    faqs: [
      {
        question: 'Can my existing gates be automated?',
        answer: 'In most cases, yes, provided the gates are structurally sound and properly hung on posts that are set in adequate foundations. The installer will assess gate weight, hinge condition, post alignment, and available power supply during the site visit. Common issues that need addressing before automation are sagging hinges, posts that have moved slightly over time, and gates that are heavier than the proposed motor is rated for. All of these are straightforward to resolve. The one situation where automation is not cost-effective is where the gate itself is in poor condition and would need to be replaced anyway, in which case a new gate and motor package is a better investment.',
      },
      {
        question: 'What happens to automated gates when the power goes off?',
        answer: 'Every properly installed automated gate system includes a manual release mechanism that allows the gate to be opened and closed by hand without power. In addition, most modern motor control boards accept a battery backup module that maintains automatic operation for 20 to 50 full cycles after the mains supply fails. For properties in rural Surrey where power outages are more frequent, a solar panel connected to a dedicated battery bank can keep the system running indefinitely without any reliance on the mains. Your installer will recommend the appropriate backup specification based on your location and usage pattern.',
      },
      {
        question: 'Can I operate my gates from a smartphone?',
        answer: 'Yes. GSM and Wi-Fi modules are available for most gate motor brands and allow you to open, close, and monitor your gates from anywhere with a mobile signal. You can grant temporary access to specific numbers, receive push notifications when the gate is operated, and integrate the gate into smart home platforms including Google Home, Amazon Alexa, and Apple HomeKit. Video intercom systems with IP cameras give you a live view of the gate entrance on your phone before deciding whether to grant access. The technology is reliable and straightforward, and your installer will configure the app and test the remote access before handover.',
      },
    ],
  },
  {
    id: 'gate-repair',
    title: 'Gate Repair and Maintenance',
    slug: 'gate-repair-and-maintenance',
    description: 'Diagnostic callouts, motor replacement, hinge realignment, safety sensor calibration, and annual service contracts across Surrey. Most faults resolved on the first visit.',
    image: '/images/gates/gate-wrought-iron-open-misty-morning-manor.png',
    icon: 'Users',
    color: 'rose',
    faqs: [
      {
        question: 'How often should electric driveway gates be serviced?',
        answer: 'Once a year is the minimum for any automated gate system. A full service covers motor lubrication, gearbox inspection, drive belt or rack-and-pinion condition, hinge torque, safety sensor alignment and sensitivity testing, battery backup charge level, intercom function, and a visual inspection of the gate structure, posts, and finish. Annual servicing typically costs £120 to £200 in Surrey and will extend the working life of the motor by several years. It also keeps the manufacturer warranty valid on systems still within the warranty period.',
      },
      {
        question: 'My gate is making a grinding or scraping noise. What is causing it?',
        answer: 'A grinding noise on a sliding gate is almost always debris in the track, a worn drive pinion, or a roller that has seized. On a swing gate, grinding usually points to a dry hinge, a worn motor gearbox, or a gate that has dropped slightly and is scraping the ground or pillar face. In both cases, stop using the gate on auto mode until an engineer has inspected it. Continuing to run a gate with a mechanical fault accelerates wear and can turn a minor repair into a motor replacement. Switch to manual mode using the release key and book a callout.',
      },
      {
        question: 'How much does a gate repair callout cost in Surrey?',
        answer: 'Surrey gate engineers typically charge a callout and diagnostic fee of £80 to £150, which covers the visit and a full assessment of the fault. Labour and parts are additional. Most common repairs, including motor replacement, photocell realignment, control board replacement, and hinge adjustment, come to between £200 and £600 all in on a single visit. Engineers in our network carry the most common spare parts for FAAC, BFT, CAME, Nice, and Beninca systems on the van, which means the majority of faults are resolved the same day without a return visit.',
      },
    ],
  },
];

export const getAllServiceSlugs = (): string[] => services.map(s => s.slug);
export const getServiceBySlug = (slug: string): Service | undefined => services.find(s => s.slug === slug);
