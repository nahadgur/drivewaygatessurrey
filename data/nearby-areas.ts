// data/nearby-areas.ts — Driveway Gates Surrey

export const NEARBY_AREAS: Record<string, string[]> = {
  'guildford': ['Godalming', 'Shalford', 'Bramley', 'Compton', 'Wonersh', 'Merrow'],
  'woking': ['West Byfleet', 'Byfleet', 'Pyrford', 'Send', 'Ripley', 'Chobham'],
  'reigate': ['Redhill', 'Merstham', 'Nutfield', 'Bletchingley', 'Betchworth', 'Brockham'],
  'epsom': ['Ewell', 'Ashtead', 'Banstead', 'Tadworth', 'Kingswood', 'Fetcham'],
  'farnham': ['Wrecclesham', 'Badshot Lea', 'Runfold', 'Seale', 'Tongham', 'Elstead'],
  'camberley': ['Frimley', 'Bagshot', 'Lightwater', 'Windlesham', 'Bisley', 'Chobham'],
  'leatherhead': ['Fetcham', 'Ashtead', 'Cobham', 'Oxshott', 'Great Bookham', 'Effingham'],
  'dorking': ['Brockham', 'Betchworth', 'Holmwood', 'Westcott', 'North Holmwood', 'Abinger'],
  'weybridge': ['Walton-on-Thames', 'Cobham', 'Esher', 'Addlestone', 'Oatlands', 'Hersham'],
  'cobham': ['Esher', 'Weybridge', 'Leatherhead', 'Oxshott', 'Stoke D\'Abernon', 'Fetcham'],
  'esher': ['Cobham', 'Weybridge', 'Walton-on-Thames', 'Claygate', 'Hinchley Wood', 'Thames Ditton'],
  'redhill': ['Reigate', 'Merstham', 'Horley', 'Nutfield', 'Salfords', 'Earlswood'],
  'horley': ['Redhill', 'Salfords', 'Charlwood', 'Hookwood', 'Sidlow', 'Smallfield'],
  'oxted': ['Caterham', 'Warlingham', 'Godstone', 'Lingfield', 'Hurst Green', 'Limpsfield'],
  'haslemere': ['Godalming', 'Witley', 'Milford', 'Chiddingfold', 'Fernhurst', 'Grayswood'],
};

export function getNearbyAreas(citySlug: string): string[] {
  return NEARBY_AREAS[citySlug] || [];
}
