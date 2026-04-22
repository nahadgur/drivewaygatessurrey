// app/location/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { LOCATIONS, toSlug } from '@/data/locations';
import { FAQS_LOCATION } from '@/data/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadFormModal } from '@/components/LeadFormModal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LocationPill } from '@/components/ui/LocationPill';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTACard } from '@/components/ui/CTACard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export default function LocationIndexPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLocations = useMemo(() => {
    if (!searchQuery) return LOCATIONS;
    const result: Record<string, string[]> = {};
    Object.entries(LOCATIONS).forEach(([region, cities]) => {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length > 0) result[region] = filtered;
    });
    return result;
  }, [searchQuery]);

  const totalCount = Object.values(LOCATIONS).flat().length;

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow">

        {/* HERO */}
        <section className="editorial-container pt-6 pb-8">
          <Breadcrumbs items={[{ label: 'Locations' }]} />
          <h1 className="font-display text-[2.2rem] md:text-[2.8rem] leading-[0.98] tracking-tight text-teal-ink mb-4" style={{ fontWeight: 400 }}>
            Gate installers<br />
            across <span className="italic-voice">Surrey.</span>
          </h1>
          <p className="font-prose text-[17px] md:text-[18px] leading-[1.5] text-teal-ink/85 mb-6 max-w-prose-editorial">
            {totalCount} towns covered across every part of the county, from the stockbroker belt in the north to the AONB villages in the south. Find a specialist for your area.
          </p>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-muted w-5 h-5" strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search your town or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-teal-line bg-white text-teal-ink placeholder-teal-muted text-[15px] focus:outline-none focus:border-teal-brand transition-colors"
            />
          </div>
        </section>

        {/* LOCATIONS BY REGION */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader title="By region" subtitle="Surrey grouped by the areas our installers cover." />
            <div className="space-y-10">
              {Object.entries(filteredLocations).map(([region, cities]) => (
                <div key={region}>
                  <h2 className="font-display text-[1.4rem] leading-tight tracking-tight text-teal-ink mb-4 pb-2 border-b-2 border-teal-ink" style={{ fontWeight: 500 }}>
                    {region}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-0">
                    {cities.map(city => (
                      <LocationPill key={city} name={city} href={`/location/${toSlug(city)}/`} />
                    ))}
                  </div>
                </div>
              ))}
              {Object.keys(filteredLocations).length === 0 && (
                <p className="font-prose text-[17px] text-teal-ink/70 italic">
                  No towns matching "{searchQuery}". Try a nearby area or contact us directly.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-paper">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader title="Common questions" subtitle="About gate installation across Surrey." />
            <FAQAccordion
              faqs={FAQS_LOCATION.map((f: { question: string; answer: string }) => ({ q: f.question, a: f.answer }))}
              defaultOpenIndex={-1}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white border-t border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <CTACard
              title="Ready for three installer quotes?"
              italicAccent="Anywhere in Surrey."
              body="Submit your postcode and gate type. We match you with three vetted specialists covering your area. Free site surveys, detailed written quotes."
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
