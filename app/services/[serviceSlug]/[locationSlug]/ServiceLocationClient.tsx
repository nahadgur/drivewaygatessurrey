// app/services/[serviceSlug]/[locationSlug]/ServiceLocationClient.tsx
'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/data/services';
import { getCityBySlug } from '@/data/locations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { LeadFormModal } from '@/components/LeadFormModal';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTACard } from '@/components/ui/CTACard';

interface ServiceLocationClientProps {
  params: { serviceSlug: string; locationSlug: string };
  // intro is supplied by the server page.tsx via getServiceLocationIntro().
  // Bespoke per-(city,service) content lives in data/cityServiceContent.ts;
  // cities without bespoke copy fall through to the generic per-service
  // template defined in that same file.
  intro: string[];
}

export function ServiceLocationClient({ params, intro }: ServiceLocationClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const service = getServiceBySlug(params.serviceSlug);
  const cityName = getCityBySlug(params.locationSlug);
  if (!service || !cityName) notFound();

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow">

        {/* HERO */}
        <section className="editorial-container pt-6 pb-8">
          <Breadcrumbs items={[
            { label: 'Gate Services', href: '/services/' },
            { label: service.title, href: `/services/${service.slug}/` },
            { label: cityName },
          ]} />
          <h1 className="font-display text-[2.2rem] md:text-[2.8rem] leading-[0.98] tracking-tight text-teal-ink mb-4" style={{ fontWeight: 400 }}>
            {service.title}<br />
            in <span className="italic-voice">{cityName}.</span>
          </h1>
          <p className="font-prose text-[17px] md:text-[18px] leading-[1.5] text-teal-ink/85 max-w-prose-editorial">
            Surrey {service.title.toLowerCase()} specialists covering {cityName}. Free site survey, three written quotes, no obligation to proceed.
          </p>
        </section>

        {/* BESPOKE INTRO + LEAD FORM */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">

              {/* Bespoke intro from cityServiceContent.ts */}
              <div>
                <SectionHeader
                  title={<>{service.title}<br /><span className="italic-voice">in {cityName}.</span></>}
                  subtitle="What to expect on specification, installation, and finish."
                />
                <div className="prose-editorial max-w-prose-editorial">
                  {intro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>

              {/* Sidebar lead form */}
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <HeroLeadForm city={cityName} service={service.title} />
              </aside>
            </div>
          </div>
        </section>

        {/* SERVICE FAQs */}
        {service.faqs.length > 0 && (
          <section className="bg-paper">
            <div className="editorial-container py-10 md:py-14">
              <SectionHeader
                title="Common questions"
                subtitle={`${service.title} in ${cityName}.`}
              />
              <FAQAccordion
                faqs={service.faqs.map(f => ({ q: f.question, a: f.answer }))}
                defaultOpenIndex={-1}
              />
            </div>
          </section>
        )}

        {/* FINAL CTA */}
        <section className="bg-white border-t border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <CTACard
              title={`Get ${service.title.toLowerCase()} quotes in ${cityName}.`}
              italicAccent="Two minutes, three quotes."
              body={`Submit your enquiry and we match you with up to three vetted ${cityName} installers. Free site surveys, detailed written quotes, no obligation at any stage.`}
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
