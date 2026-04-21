// app/services/[serviceSlug]/[locationSlug]/ServiceLocationClient.tsx
'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { CheckCircle, MapPin } from 'lucide-react';
import { getServiceBySlug } from '@/data/services';
import { getCityBySlug } from '@/data/locations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { FAQ } from '@/components/FAQ';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadFormModal } from '@/components/LeadFormModal';

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
        <section className="bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.image} alt="" className="w-full h-full object-cover opacity-50" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-gray-900/30" />
          </div>
          <div className="container-width py-12 md:py-20 relative z-10">
            <Breadcrumbs items={[
              { label: 'Gate Types', href: '/services/' },
              { label: service.title, href: `/services/${service.slug}/` },
              { label: cityName }
            ]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-brand-500/30">
                  <MapPin className="w-4 h-4" /> Vetted Installers in {cityName}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
                  {service.title} in <span className="text-brand-400">{cityName}</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Surrey {service.title.toLowerCase()} specialists covering {cityName}. Site survey at no charge, written quotes, no obligation to proceed.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    `${service.title} specialists in ${cityName}, verified and active in Surrey`,
                    'Up to three independent quotes, each with a free site survey',
                    'Insured, warranted, and commissioned to BS EN 12453 as standard',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-brand-400 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <HeroLeadForm city={cityName} service={service.title} />
              </div>
            </div>
          </div>
        </section>

        <div className="container-width py-16 max-w-3xl">
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">
              {service.title} in {cityName}: What to Expect
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-4 text-base leading-relaxed">
              {intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {service.faqs.length > 0 && (
            <div className="mb-12">
              <FAQ faqs={service.faqs} title={`${service.title} in ${cityName}: Common Questions`} />
            </div>
          )}

          <div className="bg-brand-900 rounded-2xl p-8 md:p-12 text-center mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Get {service.title} Quotes in {cityName}</h2>
            <p className="text-brand-200 mb-8 max-w-2xl mx-auto">Submit your enquiry in under two minutes. We will match you with up to three vetted {cityName} installers for free site surveys, written quotes, and no obligation at any stage.</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-white text-brand-900 font-bold text-lg py-4 px-10 rounded-xl hover:bg-brand-50 transition-colors">Get Your Free Quotes</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
