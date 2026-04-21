// app/services/[serviceSlug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllServiceSlugs, getServiceBySlug } from '@/data/services';
import { FAQS_SERVICES, siteConfig } from '@/data/site';
import { buildBreadcrumbSchema } from '@/lib/breadcrumbs';
import { buildFaqSchema, buildReferralServiceSchema, buildWebPageSchema } from '@/lib/schema';
import { ServicePageClient } from './ServicePageClient';

export function generateStaticParams() {
  return getAllServiceSlugs().map((serviceSlug) => ({ serviceSlug }));
}

export function generateMetadata({ params }: { params: { serviceSlug: string } }): Metadata {
  const service = getServiceBySlug(params.serviceSlug);
  if (!service) return {};
  const pageUrl = `${siteConfig.url}/services/${service.slug}/`;
  return {
    title: `${service.title} in Surrey | Vetted Installers, Free Quotes`,
    description: service.description,
    alternates: { canonical: pageUrl },
  };
}

export default function ServicePage({ params }: { params: { serviceSlug: string } }) {
  const service = getServiceBySlug(params.serviceSlug);
  if (!service) notFound();

  const pageUrl = `${siteConfig.url}/services/${service.slug}/`;
  const combinedFaqs = [...(service.faqs || []), ...FAQS_SERVICES];

  const webPageSchema = buildWebPageSchema({
    pageUrl,
    name: `${service.title} in Surrey`,
    description: service.description,
    breadcrumbId: `${pageUrl}#breadcrumb`,
  });

  const referralServiceSchema = buildReferralServiceSchema({
    pageUrl,
    name: `${service.title} Installer Matching, Surrey`,
    description: `Matching service connecting homeowners across Surrey with vetted, independent ${service.title.toLowerCase()} specialists. Free site survey, written quotes, no obligation.`,
  });

  const faqSchema = buildFaqSchema(combinedFaqs);

  const breadcrumbSchema = {
    ...buildBreadcrumbSchema([
      { label: 'Gate Types', href: '/services/' },
      { label: service.title },
    ]),
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
      <ServicePageClient params={params} />
    </>
  );
}
