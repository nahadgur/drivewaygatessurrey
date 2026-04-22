// components/Header.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenModal?: () => void;
}

const NAV_SECTIONS: { title: string; titleHref?: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Gate Services',
    titleHref: '/services/',
    links: [
      { label: 'Wooden Driveway Gates', href: '/services/wooden-driveway-gates/' },
      { label: 'Metal & Wrought Iron Gates', href: '/services/metal-driveway-gates/' },
      { label: 'Electric Sliding Gates', href: '/services/electric-sliding-gates/' },
      { label: 'Electric Swing Gates', href: '/services/electric-swing-gates/' },
      { label: 'Automated Gate Systems', href: '/services/automated-gate-systems/' },
      { label: 'Gate Repair & Maintenance', href: '/services/gate-repair-and-maintenance/' },
    ],
  },
  {
    title: 'Surrey Areas',
    titleHref: '/location/',
    links: [
      { label: 'Weybridge', href: '/location/weybridge/' },
      { label: 'Cobham', href: '/location/cobham/' },
      { label: 'Farnham', href: '/location/farnham/' },
      { label: 'Guildford', href: '/location/guildford/' },
      { label: 'Reigate', href: '/location/reigate/' },
      { label: 'All Surrey towns', href: '/location/' },
    ],
  },
];

export function Header({ onOpenModal }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handler);
    };
  }, [menuOpen]);

  return (
    <header className="editorial-container-wide pt-5 pb-4 border-b border-teal-ink sticky top-0 bg-paper z-30">
      <div className="flex items-end justify-between gap-6">
        <Link href="/" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand flex-shrink-0">
          <div className="font-display text-[1.35rem] leading-none tracking-tight text-teal-ink" style={{ fontWeight: 500 }}>
            Driveway Gates Surrey
          </div>
          <div className="font-editorial italic text-[15px] -mt-0.5 text-teal-brand">
            vetted installers, free quotes
          </div>
        </Link>

        {/* Desktop inline nav — hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-8 ml-auto">
          <Link href="/services/" className="font-display text-[15px] text-teal-ink hover:text-teal-brand transition-colors" style={{ fontWeight: 500 }}>
            Services
          </Link>
          <Link href="/location/" className="font-display text-[15px] text-teal-ink hover:text-teal-brand transition-colors" style={{ fontWeight: 500 }}>
            Areas
          </Link>
          <Link href="/blog/" className="font-display text-[15px] text-teal-ink hover:text-teal-brand transition-colors" style={{ fontWeight: 500 }}>
            Blog
          </Link>
          <Link href="/contact/" className="font-display text-[15px] text-teal-ink hover:text-teal-brand transition-colors" style={{ fontWeight: 500 }}>
            Contact
          </Link>
          <button
            onClick={() => onOpenModal?.()}
            className="btn-primary !py-2.5 !px-5 !text-[13px]"
          >
            <span>Get Quotes</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </nav>

        {/* Mobile/tablet menu toggle — hidden on lg+ */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="lg:hidden mb-1 p-1 -mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand"
        >
          {menuOpen ? (
            <X className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* SLIDE-DOWN MENU — attaches below the header, not a full-viewport modal */}
      {menuOpen && (
        <>
          {/* Subtle backdrop — lighter than modal, doesn't fully darken */}
          <button
            aria-label="Close menu"
            tabIndex={-1}
            className="fixed inset-0 top-[88px] bg-teal-ink/15 z-40 menu-backdrop-in lg:hidden"
            onClick={() => setMenuOpen(false)}
          />

          {/* The panel itself */}
          <div
            ref={panelRef}
            className="absolute left-0 right-0 top-full bg-paper border-b border-teal-ink z-50 menu-slide-down lg:hidden shadow-[0_10px_30px_-10px_rgba(21,54,61,0.15)]"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="editorial-container-wide py-6 md:py-8">
              {/* Two-column layout on wider phones / tablets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-y-0 md:gap-x-10">
                {NAV_SECTIONS.map((section) => (
                  <div key={section.title}>
                    {/* Section header — itself a link to the hub page */}
                    {section.titleHref ? (
                      <Link
                        href={section.titleHref}
                        onClick={() => setMenuOpen(false)}
                        className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-3 inline-flex items-center gap-1.5 hover:text-teal-ink transition-colors"
                      >
                        {section.title}
                        <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                      </Link>
                    ) : (
                      <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-3">
                        {section.title}
                      </div>
                    )}
                    <ul className="space-y-2.5">
                      {section.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="font-display text-[1rem] md:text-[1.05rem] leading-tight tracking-tight text-teal-ink hover:text-teal-brand transition-colors"
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

              {/* Compact footer row — Blog, Contact, CTA */}
              <div className="mt-6 pt-5 border-t border-teal-line flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div className="flex gap-6">
                  <Link
                    href="/blog/"
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-[14px] text-teal-ink hover:text-teal-brand transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/contact/"
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-[14px] text-teal-ink hover:text-teal-brand transition-colors"
                    style={{ fontWeight: 500 }}
                  >
                    Contact
                  </Link>
                </div>
                <button
                  onClick={() => { setMenuOpen(false); onOpenModal?.(); }}
                  className="btn-primary !py-3 !px-5 !text-[14px] justify-between"
                >
                  <span>Get Three Free Quotes</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
