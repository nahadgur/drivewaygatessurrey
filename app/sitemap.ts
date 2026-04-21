// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { LOCATIONS, toSlug } from '@/data/locations';
import { siteConfig } from '@/data/site';
import {
  isServiceLocationIndexed,
  isLocationHubIndexed,
  isServiceHubIndexed,
} from '@/data/indexing-tiers';

// Static lastModified constants. Do not replace with new Date().
// Inflated freshness signals from dynamic sitemap dates are discounted by Google.
// Bump the relevant constant only when the content of that page tier actually changes.
const HOMEPAGE_MODIFIED = new Date('2026-04-21');
const SERVICES_HUB_MODIFIED = new Date('2026-04-21');
const LOCATIONS_HUB_MODIFIED = new Date('2026-04-21');
const BLOG_INDEX_MODIFIED = new Date('2026-04-21');
const SERVICE_MODIFIED = new Date('2026-04-21');
const LOCATION_MODIFIED = new Date('2026-04-21');
const SERVICE_LOCATION_MODIFIED = new Date('2026-04-21');
const LEGAL_MODIFIED = new Date('2026-04-21');

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const allCities = Object.values(LOCATIONS).flat();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: HOMEPAGE_MODIFIED, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/services/`, lastModified: SERVICES_HUB_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/location/`, lastModified: LOCATIONS_HUB_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog/`, lastModified: BLOG_INDEX_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact/`, lastModified: LEGAL_MODIFIED, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${base}/privacy/`, lastModified: LEGAL_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms/`, lastModified: LEGAL_MODIFIED, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Service hubs: all kept (county-level "<service> Surrey" queries).
  const servicePages: MetadataRoute.Sitemap = services
    .filter((s) => isServiceHubIndexed(s.slug))
    .map((s) => ({
      url: `${base}/services/${s.slug}/`,
      lastModified: SERVICE_MODIFIED,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    }));

  // Location hubs: only the ~27 cities that have at least one indexed service
  // combination. Everything else gets noindex via generateMetadata and stays
  // out of the sitemap.
  const locationPages: MetadataRoute.Sitemap = allCities
    .filter((city) => isLocationHubIndexed(toSlug(city)))
    .map((city) => ({
      url: `${base}/location/${toSlug(city)}/`,
      lastModified: LOCATION_MODIFIED,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    }));

  // Service x location combinations: only the survivors
  // (26 wooden + 26 metal = 52 combination pages).
  const serviceLocationPages: MetadataRoute.Sitemap = [];
  for (const service of services) {
    for (const city of allCities) {
      const citySlug = toSlug(city);
      if (isServiceLocationIndexed(service.slug, citySlug)) {
        serviceLocationPages.push({
          url: `${base}/services/${service.slug}/${citySlug}/`,
          lastModified: SERVICE_LOCATION_MODIFIED,
          changeFrequency: 'yearly' as const,
          priority: 0.4,
        });
      }
    }
  }

  return [...staticPages, ...servicePages, ...locationPages, ...serviceLocationPages];
}
