// app/not-found.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

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
      <main className="flex-grow bg-white">
        <div className="container-width py-16 md:py-24 max-w-4xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-widest mb-4">404</p>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-5">Page Not Found</h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              The page you asked for does not exist or has been moved. The most useful places to start are below.
            </p>
            <div className="mt-8 flex gap-4 justify-center flex-wrap">
              <Link href="/" className="btn-primary">Go Home</Link>
              <Link href="/services/" className="btn-secondary">Browse Gate Types</Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-12">
            {popularPages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-brand-50 hover:border-brand-200 transition-colors"
              >
                <div className="flex-1">
                  <div className="font-display font-bold text-gray-900 mb-1 group-hover:text-brand-700 flex items-center gap-2">
                    {p.label}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
