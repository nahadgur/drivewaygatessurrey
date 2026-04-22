// app/location/[city]/LocationHubClient.tsx
'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { services } from '@/data/services';
import { getCityBySlug } from '@/data/locations';
import { FAQS_SERVICES, FAQS_LOCATION } from '@/data/site';
import { isServiceLocationIndexed } from '@/data/indexing-tiers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { LeadFormModal } from '@/components/LeadFormModal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTACard } from '@/components/ui/CTACard';

interface LocationHubClientProps {
  params: { city: string };
  // intro is supplied by the server page.tsx via getCityHubIntro().
  // Bespoke per-city hub content lives in data/cityServiceContent.ts;
  // cities without bespoke copy fall through to the generic hub intro
  // defined in that same file.
  intro: string[];
}

export function LocationHubClient({ params, intro }: LocationHubClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cityName = getCityBySlug(params.city);
  if (!cityName) notFound();

  // Only show cards for service combinations that are actually indexed
  // for this city. Everything else is noindex and linking to it would
  // create internal links from indexed pages to noindex pages.
  const indexedServicesForCity = services.filter((s) =>
    isServiceLocationIndexed(s.slug, params.city),
  );

  const cityFaqs = [...FAQS_LOCATION, ...FAQS_SERVICES];

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow">

        {/* HERO */}
        <section className="editorial-container pt-6 pb-8">
          <Breadcrumbs items={[{ label: 'Locations', href: '/location/' }, { label: cityName }]} />
          <h1 className="font-display text-[2.2rem] md:text-[2.8rem] leading-[0.98] tracking-tight text-teal-ink mb-4" style={{ fontWeight: 400 }}>
            Driveway Gates<br />
            in <span className="italic-voice">{cityName}.</span>
          </h1>
          <p className="font-prose text-[17px] md:text-[18px] leading-[1.5] text-teal-ink/85 max-w-prose-editorial">
            Surrey gate specialists serving {cityName}. Every installer in our network focuses on residential gates as their primary trade, with verified project history before we refer a single enquiry.
          </p>
        </section>

        {/* BESPOKE INTRO + LEAD FORM */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container-wide py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">

              {/* Bespoke intro — 2 paragraphs from cityServiceContent.ts */}
              <div>
                <SectionHeader
                  title={<>Driveway gate installers<br /><span className="italic-voice">in {cityName}.</span></>}
                />
                <div className="prose-editorial max-w-prose-editorial">
                  {intro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>

              {/* Sidebar lead form on desktop; stacks below on mobile */}
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <HeroLeadForm city={cityName} />
              </aside>
            </div>
          </div>
        </section>

        {/* SERVICES AVAILABLE IN THIS CITY */}
        {indexedServicesForCity.length > 0 && (
          <section className="bg-paper">
            <div className="editorial-container-wide py-10 md:py-16">
              <SectionHeader
                title={<>Services in <span className="italic-voice">{cityName}.</span></>}
                subtitle="Each linked to a dedicated page for your area."
              />
              <div className="md:grid md:grid-cols-2 md:gap-x-12">
                {indexedServicesForCity.map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={`${service.title} in ${cityName}`}
                    subtitle={service.description.length > 80
                      ? service.description.slice(0, 80) + '…'
                      : service.description}
                    href={`/services/${service.slug}/${params.city}/`}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title="Common questions"
              subtitle={`Driveway gates in ${cityName}.`}
            />
            <FAQAccordion
              faqs={cityFaqs.map((f: { question: string; answer: string }) => ({ q: f.question, a: f.answer }))}
              defaultOpenIndex={-1}
            />
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-paper">
          <div className="editorial-container py-10 md:py-14">
            <CTACard
              title={`Get matched with gate installers in ${cityName}.`}
              italicAccent="Two minutes, three quotes."
              body={`Submit your enquiry and we identify up to three vetted installers covering ${cityName}. Free site surveys, detailed written quotes, no obligation at any stage.`}
              ctaLabel="Get Your Free Quotes"
              onCtaClick={() => setIsModalOpen(true)}
            />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
