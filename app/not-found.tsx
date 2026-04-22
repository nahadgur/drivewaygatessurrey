// app/not-found.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: false },
};

const popularPages = [
  { label: 'All Gate Types', href: '/services/', desc: 'Browse sliding, swing, hardwood, metal, automation, and repair services' },
  { label: 'Electric Swing Gates', href: '/services/electric-swing-gates/', desc: 'The default choice for most Surrey properties' },
  { label: 'Wooden Driveway Gates', href: '/services/wooden-driveway-gates/', desc: 'Hardwood gates for AONB and rural Surrey' },
  { label: 'Surrey Locations', href: '/location/', desc: 'Gate installers covering every town and village in Surrey' },
  { label: 'Gate Costs Guide', href: '/blog/how-much-do-driveway-gates-cost-surrey-2026/', desc: 'What Surrey homeowners actually pay in 2026' },
  { label: 'Contact Us', href: '/contact/', desc: 'Email us directly for any question about the service' },
];

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex-grow">

        <section className="editorial-container pt-10 pb-10">
          <div className="text-[11px] tracking-[0.3em] uppercase text-teal-brand font-medium mb-4">
            Error 404
          </div>
          <h1 className="font-display text-[2.4rem] md:text-[3rem] leading-[0.98] tracking-tight text-teal-ink mb-4" style={{ fontWeight: 400 }}>
            Page not<br />
            <span className="italic-voice">found.</span>
          </h1>
          <p className="font-prose text-[17px] md:text-[18px] leading-[1.5] text-teal-ink/85 max-w-prose-editorial mb-7">
            The page you asked for does not exist or has been moved. The most useful places to start are below.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button href="/" variant="primary" showArrow>Go Home</Button>
            <Button href="/services/" variant="secondary">Browse Gate Types</Button>
          </div>
        </section>

        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader title="Popular destinations" subtitle="Places the site is most often used." />
            <div>
              {popularPages.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group flex items-start gap-4 py-5 border-b border-teal-line last:border-b-0"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-[1.25rem] leading-tight tracking-tight text-teal-ink mb-1" style={{ fontWeight: 500 }}>
                      {p.label}
                    </div>
                    <p className="font-prose text-[15px] leading-[1.55] text-teal-ink/75">
                      {p.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 mt-1.5 flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-teal-ink"
                    strokeWidth={1.5}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
