// lib/schema.ts
import { siteConfig } from '@/data/site';

export interface FAQ {
  question: string;
  answer: string;
}

/**
 * Reference to the site-level Organization emitted in app/layout.tsx.
 * Use this when a per-page Service/WebPage needs a provider/publisher.
 */
export const organizationRef = { '@id': `${siteConfig.url}/#organization` };

/**
 * FAQPage JSON-LD for a visible FAQ section.
 */
export function buildFaqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

/**
 * Service JSON-LD for the matching/referral service described on a page.
 * The price is '0' because the matching service itself is free; the actual
 * installation is a separate contract between the user and the installer.
 */
export function buildReferralServiceSchema(params: {
  pageUrl: string;
  name: string;
  description: string;
  areaServed?: object;
  serviceId?: string;
}) {
  const areaServed = params.areaServed || {
    '@type': 'AdministrativeArea',
    name: 'Surrey, United Kingdom',
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    ...(params.serviceId ? { '@id': `${siteConfig.url}${params.serviceId}` } : {}),
    name: params.name,
    description: params.description,
    url: params.pageUrl,
    provider: organizationRef,
    serviceType: 'Driveway gate installer referral and matching service',
    areaServed,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'GBP',
      description:
        'Free matching service for homeowners. You are connected with an independent UK gate installer who agrees their own fees directly with you.',
    },
  };
}

/**
 * WebPage JSON-LD for a generic page (homepage, hubs). Pairs with the
 * site-level WebSite/Organization graph emitted in layout.tsx.
 */
export function buildWebPageSchema(params: {
  pageUrl: string;
  name: string;
  description: string;
  breadcrumbId?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${params.pageUrl}#webpage`,
    url: params.pageUrl,
    name: params.name,
    description: params.description,
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    inLanguage: 'en-GB',
    ...(params.breadcrumbId ? { breadcrumb: { '@id': params.breadcrumbId } } : {}),
  };
}
