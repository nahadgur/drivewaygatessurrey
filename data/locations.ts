// data/locations.ts — Driveway Gates Surrey

export const LOCATIONS: Record<string, string[]> = {
  'North Surrey': [
    'Staines-upon-Thames', 'Egham', 'Addlestone', 'Weybridge', 'Walton-on-Thames',
    'Esher', 'Cobham', 'Leatherhead', 'Epsom', 'Ewell',
    'Banstead', 'Tadworth', 'Kingswood', 'Ashtead', 'Fetcham',
  ],
  'West Surrey': [
    'Guildford', 'Godalming', 'Farnham', 'Haslemere', 'Milford',
    'Witley', 'Cranleigh', 'Bramley', 'Shalford', 'Compton',
    'Wonersh', 'Alfold', 'Dunsfold', 'Chiddingfold', 'Elstead',
  ],
  'Central Surrey': [
    'Woking', 'Camberley', 'Frimley', 'Bagshot', 'Lightwater',
    'Windlesham', 'Chobham', 'Bisley', 'Ripley', 'Send',
    'Pyrford', 'West Byfleet', 'Byfleet', 'New Haw', 'Ottershaw',
  ],
  'East Surrey': [
    'Reigate', 'Redhill', 'Horley', 'Oxted', 'Caterham',
    'Warlingham', 'Whyteleafe', 'Godstone', 'Bletchingley', 'Nutfield',
    'Merstham', 'Coulsdon', 'Purley', 'Kenley', 'Lingfield',
  ],
  'South Surrey': [
    'Dorking', 'Brockham', 'Betchworth', 'Holmwood', 'Capel',
    'Ockley', 'Newdigate', 'Leigh', 'Charlwood', 'Hookwood',
    'Abinger Hammer', 'Shere', 'Gomshall', 'Peaslake', 'Forest Green',
  ],
};

export function getCityBySlug(slug: string): string | undefined {
  const all = Object.values(LOCATIONS).flat();
  return all.find(city => toSlug(city) === slug);
}

export function toSlug(city: string): string {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
