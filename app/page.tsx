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
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { LeadFormModal } from '@/components/LeadFormModal';
import { FAQSchema } from '@/components/FAQSchema';
import { siteConfig } from '@/data/site';

const topAreas = ['Chelmsford', 'Brentwood', 'Southend-on-Sea', 'Colchester', 'Epping', 'Basildon', 'Rayleigh', 'Billericay', 'Loughton', 'Chigwell', 'Shenfield', 'Maldon'];

const homepageFaqs = [
  {
    question: 'How much do driveway gates cost in Surrey?',
    answer: 'Surrey gate prices range considerably based on material, size, and automation spec. Hardwood swing gates start from around £2,500 installed. Electric swing gates with full automation typically fall between £3,500 and £10,000. Premium electric sliding gate systems with video intercom and smart access start from £4,500 and can exceed £12,000 for large bespoke installations. The single biggest variable is whether your gate is fabricated to a standard design or built entirely to specification. Most installers in our Surrey network offer 0% finance, so the upfront cost does not have to be the deciding factor.',
  },
  {
    question: 'Do I need planning permission for driveway gates in Surrey?',
    answer: 'Most residential driveway gates in Surrey do not require planning permission. Under permitted development, gates up to 2 metres tall that open inward onto your property are generally exempt. The threshold drops to 1 metre if your gate fronts a classified road or public highway. Properties that are listed, within a conservation area, or subject to an Article 4 direction face tighter restrictions. Several Surrey districts, including Epping Forest, Chelmsford, and Colchester, have specific design guidance in sensitive areas. Every installer we work with knows the local rules and will advise you during the site survey.',
  },
  {
    question: 'How long does a driveway gate installation take in Surrey?',
    answer: 'A standard residential installation takes between 2 and 4 working days from start to finish. Day one is groundwork: post holes, concrete foundations, and electrical conduit. Day two covers gate hanging, motor installation, and initial wiring. The final day handles commissioning, intercom setup, remote programming, and safety testing. Bespoke fabricated gates, particularly wrought iron or hardwood designs made to measure, typically require 3 to 6 weeks of lead time in the workshop before the installation date. Your installer will give you a precise programme at the site survey stage.',
  },
  {
    question: 'Which type of driveway gate works best for Surrey properties?',
    answer: 'The right gate depends on your driveway geometry, property style, and security priorities. Electric sliding gates are the strongest choice for short driveways, sloped approaches, and wide entrances over 4 metres, which are common on newer Surrey developments and rural plots. Electric swing gates suit properties with generous swing clearance and remain the most popular choice across the county. Hardwood gates in iroko or oak work beautifully on period homes, farmhouses, and barn conversions throughout rural Surrey. Steel and aluminium gates offer maximum longevity with minimal maintenance and suit modern builds from Brentwood to Colchester. A site survey is always the right starting point.',
  },
  {
    question: 'Can automation be added to my existing gates?',
    answer: 'In the majority of cases, yes. Existing swing or sliding gates can be retrofitted with an electric motor system provided the gate structure and hinges are in sound condition. The typical cost for a quality automation retrofit in Surrey is £1,200 to £3,500, depending on gate weight, type, and the access control package you choose. Installers will check hinge alignment, gate weight, and pillar integrity during the assessment visit. Worn hinges and misaligned posts are common on older installations and are straightforward to address before automation is fitted.',
  },
  {
    question: 'How does your installer matching service work?',
    answer: 'We operate as an independent matching service, not a gate installation company. Submit your enquiry with your Surrey postcode, gate type, and approximate budget. We identify up to three specialist installers from our vetted network who cover your area and have relevant experience with your gate type. Each installer contacts you directly to arrange a free site survey and provide a detailed written quote. There is no fee to use the service at any point. We receive a referral fee from the installer only once a project is confirmed and underway.',
  },
  {
    question: 'What should I look for when choosing a gate installer in Surrey?',
    answer: 'Track record is everything. Look for an installer who specialises in driveway gates rather than a general builder who takes occasional gate work. They should carry public liability insurance of at least £2 million, offer written warranties covering both the gate structure and the automation system separately, and be able to show you completed installations similar to your project. Ask specifically about their experience with your gate type. Every installer in our network is screened against these standards before we refer any enquiries to them.',
  },
  {
    question: 'Are electric driveway gates safe around children and pets?',
    answer: 'Electric gates installed to current UK standards are very safe. All automated gate systems must comply with BS EN 12453 and the Machinery Directive, which mandate safety edges on the leading face of the gate, photocell beams across the opening to detect obstructions, and auto-reverse functionality that stops and reverses the gate if it meets resistance. Competent installers commission and test every safety system before handover and provide documentation. Our network only includes firms who install and commission to the required standards.',
  },
  {
    question: 'What maintenance do driveway gates need?',
    answer: 'Annual servicing is the baseline for any automated gate system. A service covers motor lubrication, drive mechanism inspection, safety sensor calibration, hinge adjustment, track cleaning on sliding systems, battery backup testing, and a full structural check. Hardwood gates require re-oiling or re-staining every one to two years. Powder-coated metal gates need very little beyond an occasional wash with mild detergent. The cost of annual servicing in Surrey is typically £120 to £200, which is a fraction of what an unmaintained motor replacement costs.',
  },
  {
    question: 'What happens to my electric gates during a power cut?',
    answer: 'Every properly specified automated gate system includes a manual release that allows the gate to be operated by hand when mains power is unavailable. Most modern motor units also incorporate a battery backup module that maintains full automatic operation for between 20 and 50 cycles after the power fails. For rural Surrey properties where power interruptions are more frequent, your installer can specify a solar charging panel to keep the battery topped up indefinitely without relying on the mains supply at all.',
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
          '@type': 'LocalBusiness',
          '@id': siteConfig.url,
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          logo: `${siteConfig.url}/android-chrome-512x512.png`,
          image: `${siteConfig.url}/android-chrome-512x512.png`,
          areaServed: {
            '@type': 'AdministrativeArea',
            name: 'Surrey',
          },
          serviceType: [
            'Electric Sliding Gate Installation',
            'Electric Swing Gate Installation',
            'Wooden Driveway Gate Installation',
            'Metal Driveway Gate Installation',
            'Automated Gate Systems',
            'Gate Repair and Maintenance',
          ],
          priceRange: '££',
          currenciesAccepted: 'GBP',
          paymentAccepted: 'Cash, Credit Card, Bank Transfer, Finance',
        }) }}
      />
      <FAQSchema faqs={homepageFaqs} />
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">

        <Hero
          title="Driveway Gates Surrey: Vetted Installers, Free Quotes"
          subtitle="Compare experienced, fully insured driveway gate specialists across Surrey. Electric sliding gates, swing gates, hardwood, wrought iron, and automation for every property type and budget."
          image="/images/gates/gate-hero-wrought-iron-sunset-cobblestone.png"
          onOpenModal={() => setIsModalOpen(true)}
        />

        <TrustBadges />

        {/* Intro */}
        <section className="section-padding bg-white">
          <div className="container-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                  The Smarter Way to Find a Gate Installer in Surrey
                </h2>
                <div className="space-y-5 text-gray-600 leading-relaxed">
                  <p>
                    Finding a genuinely good gate installer in Surrey takes more than a Google search. The market is full of general builders who take occasional gate work alongside everything else. The results speak for themselves: misaligned posts, underpowered motors, and automation that fails within two years.
                  </p>
                  <p>
                    Driveway Gates Surrey exists to solve that problem. We have built a network of dedicated gate installation specialists, firms that do this work every day across every corner of the county. From the commuter belt in Brentwood and Loughton to the coastal properties of Frinton and Mersea Island, our installers understand Surrey driveways, Surrey ground conditions, and Surrey planning requirements.
                  </p>
                  <p>
                    Every firm in our network has completed a minimum of 50 residential gate installations, holds full public liability cover, and provides written warranties on both the gate and the automation. You get up to three independent quotes, a free site survey with each one, and no obligation to proceed. The matching service costs you nothing at any stage.
                  </p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary mt-8">
                  Get Your Free Quotes
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/gates/gate-wrought-iron-open-manor-tree-lined.png" alt="Ornate wrought iron driveway gates open on an Surrey estate" className="rounded-2xl object-cover w-full h-48 col-span-2" loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/gates/gate-aluminium-sliding-vertical-bar-stone-pillars.png" alt="Modern aluminium sliding gate between stone pillars" className="rounded-2xl object-cover w-full h-36" loading="lazy" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/gates/gate-wooden-oak-swing-cottage-flowers.png" alt="Hardwood iroko driveway gate on an Surrey country property" className="rounded-2xl object-cover w-full h-36" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Us */}
        <section className="section-padding bg-gray-50">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Why Surrey Homeowners Use Us</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">We do the vetting so you do not have to. Every installer in our network is screened before they receive a single referral.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Award className="w-6 h-6" />,
                  title: '50+ Installations Minimum',
                  desc: 'No general builders. No handymen who do the occasional gate. Every firm in our network specialises in residential gate installation and has the project history to prove it.',
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: 'Insured and Warranted',
                  desc: 'Full public liability cover as standard. Written warranties on the gate structure and the automation system are provided separately, not as a blanket guarantee that covers nothing.',
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: 'Survey Within the Week',
                  desc: 'Most Surrey installers in our network can offer a free site survey slot within 7 days, including evenings and Saturdays for working homeowners.',
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  title: 'Up to 3 Free Quotes',
                  desc: 'Compare independent quotes side by side. You choose who to go with, or nobody if the timing is not right. Zero pressure at every stage.',
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
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Gate Types We Cover Across Surrey</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Electric sliding, swing, hardwood, wrought iron, full automation retrofits, and repair. Specialist installers for every gate type and every Surrey property.</p>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Gate Installers Across the Whole County</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">From the M25 corridor in the west to the Surrey Hills in the east, our network covers every part of the county. Browse by area below.</p>
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
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Surrey Driveway Gate Installation Costs</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Realistic price ranges based on completed Surrey installations. Every project is different, and a site survey gives you the precise figure.</p>
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

        <Testimonials />

        {/* How It Works */}
        <section className="section-padding bg-gray-50">
          <div className="container-width">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-xl mx-auto">Three steps from enquiry to a free site survey with a vetted Surrey gate installer. The whole process takes less than two minutes to start.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Submit Your Enquiry',
                  desc: 'Tell us your Surrey postcode, the gate type you are considering, and your approximate budget. No commitment required. We just need enough information to make a good match.',
                },
                {
                  step: '2',
                  title: 'We Match You With Specialists',
                  desc: 'We identify up to three vetted installers from our Surrey network who cover your area and have specific experience with your gate type. They reach out to arrange a free site survey.',
                },
                {
                  step: '3',
                  title: 'Compare Quotes and Choose',
                  desc: 'Each installer visits your property, assesses the site, and provides a detailed written quote. You compare them on your own terms with no pressure and no obligation.',
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
                  Driveway Gates Built for Surrey Properties
                </h2>
                <div className="space-y-5 text-gray-600 leading-relaxed">
                  <p>
                    Surrey is one of the most varied counties in the south of England for residential property. The western edge, covering Loughton, Chigwell, and Buckhurst Hill, sits in the Green Belt and is characterised by large detached homes on generous plots, where wrought iron estate gates and full automation with video intercom are the standard expectation.
                  </p>
                  <p>
                    Mid Surrey, covering Chelmsford, Brentwood, and Shenfield, mixes modern new-build developments with Victorian and Edwardian properties, creating demand for everything from slim aluminium sliding gates on compact driveways to bespoke hardwood gates on older homes with period detailing.
                  </p>
                  <p>
                    Coastal and rural Surrey presents different challenges entirely. Salt air demands the right material specification, rural plot sizes often allow for grander gate designs, and agricultural ground conditions require experienced groundwork. Our installers know these differences and account for them from the first site visit.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'West Surrey: Loughton, Chigwell, Epping, Waltham Abbey', detail: 'Large plots, Green Belt properties, high-specification automation and video access control' },
                  { label: 'Mid Surrey: Chelmsford, Brentwood, Shenfield, Ingatestone', detail: 'Period and new-build mix, sliding and swing gates, strong demand for bespoke hardwood' },
                  { label: 'South Surrey: Rayleigh, Billericay, Basildon, Southend', detail: 'Urban and suburban driveways, space-efficient sliding systems, competitive pricing' },
                  { label: 'North Surrey: Colchester, Halstead, Saffron Walden', detail: 'Rural and market town properties, traditional wrought iron and hardwood popular' },
                  { label: 'Coastal Surrey: Mersea, Frinton, Burnham-on-Crouch', detail: 'Salt-resistant material specification essential, rural plot scale, larger gate designs' },
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
