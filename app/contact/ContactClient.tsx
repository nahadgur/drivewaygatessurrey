// app/contact/ContactClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Shield, Users, HelpCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadFormModal } from '@/components/LeadFormModal';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { siteConfig } from '@/data/site';

export function ContactClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reasonCards = [
    {
      icon: <HelpCircle className="w-5 h-5" strokeWidth={1.5} />,
      title: 'General enquiries',
      body: 'Questions about how the matching service works, what installers are available in your area, or anything else about using this site. The fastest way to get matched with installers is the main enquiry form.',
    },
    {
      icon: <Shield className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Privacy and data',
      body: 'Requests to access, correct, or delete your data, or to withdraw consent. We respond to all privacy requests within one month, as required under UK GDPR. See our privacy policy for detail on your rights.',
    },
    {
      icon: <Users className="w-5 h-5" strokeWidth={1.5} />,
      title: 'Installers applying to join',
      body: 'If you are a Surrey gate installer interested in joining our network, email us with a summary of your company, your service area, your insurance position, and two examples of recent residential gate installations.',
    },
  ];

  const steps = [
    {
      n: 'I',
      title: 'Submit your enquiry',
      body: 'Use the enquiry form on any page. We need your name, phone, email, Surrey postcode, and the type of gate service you are considering.',
    },
    {
      n: 'II',
      title: 'We identify the right installers',
      body: 'We match your enquiry against our Surrey network and shortlist up to three gate specialists whose experience, service area, and capacity fit your project.',
    },
    {
      n: 'III',
      title: 'Installers contact you',
      body: 'Each matched installer contacts you directly to arrange a free site survey at a time that suits you. There is no cost to you at this stage and no obligation.',
    },
    {
      n: 'IV',
      title: 'You choose',
      body: 'After the surveys, each installer sends you a detailed written quote. You compare them at your own pace and proceed with whichever one suits you, or with none.',
    },
  ];

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow">

        {/* HERO */}
        <section className="editorial-container pt-6 pb-10">
          <Breadcrumbs items={[{ label: 'Contact' }]} />
          <h1 className="font-display text-[2.2rem] md:text-[2.8rem] leading-[0.98] tracking-tight text-teal-ink mb-4" style={{ fontWeight: 400 }}>
            Contact<br />
            <span className="italic-voice">Driveway Gates Surrey.</span>
          </h1>
          <p className="font-prose text-[17px] md:text-[18px] leading-[1.5] text-teal-ink/85 max-w-prose-editorial">
            The fastest way to get matched with vetted Surrey gate installers is the enquiry form on any page. For everything else, email us directly.
          </p>
        </section>

        {/* EMAIL CARD */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 md:p-8 bg-paper border-2 border-teal-ink">
              <div className="bg-white p-3 border-2 border-teal-ink text-teal-deep">
                <Mail className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-1">
                  Email us directly
                </div>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-display text-[1.35rem] leading-tight tracking-tight text-teal-deep hover:text-teal-brand transition-colors"
                  style={{ fontWeight: 500 }}
                >
                  {siteConfig.contactEmail}
                </a>
                <p className="font-prose text-[15px] leading-[1.55] text-teal-ink/80 mt-2">
                  We respond within 1 working day. For existing enquiries, please quote the postcode you submitted with so we can find your record.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REASONS */}
        <section className="bg-paper">
          <div className="editorial-container-wide py-10 md:py-16">
            <SectionHeader
              title="What to email us about"
              subtitle="Three common reasons."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 md:gap-y-8 mt-2">
              {reasonCards.map((card, i) => (
                <div key={card.title} className="py-5 border-t border-teal-ink">
                  <div className="text-teal-accent mb-3">
                    {card.icon}
                  </div>
                  <h3 className="font-display text-[1.25rem] leading-tight tracking-tight text-teal-ink mb-2" style={{ fontWeight: 500 }}>
                    {card.title}
                  </h3>
                  <p className="font-prose text-[15px] leading-[1.55] text-teal-ink/80">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title="How the matching process works"
              subtitle="Four steps. No fees."
            />
            <div>
              {steps.map((s) => (
                <div key={s.n} className="py-6 border-b border-teal-line last:border-b-0 flex items-start gap-5">
                  <div className="font-display text-[2rem] leading-none text-accent flex-shrink-0" style={{ fontWeight: 300 }}>
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.3rem] leading-tight tracking-tight text-teal-ink mb-1" style={{ fontWeight: 500 }}>
                      {s.title}
                    </h3>
                    <p className="font-prose text-[16px] leading-[1.55] text-teal-ink/80">
                      {s.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button onClick={() => setIsModalOpen(true)} variant="primary" showArrow>
                Start Your Free Enquiry
              </Button>
            </div>
          </div>
        </section>

        {/* LEGAL LINKS */}
        <section className="bg-paper">
          <div className="editorial-container py-8">
            <div className="flex gap-6 text-[13px]">
              <Link href="/privacy/" className="text-teal-brand hover:text-teal-ink transition-colors">Privacy Policy</Link>
              <Link href="/terms/" className="text-teal-brand hover:text-teal-ink transition-colors">Terms of Use</Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
