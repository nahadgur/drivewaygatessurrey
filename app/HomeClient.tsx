// app/HomeClient.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadFormModal } from '@/components/LeadFormModal';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { LocationPill } from '@/components/ui/LocationPill';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTACard } from '@/components/ui/CTACard';
import { PrimaryCTA } from '@/components/ui/PrimaryCTA';
import { toSlug } from '@/data/locations';
import { homepageFaqs } from './home-data';

// Homepage-specific service index. Uses exact query strings as titles (the SEO
// improvement over "Hardwood / Metal"). Each item links to its service hub.
const SERVICE_INDEX = [
  {
    title: 'Wooden Driveway Gates',
    subtitle: 'Iroko, European oak, Accoya',
    meta: 'Popular in Farnham, Chiddingfold, Shere, Haslemere',
    href: '/services/wooden-driveway-gates/',
  },
  {
    title: 'Metal & Wrought Iron Gates',
    subtitle: 'Hand-forged, hot-dip galvanised',
    meta: 'Popular in Weybridge, Cobham, Esher, Reigate',
    href: '/services/metal-driveway-gates/',
  },
  {
    title: 'Electric Sliding Gates',
    subtitle: 'Track and cantilever systems',
    meta: 'Popular in Woking, Horley, Camberley, Guildford',
    href: '/services/electric-sliding-gates/',
  },
  {
    title: 'Electric Swing Gates',
    subtitle: 'Underground and ram-arm motors',
    meta: 'County-wide',
    href: '/services/electric-swing-gates/',
  },
  {
    title: 'Automated Gate Systems',
    subtitle: 'FAAC, BFT, CAME, NICE, Beninca',
    meta: 'Retrofit and new-build',
    href: '/services/automated-gate-systems/',
  },
  {
    title: 'Gate Repair & Maintenance',
    subtitle: 'Motors, hinges, photocells, safety testing',
    meta: 'County-wide',
    href: '/services/gate-repair-and-maintenance/',
  },
];

// Top 16 Surrey cities to feature on the homepage. Matches the union of
// wooden + metal survivor lists from data/indexing-tiers.ts.
const FEATURED_LOCATIONS = [
  'Weybridge', 'Cobham', 'Esher', 'Walton-on-Thames',
  'Reigate', 'Horley', 'Redhill', 'Dorking',
  'Guildford', 'Farnham', 'Godalming', 'Haslemere',
  'Woking', 'Camberley', 'Leatherhead', 'Oxted',
];

const WHY_US = [
  {
    title: 'Specialists only.',
    italicAccent: 'Never general builders.',
    body: 'Every installer we refer works on residential driveway gates as their primary trade, with a verified history of completed Surrey projects before receiving a single enquiry.',
  },
  {
    title: 'Surrey planning knowledge.',
    italicAccent: 'AONB, Green Belt, conservation areas.',
    body: 'Surrey has more planning designations than most counties. Installers in our network know which rules apply where before they set foot on your driveway.',
  },
  {
    title: 'Free site survey.',
    italicAccent: 'No remote estimates.',
    body: 'Every installer we refer quotes after a proper site visit. You get a considered specification, not a phone estimate.',
  },
  {
    title: 'Three independent quotes.',
    italicAccent: 'You compare, you decide.',
    body: 'We match you with up to three specialists covering your area. They quote independently. There is no pressure from us or from them.',
  },
];

const HOW_IT_WORKS = [
  {
    n: 'I',
    title: 'Tell us about the project',
    body: 'Surrey postcode, gate type, rough budget. Two minutes. We use it to identify the right specialists for your specific site and specification.',
  },
  {
    n: 'II',
    title: 'We introduce the installers',
    body: 'Up to three vetted Surrey gate specialists whose experience matches your project. Each contacts you to arrange a free site survey at a time that suits you.',
  },
  {
    n: 'III',
    title: 'Review quotes and decide',
    body: 'You receive detailed written quotes after the surveys. Compare them on your terms. No obligation at any stage; no pressure from us.',
  },
];

