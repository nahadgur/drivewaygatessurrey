// app/location/[city]/page.tsx
'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight, CheckCircle, Clock, Shield, Star } from 'lucide-react';
import { services } from '@/data/services';
import { getCityBySlug } from '@/data/locations';
import { FAQS_SERVICES, FAQS_LOCATION } from '@/data/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQ } from '@/components/FAQ';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { LeadFormModal } from '@/components/LeadFormModal';
import { PricingSection } from '@/components/PricingSection';
import { NearbyAreasGrid } from '@/components/NearbyAreasGrid';
import { Testimonials } from '@/components/Testimonials';
import { FAQSchema } from '@/components/FAQSchema';
import { siteConfig } from '@/data/site';

export default function CityPage({ params }: { params: { city: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cityName = getCityBySlug(params.city);
  if (!cityName) notFound();

  const cityFaqs = [...FAQS_LOCATION, ...FAQS_SERVICES];

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `Driveway Gate Installers in ${cityName}`,
    url: `${siteConfig.url}/location/${params.city}/`,
    description: `Find vetted driveway gate installers in ${cityName}, Surrey. Free site surveys, written quotes, and up to 3 options with no obligation.`,
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: { '@type': 'State', name: 'Surrey' },
    },
    serviceType: [
      'Electric Sliding Gate Installation',
      'Electric Swing Gate Installation',
      'Wooden Driveway Gate Installation',
      'Metal Driveway Gate Installation',
      'Gate Automation Installation',
      'Gate Repair and Maintenance',
    ],
    priceRange: '££',
  };

  return (
    <>
      <FAQSchema faqs={cityFaqs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">

        <section className="bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-900/30 via-gray-900/0 to-transparent pointer-events-none" />
          <div className="container-width py-12 md:py-20 relative z-10">
            <Breadcrumbs items={[{ label: 'Locations', href: '/location/' }, { label: cityName }]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-brand-500/30">
                  <MapPin className="w-4 h-4" /> Vetted Gate Installers in {cityName}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
                  Driveway Gates in <span className="text-brand-400">{cityName}</span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Compare the most experienced driveway gate installers in {cityName}. Every installer in our network has completed 50 or more residential gate projects. Get matched for free below.
                </p>
              </div>
              <div>
                <HeroLeadForm city={cityName} />
              </div>
            </div>
          </div>
        </section>

        <div className="container-width py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                  Driveway Gate Installers in {cityName}
                </h2>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  <p>
                    Finding the right gate installer in {cityName} takes more than a quick search. The residential gate market in Surrey includes both dedicated specialists and general builders who take gate work occasionally. The difference in outcome is significant: a specialist brings experience with ground conditions, motor specification, planning compliance, and post engineering that a generalist simply does not have. Every installer we refer in {cityName} has completed a minimum of 50 residential gate installations and carries full public liability insurance as standard.
                  </p>
                  <p>
                    The process starts with a free site survey. Your installer visits the property, measures the opening, checks the available swing or slide clearance, assesses ground and foundation conditions, and discusses the material and design options that suit the property and budget. You receive a detailed written quote covering all elements of the installation with no hidden additions. There is no fee for the survey and no obligation to proceed.
                  </p>
                </div>
              </section>

              <section className="mb-16">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Gate Types Available in {cityName}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(service => (
                    <Link key={service.id} href={`/services/${service.slug}/${params.city}/`} className="block group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      <div className="h-36 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-display font-bold text-gray-900 group-hover:text-brand-600 mb-1.5">{service.title} in {cityName}</h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{service.description}</p>
                        <span className="text-brand-600 font-medium text-sm flex items-center">Get free quotes <ArrowRight className="w-4 h-4 ml-1" /></span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <PricingSection cityName={cityName} />

              <section className="mb-16">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">Why {cityName} Homeowners Use Our Service</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: <Star className="w-5 h-5" />, title: 'Specialists, Not Generalists', desc: `Every installer we refer in ${cityName} focuses on residential gate work. No general builders, no occasional gate fitters. Gate installation is what they do every day, and the quality of their work reflects that.` },
                    { icon: <Shield className="w-5 h-5" />, title: 'Insured and Under Warranty', desc: `Public liability cover is mandatory for every installer in our ${cityName} network. Written warranties on the gate structure and the automation system are provided separately on every job, not as a combined catch-all.` },
                    { icon: <Clock className="w-5 h-5" />, title: 'Survey Booked Within the Week', desc: `Most installers covering ${cityName} can offer a free site survey slot within 7 days. Evening and Saturday appointments are available for homeowners who cannot take time off during the week.` },
                    { icon: <CheckCircle className="w-5 h-5" />, title: 'No Cost, No Obligation', desc: `The matching service is free at every stage. The site survey is free. The written quote is free. You choose whether and when to proceed with no pressure from us or the installer at any point.` },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-brand-100 p-2 rounded-lg text-brand-600 flex-shrink-0 h-fit">{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <NearbyAreasGrid cityName={cityName} />

              <div className="mb-12"><FAQ faqs={[...FAQS_LOCATION, ...FAQS_SERVICES]} title={`Driveway Gates in ${cityName}: Common Questions`} /></div>

              <section className="mb-16">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">What Homeowners Are Saying</h2>
                <Testimonials limit={3} />
              </section>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Get Matched in {cityName}</h3>
                  <p className="text-gray-600 text-sm mb-6">Tell us what you need and we will connect you with up to 3 vetted installers near {cityName}. Completely free, no strings attached.</p>
                  <button onClick={() => setIsModalOpen(true)} className="block w-full btn-primary text-center">Find an Installer</button>
                  <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                    {[
                      { icon: <Clock className="w-4 h-4 text-brand-500" />, text: "Surveys available this week" },
                      { icon: <Shield className="w-4 h-4 text-brand-500" />, text: "50+ installs per installer" },
                      { icon: <Star className="w-4 h-4 text-brand-500" />, text: "Full insurance and warranties" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="bg-brand-100 p-1.5 rounded-full">{item.icon}</div>
                        <span className="text-sm font-medium text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-brand-900 text-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-display font-bold mb-3">From &pound;99/month</h3>
                  <p className="text-brand-100 text-sm mb-4">0% finance available at most {cityName} installers. Spread the cost over 6 to 36 months with nothing to pay upfront at many providers.</p>
                  <button onClick={() => setIsModalOpen(true)} className="block w-full bg-white text-brand-900 text-center font-bold py-3 px-6 rounded-xl hover:bg-brand-50 transition-colors text-sm">Check Eligibility</button>
                </div>
              </div>
            </aside>
          </div>

          <div className="bg-brand-900 rounded-2xl p-8 md:p-12 text-center mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Get Matched With Gate Installers in {cityName}</h2>
            <p className="text-brand-200 mb-8 max-w-2xl mx-auto">Submit your enquiry in under two minutes. We will identify up to three vetted installers covering {cityName} and connect you directly. Free site surveys, written quotes, no obligation at any stage.</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-white text-brand-900 font-bold text-lg py-4 px-10 rounded-xl hover:bg-brand-50 transition-colors">Get Your Free Quotes</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
