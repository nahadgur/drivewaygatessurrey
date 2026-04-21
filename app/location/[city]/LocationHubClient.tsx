// app/location/[city]/LocationHubClient.tsx
'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { services } from '@/data/services';
import { getCityBySlug } from '@/data/locations';
import { FAQS_SERVICES, FAQS_LOCATION } from '@/data/site';
import { isServiceLocationIndexed } from '@/data/indexing-tiers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FAQ } from '@/components/FAQ';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { LeadFormModal } from '@/components/LeadFormModal';

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
  // create internal links from indexed pages to noindex pages (waste of
  // link equity, weaker quality signal).
  const indexedServicesForCity = services.filter((s) =>
    isServiceLocationIndexed(s.slug, params.city),
  );

  const cityFaqs = [...FAQS_LOCATION, ...FAQS_SERVICES];

  return (
    <>
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
                  Surrey gate specialists serving {cityName}. Every installer in our network focuses on residential gates as their primary trade, with a verified project history before we refer a single enquiry their way.
                </p>
              </div>
              <div>
                <HeroLeadForm city={cityName} />
              </div>
            </div>
          </div>
        </section>

        <div className="container-width py-16 max-w-3xl">
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
              Driveway Gate Installers in {cityName}
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-4 text-base leading-relaxed">
              {intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {indexedServicesForCity.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Gate Services Available in {cityName}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {indexedServicesForCity.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}/${params.city}/`}
                    className="block group bg-white rounded-2xl border border-gray-100 hover:border-brand-300 hover:shadow-md transition-all p-5"
                  >
                    <h3 className="text-lg font-display font-bold text-gray-900 group-hover:text-brand-700 mb-1.5">
                      {service.title} in {cityName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                    <span className="text-brand-600 font-medium text-sm inline-flex items-center">
                      Get free quotes <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mb-12">
            <FAQ faqs={cityFaqs} title={`Driveway Gates in ${cityName}: Common Questions`} />
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