export function HomeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={openModal} />

      <main className="flex-grow">

        {/* ============================================================
            EDITORIAL HERO
            H1 targets the primary query directly.
            Lede carries entity coverage for Google in natural prose.
            16:10 image keeps the CTA above the fold on mobile.
            ============================================================ */}
        <section className="editorial-container pt-6 pb-10">
          <h1 className="font-display text-[2.2rem] md:text-[2.8rem] leading-[0.98] tracking-tight text-teal-ink mb-4" style={{ fontWeight: 400 }}>
            Driveway Gates<br />
            in <span className="italic-voice">Surrey.</span>
          </h1>

          <p className="font-prose text-[17px] md:text-[18px] leading-[1.5] text-teal-ink/85 mb-3 max-w-prose-editorial">
            A vetted network of Surrey driveway gate installers. Hand-forged wrought iron in Weybridge and Cobham. Hardwood gates in Farnham, Guildford, and the Surrey Hills. Electric and sliding gates across the county.
          </p>
          <p className="font-prose text-[17px] md:text-[18px] leading-[1.5] text-teal-ink/85 mb-7 max-w-prose-editorial">
            Free site survey, three written quotes, no obligation.
          </p>

          {/* Hero image — 16:10 landscape. Uses Next.js Image for optimisation. */}
          <div className="relative w-full overflow-hidden mb-5" style={{ aspectRatio: '16/10' }}>
            <Image
              src="/images/gates/gate-wrought-iron-open-manor-brick-pillars.png"
              alt="Ornate wrought iron driveway gates opened between brick piers on a Surrey manor house"
              fill
              priority
              sizes="(min-width: 768px) 640px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-end mb-7">
            <div className="font-editorial italic text-[13px] text-teal-ink/70">
              Wrought iron installation, Weybridge
            </div>
          </div>

          <PrimaryCTA
            label="Get Three Free Quotes"
            onClick={openModal}
            leftMeta="Free site survey"
            rightMeta="Reply within 4 hours"
          />
        </section>

        {/* ============================================================
            SURREY CONTEXT — preserved from old copy, re-typeset.
            This replaces the old "Gate Installers in Surrey Who Actually
            Specialise in Gates" section.
            ============================================================ */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title={<>Gate installers in Surrey<br /><span className="italic-voice">who specialise in gates.</span></>}
              as="h2"
            />
            <div className="prose-editorial max-w-prose-editorial">
              <p>
                Surrey has no shortage of tradespeople who will quote for driveway gates. It has a much smaller number who do it as their primary trade, who understand the planning sensitivities of the Surrey Hills AONB and the county&apos;s conservation areas, and who can specify the kind of wrought iron, hardwood, and underground-motor installations that the premium end of the county expects.
              </p>
              <p>
                The gap between those two groups is where most gate problems originate. Posts set without adequate foundation for the motor load. Motors undersized for the gate weight. Automation commissioned without the <em>BS EN 12453</em> safety testing that a proper handover requires. We built this service to close that gap: every installer in our network is a gate specialist first, with verified project history before we refer a single enquiry their way.
              </p>
            </div>
            <div className="mt-7">
              <Button onClick={openModal} variant="primary" showArrow>
                Request Your Three Free Quotes
              </Button>
            </div>
          </div>
        </section>

        {/* ============================================================
            SERVICE INDEX
            Exact-match query language on every title. Internal links to
            service hubs. Each item names the cities where it's strongest.
            ============================================================ */}
        <section className="bg-paper">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title="Surrey gate services"
              subtitle="Six specialisms, one vetted network."
            />
            <div>
              {SERVICE_INDEX.map((s) => (
                <ServiceCard key={s.href} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            AREAS WE COVER
            16-city grid + "view all 37" anchor. Big internal-link boost.
            ============================================================ */}
        <section className="bg-white border-y border-teal-line">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title="Areas we cover"
              subtitle="Installers active across Surrey's boroughs."
            />
            <div className="grid grid-cols-2 gap-x-6 gap-y-0">
              {FEATURED_LOCATIONS.map((city) => (
                <LocationPill key={city} name={city} href={`/location/${toSlug(city)}/`} />
              ))}
            </div>
            <Link
              href="/location/"
              className="inline-flex items-center gap-1.5 mt-6 text-[13px] font-medium text-teal-brand hover:text-teal-ink transition-colors"
            >
              View all 37 Surrey locations <ArrowRight className="w-3 h-3" strokeWidth={2} />
            </Link>
          </div>
        </section>

        {/* ============================================================
            WHY HOMEOWNERS USE THIS SERVICE
            4 editorial pillars. Preserves the substance of the original
            "Why Us" section, re-voiced for the editorial register.
            ============================================================ */}
        <section className="bg-paper">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title="Why Surrey homeowners use this service"
              subtitle="Specialists, not generalists. Surrey-specific knowledge, not a national call centre."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-2">
              {WHY_US.map((w, i) => (
                <div key={i} className="py-5 border-t border-teal-ink">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-3">
                    {i === 0 ? 'One' : i === 1 ? 'Two' : i === 2 ? 'Three' : 'Four'}
                  </div>
                  <h3 className="font-display text-[1.4rem] leading-tight tracking-tight text-teal-ink mb-1" style={{ fontWeight: 500 }}>
                    {w.title}<br />
                    <span className="italic-voice">{w.italicAccent}</span>
                  </h3>
                  <p className="font-prose text-[16px] leading-[1.55] text-teal-ink/80 mt-2">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            HOW IT WORKS
            Three steps, numbered editorially.
            ============================================================ */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title="How it works"
              subtitle="Three steps. No fees. No obligation at any stage."
            />
            <div className="mt-2">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.n} className="py-6 border-b border-teal-line last:border-b-0 flex items-start gap-5">
                  <div className="font-display text-[2rem] leading-none text-accent flex-shrink-0" style={{ fontWeight: 300 }}>
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.35rem] leading-tight tracking-tight text-teal-ink mb-1" style={{ fontWeight: 500 }}>
                      {step.title}
                    </h3>
                    <p className="font-prose text-[16px] leading-[1.55] text-teal-ink/80">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button onClick={openModal} variant="primary" showArrow>
                Start Your Free Enquiry
              </Button>
            </div>
          </div>
        </section>

        {/* ============================================================
            FAQ
            Shared FAQAccordion component. Same data source as the
            server-rendered FAQPage JSON-LD.
            ============================================================ */}
        <section className="bg-paper">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title="Common questions"
              subtitle="About driveway gates in Surrey."
            />
            <FAQAccordion
              faqs={homepageFaqs.map(f => ({ q: f.question, a: f.answer }))}
              defaultOpenIndex={-1}
            />
          </div>
        </section>

        {/* ============================================================
            SECONDARY CTA CARD
            Bordered treatment. Final reminder before the footer.
            ============================================================ */}
        <section className="bg-white border-t border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <CTACard
              title="Ready for three installer quotes?"
              italicAccent="Surrey-wide."
              body="Tell us your postcode and gate type. We match you with three vetted Surrey specialists. Free site surveys, detailed written quotes, no obligation at any stage."
              ctaLabel="Request Your Quotes"
              onCtaClick={openModal}
            />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
