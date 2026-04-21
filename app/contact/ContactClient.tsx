// app/contact/ContactClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Shield, Users, HelpCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadFormModal } from '@/components/LeadFormModal';
import { siteConfig } from '@/data/site';

export function ContactClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reasonCards = [
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: 'General enquiries',
      body: 'Questions about how the matching service works, what installers are available in your area, or anything else about using this site. The fastest way to get matched with installers is the main enquiry form.',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Privacy and data',
      body: 'Requests to access, correct, or delete your data, or to withdraw consent. We respond to all privacy requests within one month, as required under UK GDPR. See our privacy policy for detail on your rights.',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Installers applying to join',
      body: 'If you are a Surrey gate installer interested in joining our network, email us with a summary of your company, your service area, your insurance position, and two examples of recent residential gate installations.',
    },
  ];

  const steps = [
    {
      step: '1',
      title: 'Submit your enquiry',
      body: 'Use the enquiry form on any page. We need your name, phone, email, Surrey postcode, and the type of gate service you are considering.',
    },
    {
      step: '2',
      title: 'We identify the right installers',
      body: 'We match your enquiry against our Surrey network and shortlist up to three gate specialists whose experience, service area, and capacity fit your project.',
    },
    {
      step: '3',
      title: 'Installers contact you',
      body: 'Each matched installer contacts you directly to arrange a free site survey at a time that suits you. There is no cost to you at this stage and no obligation.',
    },
    {
      step: '4',
      title: 'You choose',
      body: 'After the surveys, each installer sends you a detailed written quote. You compare them at your own pace and proceed with whichever one suits you, or with none.',
    },
  ];

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow bg-white">
        <div className="container-width py-10 md:py-14 max-w-4xl">
          <Breadcrumbs items={[{ label: 'Contact' }]} />

          <div className="mt-6 mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">Contact Driveway Gates Surrey</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              The fastest way to get matched with vetted Surrey gate installers is the enquiry form on any page. For everything else, email us.
            </p>
          </div>

          <div className="mb-12 p-6 md:p-8 bg-brand-50 rounded-2xl border border-brand-100 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="bg-white p-3 rounded-xl text-brand-600 border border-brand-100">
              <Mail className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-display font-bold text-gray-900 mb-1">Email us directly</h2>
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-600 font-semibold text-lg hover:underline">
                {siteConfig.contactEmail}
              </a>
              <p className="text-sm text-gray-600 mt-2">
                We respond within 1 working day. For existing enquiries, please quote the postcode you submitted with so we can find your record.
              </p>
            </div>
          </div>

          <section className="mb-14">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">What to email us about</h2>
            <div className="grid gap-5 md:grid-cols-3">
              {reasonCards.map((card) => (
                <div key={card.title} className="p-5 rounded-2xl border border-gray-100 bg-gray-50">
                  <div className="bg-brand-100 text-brand-600 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
                    {card.icon}
                  </div>
                  <h3 className="font-display font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">How the matching process works</h2>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Four straightforward steps, no fees to you at any point.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {steps.map((s) => (
                <div key={s.step} className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-white">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center">
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-gray-900 mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <button onClick={() => setIsModalOpen(true)} className="btn-primary text-base !px-8 !py-3">
                Start Your Free Enquiry
              </button>
            </div>
          </section>

          <div className="pt-6 border-t border-gray-200 text-sm">
            <Link href="/privacy/" className="text-brand-600 hover:underline mr-6">Privacy Policy</Link>
            <Link href="/terms/" className="text-brand-600 hover:underline">Terms of Use</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
