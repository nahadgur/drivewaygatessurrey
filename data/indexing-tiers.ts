// data/indexing-tiers.ts
//
// Source of truth for which (service, location) combinations, location hubs,
// and service hubs should be indexed. Everything else is noindex+follow.
//
// This replaces the original "every service x every city = indexable" model
// with a demand-and-market-logic-driven model. Two tier definitions:
//
//   indexedServiceLocations[serviceSlug] = Set<citySlug>
//     The surviving service x location combinations. All other combinations
//     for that service are noindex.
//
//   indexedLocationHubs = Set<citySlug>
//     The surviving /location/<city>/ hub pages. Everything else noindex.
//
//   indexedServiceHubs = Set<serviceSlug>
//     Always kept: all 6 service hubs. (Hubs are county-level pages and
//     can rank for "<service> Surrey" queries.)
//
// Decisions based on the 2026-03-10 to 2026-04-19 GSC export plus
// market-logic additions in premium / AONB / conservation-area cities
// where demand is presumed genuine even without current impressions.
//
// Generated: 2026-04-21
// Revisit: 2026-07-21 (three months post-launch, re-run demand cull with
// a full 6-month GSC window and add/remove cities based on actual signal).

import { toSlug } from './locations';

// All service slugs known to the site.
export const ALL_SERVICE_SLUGS = [
  'electric-sliding-gates',
  'electric-swing-gates',
  'wooden-driveway-gates',
  'metal-driveway-gates',
  'automated-gate-systems',
  'gate-repair-and-maintenance',
] as const;

// Service hubs always indexed. They serve "<service> Surrey" county-level
// queries and are not city-specific.
export const indexedServiceHubs: Set<string> = new Set(ALL_SERVICE_SLUGS);

// Wooden-gates survivor cities: 26.
// 11 with current GSC signal, 15 market-logic additions in
// AONB / conservation area / rural market territory.
const WOODEN_CITIES = [
  // Current GSC signal
  'Reigate', 'Horley', 'Redhill', 'Leigh', 'Cranleigh', 'Farnham',
  'Guildford', 'Weybridge', 'Woking', 'Lightwater', 'Walton-on-Thames',
  // Market-logic (Surrey Hills AONB, conservation areas, rural)
  'Haslemere', 'Godalming', 'Chiddingfold', 'Elstead', 'Witley', 'Dunsfold',
  'Peaslake', 'Shere', 'Gomshall', 'Abinger Hammer', 'Dorking', 'Brockham',
  'Oxted', 'Lingfield', 'Ewell',
];

// Metal-gates survivor cities: 26.
// 11 with current GSC signal, 15 market-logic additions in the
// stockbroker belt / premium estate / East Surrey Green Belt territory.
const METAL_CITIES = [
  // Current GSC signal
  'Cobham', 'Esher', 'Farnham', 'Cranleigh', 'Leigh', 'Guildford',
  'Camberley', 'Reigate', 'Woking', 'Walton-on-Thames', 'Weybridge',
  // Market-logic (premium belt, estate properties, East Surrey)
  'Leatherhead', 'Ashtead', 'Ewell', 'Epsom', 'Banstead', 'Kingswood',
  'Tadworth', 'Oxted', 'Caterham', 'Horley', 'Redhill', 'Dorking',
  'Godalming', 'Haslemere', 'Fetcham',
];

// Per-service survivor sets. Everything not listed is noindex.
// The 4 non-surviving services (sliding, swing, automated, repair) all have
// empty sets: no combination pages survive for them. Only their hubs survive.
export const indexedServiceLocations: Record<string, Set<string>> = {
  'wooden-driveway-gates': new Set(WOODEN_CITIES.map(toSlug)),
  'metal-driveway-gates': new Set(METAL_CITIES.map(toSlug)),
  'electric-sliding-gates': new Set(),
  'electric-swing-gates': new Set(),
  'automated-gate-systems': new Set(),
  'gate-repair-and-maintenance': new Set(),
};

// Location hub survivor cities: union of everything in WOODEN_CITIES and
// METAL_CITIES, because the hub shows "gate services in Cityname" and any
// city that has at least one indexed service page deserves its hub indexed.
// (Hubs for cities with zero indexed combinations get noindexed too.)
export const indexedLocationHubs: Set<string> = new Set(
  Array.from(new Set([...WOODEN_CITIES, ...METAL_CITIES])).map(toSlug),
);

// Helpers used by generateMetadata and sitemap.

export function isServiceLocationIndexed(serviceSlug: string, citySlug: string): boolean {
  const set = indexedServiceLocations[serviceSlug];
  return set ? set.has(citySlug) : false;
}

export function isLocationHubIndexed(citySlug: string): boolean {
  return indexedLocationHubs.has(citySlug);
}

export function isServiceHubIndexed(serviceSlug: string): boolean {
  return indexedServiceHubs.has(serviceSlug);
}
