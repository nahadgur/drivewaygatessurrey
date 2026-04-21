// data/site.ts - Driveway Gates Surrey

export const siteConfig = {
  name: 'Driveway Gates Surrey',
  tagline: 'Surrey Gate Installers, Vetted and Ready',
  url: 'https://www.drivewaygatessurrey.uk',
  description: 'Find vetted driveway gate installers across Surrey. Compare free quotes for electric sliding gates, swing gates, hardwood gates, metal gates, automation systems, and repairs.',
  contactEmail: 'hello@drivewaygatessurrey.uk',
  gaId: 'G-TSR9FSETF5',
  // Replace with the real Bing Webmaster verification code.
  // Sign up at https://www.bing.com/webmasters, add the site,
  // select Meta tag verification, copy the content="..." value here.
  bingSiteVerification: 'REPLACE_WITH_BING_VERIFICATION_CODE',
};

// Testimonials intentionally empty. Reintroduce only with real,
// documented consent from named customers.
export const TESTIMONIALS: Array<{
  id: string;
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
}> = [];

export const TRUST_BADGES = [
  {
    icon: 'Award',
    title: 'Verified Specialists Only',
    description: 'Every Surrey installer in our network is a gate specialist with a verified project history, not a general builder who takes occasional gate work',
  },
  {
    icon: 'ShieldCheck',
    title: 'Insured and Warranted',
    description: 'Public liability cover and written warranties on both the gate and the automation are required from every installer before we refer a single enquiry',
  },
  {
    icon: 'UserCheck',
    title: 'Free Site Survey, No Commitment',
    description: 'Every installer offers a no-obligation site survey before quoting. No pressure, no commitment required until you are ready to proceed',
  },
  {
    icon: 'PoundSterling',
    title: '0% Finance Available',
    description: 'Spread your installation cost over 6 to 36 months interest-free through selected Surrey installers in our network, subject to status',
  },
];

export const FAQS_HOME = [
  {
    question: 'How is using this service different from finding an installer yourself?',
    answer: 'The difference is the vetting. Any installer can appear in a Google search. Every installer we refer has been assessed against specific criteria: a verified project history of completed residential gate installations, active public liability insurance, and a track record of providing written warranties on both the gate and the automation. We also monitor ongoing customer feedback and remove firms whose standards slip. You get the benefit of that due diligence without spending hours researching it yourself.',
  },
  {
    question: 'How do you match me with the right Surrey installer?',
    answer: 'We use your postcode, gate type, and budget to identify the most relevant specialists in our network for your specific project. A sliding gate installer who works predominantly in North Surrey may not be the right fit for a bespoke wrought iron project in the Surrey Hills, and we account for those differences. You receive contact from up to three relevant installers who will each arrange a free site survey and provide a detailed written quote.',
  },
  {
    question: 'What does this service cost?',
    answer: 'Nothing. The matching service is free at every stage for homeowners. You pay nothing to us before, during, or after your enquiry. If your project goes ahead, you pay the installer directly under your agreed contract. We receive a referral contribution from the installer on completion, which does not affect the price you are quoted.',
  },
];

export const FAQS_SERVICES = [
  {
    question: 'How long does a driveway gate installation take in Surrey?',
    answer: 'Standard installations take 2 to 4 working days from the first day on site. Groundwork and foundations are completed on day one, the gate is hung and automation is wired on day two, and commissioning, intercom setup, and handover are completed on the final day. Bespoke fabricated gates, particularly wrought iron or hardwood designs made to measure, require a manufacturing lead time of 3 to 6 weeks before the installation date. Your installer will provide a confirmed programme at the site survey stage.',
  },
  {
    question: 'Do I need planning permission for driveway gates in Surrey?',
    answer: 'Most residential driveway gates fall under permitted development and do not require an application. The general rule is that gates under 2 metres in height that open inward onto your property are exempt, with the limit dropping to 1 metre for gates adjacent to a classified road. Listed buildings, conservation area properties, Surrey Hills AONB sites, and Green Belt land with Article 4 Directions are outside standard permitted development and may require consent. Surrey has a high concentration of designated areas and your installer will confirm the planning position at the site survey.',
  },
  {
    question: 'What warranty should I expect from a Surrey gate installer?',
    answer: 'A reputable installer provides separate warranties for the gate and the automation. Motor and control board warranties from quality manufacturers such as FAAC, BFT, CAME, and Nice are typically 2 to 5 years. The gate structure and finish should be warranted for a minimum of 5 years, with better manufacturers offering 10 to 25 years on powder-coated aluminium and certified timber products such as Accoya. Always ask for the warranty terms in writing before signing off a quote.',
  },
  {
    question: 'What motor brands do Surrey installers use?',
    answer: 'The quality brands installed across the Surrey residential market are FAAC, BFT, CAME, Nice, and Beninca. All maintain active parts availability for their motor ranges for at least a decade after production, which matters when a component needs replacing several years into the installation. Be cautious of quotes specifying unbranded or unfamiliar motors without a clear justification.',
  },
];

export const FAQS_LOCATION = [
  {
    question: 'How do you vet installers before adding them to your Surrey network?',
    answer: 'We require evidence of a verified residential gate project history before any installer is accepted into the network. We check that public liability insurance is current and covers the full scope of gate installation work. We confirm that written warranties are offered on both the gate and the automation as a standard practice, not an optional extra. We monitor customer feedback on an ongoing basis and remove any firm whose quality or responsiveness falls below our standards.',
  },
  {
    question: 'Do you cover my area of Surrey?',
    answer: 'Our network covers the whole of Surrey, from Staines-upon-Thames and Egham in the north to Haslemere and Cranleigh in the south, and from Farnham in the west to Oxted and Caterham in the east. We also cover the Surrey borders into parts of Kent, Sussex, Hampshire, and Berkshire. If your town is not listed on the site, submit an enquiry with your postcode and we will confirm coverage directly.',
  },
  {
    question: 'Can Surrey installers handle planning applications for conservation areas and the AONB?',
    answer: 'Installers in our Surrey network who regularly work in the Surrey Hills AONB, the Green Belt villages, and the historic towns of Guildford, Farnham, and Godalming are familiar with the planning requirements for these areas. They can advise on whether a planning application is required, help you design a gate that is sympathetic to the area character, and support a pre-application enquiry to the local authority where needed.',
  },
];

// Aliases for component compatibility
export const testimonials = TESTIMONIALS;
export const trustBadges = TRUST_BADGES;
