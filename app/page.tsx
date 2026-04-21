// app/page.tsx
import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { buildBreadcrumbSchema } from '@/lib/breadcrumbs';
import { buildFaqSchema, buildReferralServiceSchema, buildWebPageSchema } from '@/lib/schema';
import { homepageFaqs } from './home-data';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'Driveway Gates Surrey | Find Trusted Gate Installers Across Surrey',
  description: siteConfig.description,
  alternates: { canonical: `${siteConfig.url}/` },
};

export default function HomePage() {
  const pageUrl = `${siteConfig.url}/`;

  const webPageSchema = buildWebPageSchema({
    pageUrl,
    name: 'Driveway Gates Surrey',
    description: siteConfig.description,
    breadcrumbId: `${pageUrl}#breadcrumb`,
  });

  const referralServiceSchema = buildReferralServiceSchema({
    pageUrl,
    name: 'Driveway gate installer referral and matching service',
    description: 'Free service matching Surrey homeowners with vetted, insured driveway gate installers. Up to three quotes from independent specialists, no obligation.',
    serviceId: '/#referral-service',
  });

  const faqSchema = buildFaqSchema(homepageFaqs);

  // Home is a single-item breadcrumb. buildBreadcrumbSchema prepends Home
  // automatically, so we pass an empty array for "no further crumbs".
  const breadcrumbSchema = {
    ...buildBreadcrumbSchema([]),
    '@id': `${pageUrl}#breadcrumb`,
  };

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageSchema,
      referralServiceSchema,
      faqSchema,
      breadcrumbSchema,
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />
      <HomeClient />
    </>
  );
}
