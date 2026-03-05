// data/pricing.ts — Driveway Gates Surrey

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const PRICING: Record<string, PricingTier[]> = {
  'electric-sliding': [
    {
      name: 'Standard',
      price: 'From £5,000',
      description: 'Single-leaf aluminium or steel sliding gate on a flat site with standard run-back, rack-and-pinion motor, safety photocells, and two remote handsets.',
      features: [
        'Aluminium or galvanised steel gate leaf',
        'Ground-track foundation included',
        'Branded motor (FAAC, BFT, or CAME)',
        'BS EN 12453 safety commissioning',
        'Two remote handsets',
        'Written warranty on gate and motor',
      ],
    },
    {
      name: 'Mid-Range',
      price: 'From £7,500',
      description: 'Bespoke fabricated gate with powder coat, cantilever or biparting option, video intercom, and keypad access.',
      features: [
        'Bespoke steel gate with hot-dip galvanising',
        'Full RAL powder coat colour choice',
        'Video intercom with smartphone access',
        'Keypad entry',
        'Safety edges and photocells',
        'Five-year gate and motor warranty',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      price: 'From £11,000',
      description: 'High-specification bespoke gate in wrought iron or custom fabricated steel, full access management, and smart home integration.',
      features: [
        'Wrought iron or bespoke fabricated steel',
        'HD video intercom with app control',
        'Proximity reader and keypad',
        'Smart home integration',
        'Brick or stone pier work available',
        'Ten-year structural warranty',
      ],
    },
  ],
  'electric-swing': [
    {
      name: 'Standard',
      price: 'From £4,000',
      description: 'Pair of steel or aluminium swing gates with ram-arm motors, safety photocells, and two remote handsets on a standard flat driveway.',
      features: [
        'Steel or aluminium gate pair',
        'Ram-arm motors (FAAC, BFT, or CAME)',
        'Safety photocells included',
        'BS EN 12453 commissioning',
        'Two remote handsets',
        'Written warranty',
      ],
    },
    {
      name: 'Mid-Range',
      price: 'From £6,500',
      description: 'Bespoke gate pair with underground motors, video intercom, and smart access.',
      features: [
        'Bespoke fabricated steel gates',
        'Hot-dip galvanising and powder coat',
        'Underground motors for clean appearance',
        'Video intercom with smartphone control',
        'Keypad or proximity access',
        'Five-year comprehensive warranty',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      price: 'From £9,500',
      description: 'Hand-forged wrought iron or bespoke estate gates with full access management, piers, and smart home integration.',
      features: [
        'Wrought iron or high-spec fabricated steel',
        'Underground motors concealed in piers',
        'HD video intercom and app control',
        'Brick or stone pier construction',
        'Proximity readers and smart integration',
        'Ten-year structural warranty',
      ],
    },
  ],
  'wooden-driveway': [
    {
      name: 'Standard',
      price: 'From £3,000',
      description: 'Hardwood iroko or oak swing gate pair with galvanised ironmongery, manual operation.',
      features: [
        'Iroko or European oak construction',
        'Galvanised ironmongery throughout',
        'Standard frame and ledge design',
        'FSC-certified timber available',
        'Initial oil treatment included',
        'Five-year structural warranty',
      ],
    },
    {
      name: 'Mid-Range',
      price: 'From £5,500',
      description: 'Bespoke hardwood gates with automation, video intercom, and designer detailing.',
      features: [
        'Bespoke iroko, oak, or Accoya design',
        'Automation with quality branded motor',
        'Video intercom included',
        'Arched top rail or decorative features',
        'Full BS EN 12453 commissioning',
        'Ten-year timber and motor warranty',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      price: 'From £8,000',
      description: 'Accoya or premium hardwood with full automation, matching side gates, and full access management.',
      features: [
        'Accoya with 25-year durability guarantee',
        'Matching side gate or fence panels',
        'Underground motors',
        'HD video intercom and app control',
        'Bespoke detailing to brief',
        'Fifteen-year comprehensive warranty',
      ],
    },
  ],
  'metal-driveway': [
    {
      name: 'Standard',
      price: 'From £3,200',
      description: 'Fabricated mild steel gate pair, hot-dip galvanised and powder coated, with basic automation.',
      features: [
        'Mild steel fabrication',
        'Hot-dip galvanising before powder coat',
        'Full RAL colour range',
        'Ram-arm or underground motors',
        'Safety photocells included',
        'Five-year structural warranty',
      ],
    },
    {
      name: 'Mid-Range',
      price: 'From £6,000',
      description: 'Bespoke design with laser-cut detailing, underground motors, and video intercom.',
      features: [
        'Bespoke fabricated steel with laser cutting',
        'Hot-dip galvanising and premium powder coat',
        'Underground motors for clean finish',
        'Video intercom with app control',
        'Proximity or keypad access',
        'Ten-year structural warranty',
      ],
      popular: true,
    },
    {
      name: 'Premium',
      price: 'From £8,500',
      description: 'Wrought iron or premium fabricated steel estate gates with full access management and pier work.',
      features: [
        'Hand-forged wrought iron or premium steel',
        'Full access management suite',
        'Brick or stone pier construction',
        'Smart home integration',
        'HD video and CCTV integration available',
        'Fifteen-year structural warranty',
      ],
    },
  ],
  'automated-systems': [
    {
      name: 'Basic Retrofit',
      price: 'From £1,400',
      description: 'Add electric operation to existing sound manual gates. Ram-arm motors, safety sensors, two remotes.',
      features: [
        'Ram-arm motors for existing swing gates',
        'Safety photocells and BS EN 12453 commissioning',
        'Two remote handsets',
        'Control board with auto-close option',
        'Written declaration of conformity',
        'Two-year motor warranty',
      ],
    },
    {
      name: 'Full Automation',
      price: 'From £2,800',
      description: 'Underground motors, video intercom, proximity access, and smartphone control.',
      features: [
        'Underground motors for clean appearance',
        'Video intercom with smartphone app',
        'Proximity reader or keypad',
        'Battery backup included',
        'Full BS EN 12453 safety commissioning',
        'Five-year motor and control warranty',
      ],
      popular: true,
    },
    {
      name: 'Smart Access',
      price: 'From £4,000',
      description: 'Complete smart access management with HD video, proximity readers, smart home integration, and CCTV link.',
      features: [
        'HD video intercom with app control',
        'Multiple proximity readers and keypads',
        'Smart home platform integration',
        'CCTV integration available',
        'Remote access management',
        'Five-year comprehensive warranty',
      ],
    },
  ],
  'gate-repair': [
    {
      name: 'Diagnostic Callout',
      price: 'From £95',
      description: 'Engineer attends, runs full diagnostic on motor, control board, safety sensors, and mechanical components. Written report provided.',
      features: [
        'Full system diagnostic inspection',
        'Written fault report',
        'Repair quote before work begins',
        'Parts available for most common brands',
        'Same-day attendance for urgent faults',
        'No fix, no charge on diagnostics',
      ],
    },
    {
      name: 'Standard Repair',
      price: 'From £250',
      description: 'Motor, control board, or safety sensor repair or replacement. Most common faults resolved on first visit.',
      features: [
        'Motor or gearbox repair or replacement',
        'Control board fault repair',
        'Safety sensor replacement and calibration',
        'Hinge adjustment or replacement',
        'Parts for FAAC, BFT, CAME, Nice, Beninca',
        'Six-month repair warranty',
      ],
      popular: true,
    },
    {
      name: 'Annual Service',
      price: 'From £130',
      description: 'Full annual service including motor lubrication, safety sensor calibration, hinge inspection, battery test, and written service report.',
      features: [
        'Motor and gearbox lubrication',
        'Safety sensor calibration and test',
        'Hinge inspection and adjustment',
        'Battery backup load test',
        'Intercom and access control check',
        'Written service report included',
      ],
    },
  ],
};

export function getPricingForService(serviceId: string): PricingTier[] {
  return PRICING[serviceId] || [];
}
