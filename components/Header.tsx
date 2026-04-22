// components/Header.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  onOpenModal?: () => void;
}

const NAV_SECTIONS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Gate Services',
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
    title: 'Areas',
    links: [
      { label: 'All Surrey Locations', href: '/location/' },
      { label: 'Weybridge', href: '/location/weybridge/' },
      { label: 'Cobham', href: '/location/cobham/' },
      { label: 'Farnham', href: '/location/farnham/' },
      { label: 'Guildford', href: '/location/guildford/' },
      { label: 'Reigate', href: '/location/reigate/' },
    ],
  },
  {
    title: 'Site',
    links: [
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
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

        {/* Mobile/tablet hamburger — hidden on lg+ */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="lg:hidden mb-1 p-1 -mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand"
        >
          <Menu className="w-5 h-5" strokeWidth={1.5} />
        </button>
      </div>

      {/* SLIDE-IN MENU PANEL */}
      {menuOpen && (
        <>
          <button
            aria-label="Close menu"
            className="fixed inset-0 bg-teal-ink/40 z-40 animate-backdrop-in"
            onClick={() => setMenuOpen(false)}
          />
          <div
            ref={panelRef}
            className="fixed top-0 right-0 h-full w-[85%] max-w-md bg-paper z-50 flex flex-col modal-in"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-teal-ink">
              <div>
                <div className="font-display text-lg leading-none tracking-tight text-teal-ink" style={{ fontWeight: 500 }}>
                  Driveway Gates Surrey
                </div>
                <div className="font-editorial italic text-sm text-teal-brand">vetted installers</div>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand"
              >
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-6">
              {NAV_SECTIONS.map((section) => (
                <div key={section.title} className="mb-8 last:mb-0">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-3">
                    {section.title}
                  </div>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="font-display text-[1.1rem] leading-tight tracking-tight text-teal-ink hover:text-teal-brand transition-colors flex items-center gap-2"
                          style={{ fontWeight: 500 }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>

            <div className="px-6 pt-4 pb-6 border-t border-teal-line">
              <button
                onClick={() => { setMenuOpen(false); onOpenModal?.(); }}
                className="btn-primary w-full justify-between"
              >
                <span>Get Three Free Quotes</span>
                <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
