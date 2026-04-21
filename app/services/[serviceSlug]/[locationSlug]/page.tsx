// app/services/[serviceSlug]/[locationSlug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllServiceSlugs, getServiceBySlug } from '@/data/services';
import { LOCATIONS, getCityBySlug, toSlug } from '@/data/locations';
import { FAQS_SERVICES, siteConfig } from '@/data/site';
import { isServiceLocationIndexed } from '@/data/indexing-tiers';
import { buildBreadcrumbSchema } from '@/lib/breadcrumbs';
import { buildFaqSchema, buildReferralServiceSchema, buildWebPageSchema } from '@/lib/schema';
import { ServiceLocationClient } from './ServiceLocationClient';

export function generateStaticParams() {
  const allCities = Object.values(LOCATIONS).flat();
  const params: { serviceSlug: string; locationSlug: string }[] = [];
  for (const serviceSlug of getAllServiceSlugs()) {
    for (const city of allCities) {
      params.push({ serviceSlug, locationSlug: toSlug(city) });
    }
  }
  return params;
}

export function generateMetadata({
  params,
}: {
  params: { serviceSlug: string; locationSlug: string };
}): Metadata {
  const service = getServiceBySlug(params.serviceSlug);
  const cityName = getCityBySlug(params.locationSlug);
  if (!service || !cityName) return {};

  const pageUrl = `${siteConfig.url}/services/${service.slug}/${params.locationSlug}/`;
  const indexed = isServiceLocationIndexed(service.slug, params.locationSlug);

  return {
    title: `${service.title} in ${cityName} | Vetted Installers, Free Quotes`,
    description: `Matching service connecting homeowners in ${cityName}, Surrey with vetted, independent ${service.title.toLowerCase()} specialists. Free site survey, written quotes, no obligation.`,
    alternates: { canonical: pageUrl },
    // Culled combinations stay reachable (direct visitors, LLM citations,
    // inbound links still work) but are removed from the index. follow:true
    // preserves link equity to pages that ARE indexed.
    robots: indexed
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default function ServiceLocationPage({
  params,
}: {
  params: { serviceSlug: string; locationSlug: string };
}) {
  const service = getServiceBySlug(params.serviceSlug);
  const cityName = getCityBySlug(params.locationSlug);
  if (!service || !cityName) notFound();

  const pageUrl = `${siteConfig.url}/services/${service.slug}/${params.locationSlug}/`;
  const indexed = isServiceLocationIndexed(service.slug, params.locationSlug);
  const combinedFaqs = [...(service.faqs || []), ...FAQS_SERVICES];

  // Only emit JSON-LD schema graph for indexed pages. Noindex pages have
  // no reason to advertise themselves to search engines.
  let graph: object | null = null;

  if (indexed) {
    const webPageSchema = buildWebPageSchema({
      pageUrl,
      name: `${service.title} in ${cityName}`,
      description: `Matching service connecting homeowners in ${cityName}, Surrey with vetted, independent ${service.title.toLowerCase()} specialists.`,
      breadcrumbId: `${pageUrl}#breadcrumb`,
    });

    const referralServiceSchema = buildReferralServiceSchema({
      pageUrl,
      name: `${service.title} Installer Matching, ${cityName}`,
      description: `Matching service connecting homeowners in ${cityName}, Surrey with vetted, independent ${service.title.toLowerCase()} specialists. Free site survey, written quotes, no obligation.`,
      areaServed: {
        '@type': 'City',
        name: cityName,
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Surrey, United Kingdom' },
      },
    });

    const faqSchema = buildFaqSchema(combinedFaqs);

    const breadcrumbSchema = {
      ...buildBreadcrumbSchema([
        { label: 'Gate Types', href: '/services/' },
        { label: service.title, href: `/services/${service.slug}/` },
        { label: cityName },
      ]),
      '@id': `${pageUrl}#breadcrumb`,
    };

    graph = {
      '@context': 'https://schema.org',
      '@graph': [
        webPageSchema,
        referralServiceSchema,
        faqSchema,
        breadcrumbSchema,
      ],
    };
  }

  return (
    <>
      {graph && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      )}
      <ServiceLocationClient params={params} />
    </>
  );
}
