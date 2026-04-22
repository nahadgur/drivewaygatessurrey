// components/Footer.tsx
import Link from 'next/link';

const FOOTER_NAV = [
  {
    title: 'Gate Services',
    links: [
      { label: 'Wooden Driveway Gates', href: '/services/wooden-driveway-gates/' },
      { label: 'Metal Driveway Gates', href: '/services/metal-driveway-gates/' },
      { label: 'Electric Sliding Gates', href: '/services/electric-sliding-gates/' },
      { label: 'Electric Swing Gates', href: '/services/electric-swing-gates/' },
      { label: 'Automated Gate Systems', href: '/services/automated-gate-systems/' },
      { label: 'Gate Repair & Maintenance', href: '/services/gate-repair-and-maintenance/' },
    ],
  },
  {
    title: 'Popular Areas',
    links: [
      { label: 'Weybridge', href: '/location/weybridge/' },
      { label: 'Cobham', href: '/location/cobham/' },
      { label: 'Esher', href: '/location/esher/' },
      { label: 'Farnham', href: '/location/farnham/' },
      { label: 'Guildford', href: '/location/guildford/' },
      { label: 'View all Surrey areas', href: '/location/' },
    ],
  },
  {
    title: 'Site',
    links: [
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms of Use', href: '/terms/' },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-paper border-t border-teal-line mt-auto">
      <div className="editorial-container py-10">
        <div className="border-b border-teal-line pb-8 mb-8">
          <div className="font-display text-[1.8rem] leading-tight tracking-tight text-teal-ink mb-1" style={{ fontWeight: 400 }}>
            Driveway Gates in <span className="italic-voice">Surrey.</span>
          </div>
          <p className="font-prose text-[15px] text-teal-ink/75 leading-relaxed max-w-prose-editorial">
            A vetted network of Surrey driveway gate installers. Matching homeowners with specialists in hardwood, wrought iron, and automated gate installation since 2011.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {FOOTER_NAV.map((section) => (
            <div key={section.title}>
              <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-3">
                {section.title}
              </div>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-display text-[15px] text-teal-ink hover:text-teal-brand transition-colors"
                      style={{ fontWeight: 500 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-teal-line flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-[11px] text-teal-muted">
            &copy; {new Date().getFullYear()} Driveway Gates Surrey. A matching service operated by sole trader across Surrey, UK.
          </div>
          <div className="text-[11px] text-teal-muted">
            <a href="mailto:hello@drivewaygatessurrey.uk" className="hover:text-teal-brand transition-colors">
              hello@drivewaygatessurrey.uk
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
