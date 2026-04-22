// app/services/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { services } from '@/data/services';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadFormModal } from '@/components/LeadFormModal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { CTACard } from '@/components/ui/CTACard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function ServicesIndexPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow">

        {/* HERO */}
        <section className="editorial-container-wide pt-6 pb-10 md:pt-10 md:pb-16">
          <Breadcrumbs items={[{ label: 'Gate Services' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 lg:items-center mt-4">
            <div>
              <h1 className="font-display text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] leading-[0.98] tracking-tight text-teal-ink mb-4 md:mb-6" style={{ fontWeight: 400 }}>
                Surrey driveway<br />
                gate <span className="italic-voice">services.</span>
              </h1>
              <p className="font-prose text-[17px] md:text-[19px] leading-[1.5] text-teal-ink/85 max-w-prose-editorial">
                Wrought iron, hardwood, sliding, swing, and full automation. A vetted network of Surrey specialists, each focused on residential gate installation as their primary trade.
              </p>
            </div>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '5/4' }}>
              <Image
                src="/images/gates/gate-split-wrought-iron-vs-aluminium-sliding.png"
                alt="Gate styles comparison — wrought iron and modern aluminium sliding installations across Surrey"
                fill
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* SERVICE LIST — cards with image + title + description */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container-wide py-10 md:py-16">
            <SectionHeader title="Six gate services" subtitle="Every Surrey property type." />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0 lg:gap-y-4">
              {services.map(service => (
                <article key={service.id} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-5 md:gap-8 py-6 md:py-8 border-b border-teal-line last:border-b-0 lg:last:border-b">
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 200px, (min-width: 768px) 200px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <ServiceCard
                      title={service.title}
                      subtitle=""
                      href={`/services/${service.slug}/`}
                    />
                    <p className="font-prose text-[15px] leading-[1.55] text-teal-ink/80 mt-3">
                      {service.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-paper">
          <div className="editorial-container py-10 md:py-14">
            <CTACard
              title="Not sure which service you need?"
              italicAccent="We'll help you decide."
              body="Submit your postcode and rough brief. We match you with installers whose experience covers your specific specification, and they advise at the site survey."
              ctaLabel="Request Your Quotes"
              onCtaClick={() => setIsModalOpen(true)}
            />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
