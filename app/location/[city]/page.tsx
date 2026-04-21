// app/location/[city]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCATIONS, getCityBySlug, toSlug } from '@/data/locations';
import { FAQS_SERVICES, FAQS_LOCATION, siteConfig } from '@/data/site';
import { isLocationHubIndexed } from '@/data/indexing-tiers';
import { buildBreadcrumbSchema } from '@/lib/breadcrumbs';
import { buildFaqSchema, buildReferralServiceSchema, buildWebPageSchema } from '@/lib/schema';
import { LocationHubClient } from './LocationHubClient';

export function generateStaticParams() {
  return Object.values(LOCATIONS).flat().map((city) => ({ city: toSlug(city) }));
}

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const cityName = getCityBySlug(params.city);
  if (!cityName) return {};

  const pageUrl = `${siteConfig.url}/location/${params.city}/`;
  const indexed = isLocationHubIndexed(params.city);

  return {
    title: `Driveway Gate Installers in ${cityName} | Vetted, Insured, Surrey`,
    description: `Find vetted driveway gate installers in ${cityName}, Surrey. Free site surveys, written quotes, and up to three options with no obligation.`,
    alternates: { canonical: pageUrl },
    robots: indexed
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default function CityPage({ params }: { params: { city: string } }) {
  const cityName = getCityBySlug(params.city);
  if (!cityName) notFound();

  const pageUrl = `${siteConfig.url}/location/${params.city}/`;
  const indexed = isLocationHubIndexed(params.city);
  const cityFaqs = [...FAQS_LOCATION, ...FAQS_SERVICES];

  let graph: object | null = null;

  if (indexed) {
    const webPageSchema = buildWebPageSchema({
      pageUrl,
      name: `Driveway Gate Installers in ${cityName}`,
      description: `Matching service connecting homeowners in ${cityName}, Surrey with vetted, independent driveway gate installers.`,
      breadcrumbId: `${pageUrl}#breadcrumb`,
    });

    const referralServiceSchema = buildReferralServiceSchema({
      pageUrl,
      name: `Driveway Gate Installer Matching, ${cityName}`,
      description: `Matching service connecting homeowners in ${cityName}, Surrey with vetted, independent driveway gate installers. Free site surveys, written quotes, and up to three options with no obligation.`,
      areaServed: {
        '@type': 'City',
        name: cityName,
        containedInPlace: { '@type': 'AdministrativeArea', name: 'Surrey, United Kingdom' },
      },
    });

    const faqSchema = buildFaqSchema(cityFaqs);

    const breadcrumbSchema = {
      ...buildBreadcrumbSchema([
        { label: 'Locations', href: '/location/' },
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
      <LocationHubClient params={params} />
    </>
  );
}
