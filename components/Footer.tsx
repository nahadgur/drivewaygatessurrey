// components/Footer.tsx
import Link from 'next/link';
import { MapPin, Mail } from 'lucide-react';
import { services } from '@/data/services';
import { siteConfig } from '@/data/site';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand / About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-md flex items-center justify-center text-white font-bold">DG</div>
              <span className="font-display font-bold text-lg text-white">Driveway Gates Surrey</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Independent matching service connecting Surrey homeowners with vetted, experienced driveway gate installers across every corner of the county.
            </p>
            <p className="text-xs text-gray-500 italic border-l-2 border-gray-700 pl-3 mb-4">
              Driveway Gates Surrey is a referral service. We connect you with independent gate installers. We do not carry out installations ourselves.
            </p>
            <div className="space-y-2 text-sm">
              <Link href="/contact/" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-400 transition-colors">
                <Mail className="w-4 h-4 text-brand-500" />
                Contact us
              </Link>
            </div>
          </div>

          {/* Gate Types */}
          <div>
            <h4 className="text-white font-semibold mb-4">Gate Types</h4>
            <ul className="space-y-2 text-sm">
              {services.map(s => (
                <li key={s.id}>
                  <Link href={`/services/${s.slug}/`} className="hover:text-brand-400 transition-colors">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Locations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Popular Locations</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Gates in Guildford', href: '/location/guildford/' },
                { label: 'Gates in Weybridge', href: '/location/weybridge/' },
                { label: 'Gates in Cobham', href: '/location/cobham/' },
                { label: 'Gates in Woking', href: '/location/woking/' },
                { label: 'Gates in Reigate', href: '/location/reigate/' },
                { label: 'Gates in Epsom', href: '/location/epsom/' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Service Area</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4 text-brand-500" /> Surrey, United Kingdom
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. We are a matching service, not a gate installer.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link href="/privacy/" className="hover:text-gray-300">Privacy</Link>
            <Link href="/terms/" className="hover:text-gray-300">Terms</Link>
            <Link href="/contact/" className="hover:text-gray-300">Contact</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
