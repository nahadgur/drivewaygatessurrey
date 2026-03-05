// data/pricing.ts
// Surrey driveway gate pricing data (2026 market rates)

export interface PricingTier {
  treatment: string;
  slug: string;
  priceFrom: number;
  priceTo: number;
  typicalDuration: string;
  alignerSets: string;
  description: string;
}

export const pricingTiers: PricingTier[] = [
  {
    treatment: 'Electric Sliding Gates (Fully Installed)',
    slug: 'electric-sliding',
    priceFrom: 5000,
    priceTo: 13000,
    typicalDuration: '3 to 5 days',
    alignerSets: 'Gate + motor + track + remotes',
    description: 'Full installation covering gate fabrication, concrete track or cantilever foundation, rack-and-pinion motor, two remote handsets, and calibrated safety photocells. Higher end reflects cantilever systems, wider openings, or premium materials. A precise figure requires a site survey.',
  },
  {
    treatment: 'Electric Swing Gates (Fully Installed)',
    slug: 'electric-swing',
    priceFrom: 4000,
    priceTo: 12000,
    typicalDuration: '2 to 4 days',
    alignerSets: 'Gate + motor + posts + remotes',
    description: 'Covers gate fabrication or supply, post foundations, underground or ram-arm motors, two remote handsets, and BS EN 12453 compliant safety sensors. Underground motors and bespoke wrought iron designs sit toward the top of the range. The most widely installed gate type across Surrey.',
  },
  {
    treatment: 'Wooden Driveway Gates (Installed)',
    slug: 'wooden-gates',
    priceFrom: 3000,
    priceTo: 9000,
    typicalDuration: '2 to 4 days',
    alignerSets: 'Bespoke timber + hardware',
    description: 'Bespoke hardwood gates in iroko, European oak, or Accoya, hung on hot-dip galvanised ironmongery with a quality locking system. Price varies with timber species, panel design, and gate dimensions. Automation can be added from £1,400 and is specified after the gate weight is confirmed.',
  },
  {
    treatment: 'Metal Driveway Gates (Installed)',
    slug: 'metal-gates',
    priceFrom: 3200,
    priceTo: 10000,
    typicalDuration: '2 to 4 days',
    alignerSets: 'Fabricated + galvanised + coated',
    description: 'Bespoke mild steel, aluminium, or wrought iron gates, shot-blasted, hot-dip galvanised, and powder-coated in any RAL colour. Includes posts, hinges, and lock. Wrought iron and laser-cut designs sit at the higher end. Automation available as a separately quoted addition from £1,400.',
  },
  {
    treatment: 'Gate Automation Retrofit',
    slug: 'automated-systems',
    priceFrom: 1400,
    priceTo: 4000,
    typicalDuration: '1 to 2 days',
    alignerSets: 'Motor + safety + remotes',
    description: 'Adds electric operation to existing manual gates that are structurally sound and correctly hung. Includes motor, control board, safety photocells, and two remote handsets. Video intercom, keypad, or smartphone control modules available as additions. Price determined by gate weight, type, and access control specification.',
  },
  {
    treatment: 'Gate Repair and Servicing',
    slug: 'gate-repair',
    priceFrom: 130,
    priceTo: 800,
    typicalDuration: 'Same day to 2 days',
    alignerSets: 'Callout + labour + parts',
    description: 'Covers diagnostic callouts, motor and control board repair or replacement, hinge realignment, safety sensor recalibration, intercom faults, and remote reprogramming. Annual service packages covering all mechanical and electronic elements available from most Surrey engineers in our network.',
  },
];

export const servicePricingMap: Record<string, string[]> = {
  'electric-sliding':  ['electric-sliding'],
  'electric-swing':    ['electric-swing'],
  'wooden-gates':      ['wooden-gates', 'automated-systems'],
  'metal-gates':       ['metal-gates', 'automated-systems'],
  'automated-systems': ['automated-systems'],
  'gate-repair':       ['gate-repair'],
};

export function getPricingForService(serviceId: string): PricingTier[] {
  const slugs = servicePricingMap[serviceId] || ['electric-swing'];
  return pricingTiers.filter(p => slugs.includes(p.slug));
}

export const treatmentIncludes = [
  'Free site survey with no obligation to proceed',
  'Bespoke gate design and workshop fabrication',
  'All groundwork, post foundations, and concrete work',
  'Automation motor, control board, remotes, and safety sensors',
  'Intercom, keypad, or proximity reader wiring where specified',
  'Full BS EN 12453 commissioning, testing, and written handover',
];

export const financeInfo = {
  available: true,
  interestFree: true,
  monthlyFrom: 99,
  spreadOver: '6 to 36 months',
  description: 'Most Surrey installers in our network offer 0% interest finance on gate installations. Spread the cost of your project over 6 to 36 months from as little as £99 per month, with nothing to pay upfront at many providers. Subject to status and approval.',
};
