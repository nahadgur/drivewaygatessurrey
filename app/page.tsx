// app/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, MapPin, Shield, Star, Clock, Award } from 'lucide-react';
import { services } from '@/data/services';
import { toSlug } from '@/data/locations';
import { pricingTiers, financeInfo } from '@/data/pricing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { TrustBadges } from '@/components/TrustBadges';
import { FAQ } from '@/components/FAQ';
import { LeadFormModal } from '@/components/LeadFormModal';
import { FAQSchema } from '@/components/FAQSchema';
import { siteConfig } from '@/data/site';

const topAreas = ['Guildford', 'Woking', 'Reigate', 'Epsom', 'Farnham', 'Camberley', 'Weybridge', 'Cobham', 'Esher', 'Leatherhead', 'Dorking', 'Haslemere'];

const homepageFaqs = [
  {
    question: 'How much do driveway gates cost in Surrey?',
    answer: 'Surrey sits above the national average for gate installation costs, reflecting both the premium end of the residential market and the planning complexity that many projects involve. Expect to pay from £3,000 for a basic hardwood swing gate installation, £4,000 to £12,000 for electric swing gates, and £5,000 to £13,000 for electric sliding systems. Wrought iron gates in the Weybridge, Cobham, and Esher market regularly exceed £15,000 for full estate-grade specifications with underground motors and video access management. The county has a genuine premium tier that most other counties do not. A site survey is the only way to get a reliable figure for your specific project.',
  },
  {
    question: 'Do I need planning permission for driveway gates in Surrey?',
    answer: 'Most Surrey homeowners do not need planning permission for standard driveway gates. Permitted development covers gates up to 2 metres, or 1 metre where the gate fronts a classified road. However, Surrey has an unusually high density of planning designations: the Surrey Hills AONB covers a large part of the county, Green Belt applies to most of the remaining rural land, and conservation areas exist throughout every district. Listed buildings add a further layer of consent requirements. If your property sits within any of these designations, pre-application advice from the relevant planning authority is the right first step. The installers we work with know the local rules and will confirm the position at the site survey.',
  },
  {
    question: 'How long does a driveway gate installation take in Surrey?',
    answer: 'The physical installation takes 2 to 4 days on a typical residential project. Groundwork (foundations, post setting, and conduit) is done first and needs time to cure before the gate is hung. The gate, motor, and access control equipment follow. Where gates are fabricated to a bespoke design, which is the norm for wrought iron and hardwood in Surrey, the workshop lead time is 3 to 6 weeks before the installation date. Your installer will give you a precise programme at the survey stage, including fabrication lead time if applicable.',
  },
  {
    question: 'Which type of driveway gate works best in Surrey?',
    answer: 'It depends on which part of Surrey and what kind of property. In North Surrey (Weybridge, Cobham, Esher, Leatherhead), wrought iron swing gates with underground motors are the dominant specification. In the Surrey Hills and the AONB villages, hardwood gates in iroko or oak are the natural choice and often the only material that satisfies planning. In the commuter belt towns (Woking, Camberley, Reigate, Epsom), sliding and swing gates in fabricated steel or aluminium cover most of the market. Sloped driveways across the North Downs are common and often require a sliding system or specific motor engineering that an installer with Surrey experience will know how to handle.',
  },
  {
    question: 'Can automation be added to my existing gates?',
    answer: 'Yes, in most cases. Existing swing or sliding gates can be retrofitted with a motor system if the gate structure and hinges are sound and the posts have adequate foundations. Surrey installers carry out a lot of retrofit work, particularly in the North Surrey market where gates are often wrought iron and structurally excellent but manually operated. The typical cost for a quality retrofit in Surrey is £1,400 to £4,000, depending on gate weight, motor type, and what access control you add. Underground motors are available on most retrofit projects with reasonable post access. Your installer will assess feasibility and confirm the right motor at the survey.',
  },
  {
    question: 'How does the installer matching service work?',
    answer: 'We are a matching service, not a gate company. You submit your details (Surrey postcode, gate type, approximate budget) and we identify up to three specialist gate installers from our vetted network who cover your area and have relevant experience with your project type. Each installer contacts you directly to arrange a free site survey. You receive a detailed written quote from each one and choose who to proceed with, or nobody if the timing is not right. There is no fee to use the service at any point. We receive a referral fee from the installer after a project is confirmed.',
  },
  {
    question: 'What should I look for in a Surrey gate installer?',
    answer: 'Specialisation matters more than anything else. Look for a firm that installs gates as their primary trade and has a verifiable history of completed residential projects in Surrey. They should carry public liability insurance of at least £2 million, provide written warranties covering the gate and the automation separately, and be able to demonstrate specific experience with your gate type, whether that is wrought iron, hardwood in an AONB setting, or a sliding system on a sloped driveway. Surrey-specific planning knowledge is a genuine differentiator: an installer who has worked regularly in the county will know the AONB rules, the conservation area requirements, and how to design a gate that will pass local authority scrutiny.',
  },
  {
    question: 'Are electric driveway gates safe for children and pets?',
    answer: 'When installed and commissioned to UK standards they are very safe. BS EN 12453 and the Machinery Directive both apply to automated gate systems and mandate photocell beams across the full opening, safety edges on the leading gate face, and auto-reverse that stops and reverses the gate if it meets resistance mid-travel. A competent installer commissions and tests every safety system before handover and provides written documentation of the test results. The installers in our Surrey network commission to the required standard on every project as a non-negotiable part of handover.',
  },
  {
    question: 'What maintenance do electric gates need?',
    answer: 'Annual servicing is the baseline for any automated gate system. A proper service covers motor and gearbox lubrication, drive mechanism inspection, hinge condition and adjustment, safety sensor recalibration and testing, track cleaning on sliding systems, battery backup load testing, and a full structural check of the gate and posts. Hardwood gates need re-oiling every one to two years. Powder-coated metal gates need nothing beyond an occasional wash. The cost of annual servicing in Surrey is typically £130 to £220. Skipping servicing and waiting for a failure costs significantly more and usually involves an emergency callout on top of the repair.',
  },
  {
    question: 'What happens to my gates during a power cut?',
    answer: 'Every properly specified automated gate includes a manual release that allows hand operation when mains power is unavailable. Most modern motor units also carry a battery backup module that maintains automatic operation for 20 to 50 gate cycles after the power fails, which covers most short outages without switching to manual. For rural Surrey properties on less reliable supply networks, your installer can specify a solar charging panel to keep the battery topped up independently of the mains supply. This is a common addition on installations in the Surrey Hills and the more remote Green Belt villages.',
  },
];

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${siteConfig.url}/#referral-service`,
          name: 'Driveway gate installer referral and matching service',
          description: 'Free service matching Surrey homeowners with vetted, insured driveway gate installers. Up to three quotes from independent specialists, no obligation.',
          provider: { '@id': `${siteConfig.url}/#organization` },
          url: siteConfig.url,
          areaServed: {
            '@type': 'AdministrativeArea',
            name: 'Surrey, United Kingdom',
          },
          serviceType: 'Driveway gate installer referral and matching service',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'GBP',
            description: 'Free matching service for homeowners. You are connected with an independent UK gate installer who agrees their own fees directly with you.',
          },
        }) }}
      />
      <FAQSchema faqs={homepageFaqs} />
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">

        <Hero
          title="Driveway Gates Surrey: Specialist Installers, Free Quotes"
          subtitle="Surrey gate specialists for every property type, from wrought iron estate gates in Weybridge and Cobham to hardwood installations in the Surrey Hills AONB. Free site surveys, no obligation."
          image="/images/gates/gate-wrought-iron-open-manor-brick-pillars.png"
          onOpenModal={() => setIsModalOpen(true)}
        />

        <TrustBadges />

        {/* Intro */}
        <section className="section-padding bg-white">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                  Gate Installers in Surrey Who Actually Specialise in Gates
                </h2>
                <div className="space-y-5 text-gray-600 leading-relaxed">
                  <p>
                    Surrey has no shortage of tradespeople who will quote for driveway gates. It has a much smaller number who do it as their primary trade, understand the planning sensitivities of the Surrey Hills AONB and the county&apos;s conservation areas, know how to handle the sloped driveways common across the North Downs, and can specify the kind of wrought iron and underground motor installations that the premium end of the county market expects.
                  </p>
                  <p>
                    The gap between those two groups is where most gate problems originate. Posts set without adequate foundation for the motor load. Motors undersized for the gate weight. Automation commissioned without the BS EN 12453 safety testing that a proper handover requires. We built this service to close that gap: every installer in our network is a gate specialist first, with a verified history of completed residential projects before we refer a single enquiry their way.
                  </p>
                  <p>
                    Submit your details and we match you with up to three vetted Surrey installers who cover your area and have relevant experience with your gate type. Each one offers a free site survey and a detailed written quote. You compare them and decide. There is no cost to you at any stage and no obligation to proceed.
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-8">
                  Get Your Free Quotes
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/gates/gate-wrought-iron-open-stone-pillars-lanterns-estate.png" alt="Ornate wrought iron driveway gates open on an Surrey estate" className="rounded-2xl object-cover w-full h-48 col-span-2" loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/gates/gate-aluminium-sliding-horizontal-modern-new-build.png" alt="Modern aluminium sliding gate between stone pillars" className="rounded-2xl object-cover w-full h-36" loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/gates/gate-wooden-painted-cream-roses-surrey-hills.png" alt="Hardwood iroko driveway gate on an Surrey country property" className="rounded-2xl object-cover w-full h-36" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="section-padding bg-gray-50">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Why Surrey Homeowners Use This Service</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Surrey has plenty of people who will quote for gates. Finding one who genuinely specialises, knows the county&apos;s planning rules, and will still be answering the phone in five years is the hard part. We do that work for you.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Award className="w-6 h-6" />,
                  title: 'Gate Specialists Only',
                  desc: 'Every firm in our network installs gates as their primary trade. We do not refer general builders, landscapers, or groundwork contractors who take gate work when it comes their way.',
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: 'Surrey Planning Knowledge',
                  desc: 'AONB, Green Belt, conservation areas, listed buildings. Surrey has more planning designations than most counties. Installers in our network know which rules apply where before they arrive on site.',
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: 'Free Survey, No Commitment',
                  desc: 'Every installer in our network carries out a proper site survey before quoting. No remote estimates, no surprises on the day. You decide whether to proceed after you have seen the quote.',
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  title: 'Three Independent Quotes',
                  desc: 'We match you with up to three specialists covering your area. You own the process: compare quotes on your own terms with no pressure from us or from the installers we introduce.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <div className="bg-brand-100 p-3 rounded-xl text-brand-600 w-fit mb-4">{item.icon}</div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gate Types */}
        <section className="section-padding bg-white">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Every Gate Type, Every Surrey Property</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Wrought iron for the stockbroker belt. Hardwood for the Hills. Aluminium sliding for compact commuter driveways. Specialists for every material and every brief.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <Link key={service.id} href={`/services/${service.slug}/`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-display font-bold text-gray-900 group-hover:text-brand-600 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{service.description}</p>
                    <span className="text-brand-600 font-medium text-sm flex items-center">
                      Find Surrey installers <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Areas */}
        <section className="section-padding bg-gray-50">
          <div className="container-width">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Covering Every Part of Surrey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">North Surrey stockbroker belt to the Surrey Hills AONB in the south. Farnham in the west to Oxted and Caterham in the east. Our network covers the whole county.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
              {topAreas.map(area => (
                <Link
                  key={area}
                  href={`/location/${toSlug(area)}/`}
                  className="group flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-brand-300 hover:bg-brand-50 transition-all shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-brand-700">Gates in {area}</span>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link href="/location/" className="btn-secondary">
                Browse All Surrey Locations
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="section-padding bg-white">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">What Surrey Gate Installations Actually Cost in 2026</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Prices based on completed Surrey installations. Surrey sits above the national average and these ranges reflect the county market, not generic UK figures.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pricingTiers.map(tier => (
                <div key={tier.slug} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-display font-bold text-gray-900 mb-2">{tier.treatment}</h3>
                  <p className="text-2xl font-bold text-brand-600 mb-1">
                    £{tier.priceFrom.toLocaleString()} <span className="text-base text-gray-400 font-normal">to</span> £{tier.priceTo.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">{tier.alignerSets} · {tier.typicalDuration}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{tier.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-brand-900 rounded-2xl p-6 md:p-10 text-white text-center">
              <h3 className="text-2xl font-display font-bold mb-2">Spread the Cost From £99 Per Month</h3>
              <p className="text-brand-200 text-sm mb-6 max-w-xl mx-auto">0% interest finance is available through most Surrey installers in our network. Spread the cost over 6 to 36 months with nothing to pay upfront. Subject to status and approval.</p>
              <button onClick={() => setIsModalOpen(true)} className="bg-white text-brand-900 font-bold py-3 px-8 rounded-xl hover:bg-brand-50 transition-colors">
                Check Finance Options
              </button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding bg-gray-50">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-xl mx-auto">From your first enquiry to a written quote in hand: three straightforward steps, no fees, no obligation at any point.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Tell Us About Your Project',
                  desc: 'Give us your postcode, the type of gate you have in mind, and a rough budget range. Two minutes is all it takes. We use that information to identify the right specialists for your specific site and specification.',
                },
                {
                  step: '2',
                  title: 'We Introduce the Right Installers',
                  desc: 'We select up to three vetted Surrey gate specialists whose experience matches your project. Each one contacts you to arrange a free site visit at a time that suits you, with no cold calls and no salespeople.',
                },
                {
                  step: '3',
                  title: 'Review Quotes and Decide',
                  desc: 'After the site surveys, each installer provides a detailed written quote. You compare them at your own pace. There is no obligation to proceed and no pressure from us at any stage.',
                },
              ].map(item => (
                <div key={item.step} className="text-center">
                  <div className="w-14 h-14 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-5">{item.step}</div>
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button onClick={() => setIsModalOpen(true)} className="btn-primary text-lg !px-8 !py-4">
                Start Your Free Enquiry
              </button>
              <p className="text-gray-500 text-sm mt-3">Free for homeowners. No fees. No obligation.</p>
            </div>
          </div>
        </section>

        {/* Surrey Context */}
        <section className="section-padding bg-white">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                  Surrey Has More Planning Designations Than Most Counties. Installers in Our Network Know Them.
                </h2>
                <div className="space-y-5 text-gray-600 leading-relaxed">
                  <p>
                    The Surrey Hills AONB covers a broad sweep of the county from the Hampshire border to the Kent border. Green Belt designation applies to the majority of the county&apos;s land area. Conservation areas exist in every district town and in dozens of villages. Listed buildings are widespread across the rural parishes and historic market towns of Guildford, Farnham, Godalming, and Reigate. A gate project in Surrey is frequently a planning question as much as an engineering one.
                  </p>
                  <p>
                    Installers in our network who work regularly in the AONB, the Green Belt villages, and the conservation area streets of the county&apos;s towns understand which authority to approach, which permitted development rules apply, and how to design a gate that will pass scrutiny in a designated area without compromising on what the homeowner actually wants.
                  </p>
                  <p>
                    Beyond planning, Surrey&apos;s terrain creates installation requirements that flat-county experience does not prepare an installer for. Sloped driveways across the North Downs and Surrey Hills need specific hinge geometry and motor specification. Clay and chalk subsoils in different parts of the county affect foundation design. Properties on the premium North Surrey belt carry expectations around underground motors, wrought iron, and access management that a general builder&apos;s gate experience does not cover.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'North Surrey: Weybridge, Cobham, Esher, Leatherhead', detail: 'Stockbroker belt properties, high-specification wrought iron and underground motors, premium automation' },
                  { label: 'West Surrey: Guildford, Godalming, Farnham, Haslemere', detail: 'AONB and conservation area properties, hardwood and wrought iron, planning-sensitive installations' },
                  { label: 'Central Surrey: Woking, Camberley, Frimley, Bagshot', detail: 'Commuter belt mix of period and modern, sliding and swing gates, full automation popular' },
                  { label: 'East Surrey: Reigate, Redhill, Oxted, Caterham', detail: 'North Downs properties, period homes, conservation villages, bespoke hardwood and metal gates' },
                  { label: 'South Surrey: Dorking, Cranleigh, Horley, Haslemere', detail: 'Surrey Hills AONB, rural barn conversions and farmhouses, hardwood and traditional ironwork' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <CheckCircle className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                      <p className="text-gray-600 text-sm">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-padding bg-gray-50">
          <div className="container-width max-w-3xl">
            <FAQ faqs={homepageFaqs} title="Driveway Gates in Surrey: Frequently Asked Questions" />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="section-padding bg-brand-900 text-white">
          <div className="container-width text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Ready to Get Quotes for Your Surrey Property?</h2>
            <p className="text-brand-200 max-w-2xl mx-auto mb-8">Submit your enquiry in under two minutes. We will match you with up to three vetted Surrey gate installers for free site surveys, detailed written quotes, and no obligation.</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-white text-brand-900 font-bold text-lg py-4 px-10 rounded-xl hover:bg-brand-50 transition-colors">
              Get Free Quotes Now
            </button>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
