// lib/breadcrumbs.ts
import { siteConfig } from '@/data/site';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Build a BreadcrumbList JSON-LD object. Home is prepended automatically,
 * so callers should pass only the page-specific crumbs.
 *
 * Items without an href are treated as the current page and do not get
 * an `item` URL on their ListItem (per schema.org guidance).
 */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
    })),
  };
}
