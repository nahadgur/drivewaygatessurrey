// components/Header.tsx
'use client';

import { useState, useEffect, useRef, useId } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, MapPin, ChevronDown } from 'lucide-react';
import { services } from '@/data/services';

interface HeaderProps {
  onOpenModal?: () => void;
}

export function Header({ onOpenModal }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const servicesMenuId = useId();
  const mobileMenuId = useId();
  const servicesWrapperRef = useRef<HTMLDivElement>(null);

  // Close all menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Outside click + Escape for the services dropdown
  useEffect(() => {
    if (!servicesOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (servicesWrapperRef.current && !servicesWrapperRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServicesOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [servicesOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-brand-900 text-brand-50 py-2 px-4 text-sm hidden md:block">
        <div className="container-width flex justify-between items-center">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Vetted Driveway Gate Installers Across Surrey
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b transition-shadow duration-200 ${scrolled ? 'shadow-md border-gray-200' : 'shadow-sm border-gray-100'}`}>
        <div className="container-width">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Driveway Gates Surrey" className="h-10 w-auto" />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none text-gray-900">Driveway Gates</span>
                <span className="text-xs text-brand-500 font-semibold tracking-widest uppercase">Surrey</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
              <Link href="/" className="px-3 py-2 text-gray-600 hover:text-brand-600 font-medium transition-colors rounded-lg hover:bg-brand-50">Home</Link>

              <div className="relative" ref={servicesWrapperRef}>
                <button
                  type="button"
                  onClick={() => setServicesOpen((o) => !o)}
                  className={`flex items-center gap-1 px-3 py-2 font-medium transition-colors rounded-lg ${servicesOpen ? 'text-brand-600 bg-brand-50' : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50'}`}
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  aria-controls={servicesMenuId}
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {servicesOpen && (
                  <div
                    id={servicesMenuId}
                    role="menu"
                    className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 mt-1"
                  >
                    <Link
                      href="/services/"
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm font-semibold text-gray-900 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                    >
                      All Gate Types
                    </Link>
                    <div className="my-1 border-t border-gray-100" />
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}/`}
                        role="menuitem"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 rounded-lg transition-colors"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/location/" className="px-3 py-2 text-gray-600 hover:text-brand-600 font-medium transition-colors rounded-lg hover:bg-brand-50">Locations</Link>
              <Link href="/blog/" className="px-3 py-2 text-gray-600 hover:text-brand-600 font-medium transition-colors rounded-lg hover:bg-brand-50">Blog</Link>
              <Link href="/contact/" className="px-3 py-2 text-gray-600 hover:text-brand-600 font-medium transition-colors rounded-lg hover:bg-brand-50">Contact</Link>

              {onOpenModal && (
                <button onClick={onOpenModal} className="ml-3 btn-primary text-sm !py-2.5 !px-5 rounded-full">
                  Get Free Quotes
                </button>
              )}
            </nav>

            {/* Mobile Toggle */}
            <button
              type="button"
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            id={mobileMenuId}
            className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link href="/" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Home</Link>
              <div className="px-3 py-2">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Gate Types</div>
                <Link href="/services/" className="block py-2 text-sm font-semibold text-gray-900 hover:text-brand-600">All Gate Types</Link>
                {services.map((s) => (
                  <Link key={s.id} href={`/services/${s.slug}/`} className="block py-2 text-sm text-gray-600 hover:text-brand-600">{s.title}</Link>
                ))}
              </div>
              <Link href="/location/" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Locations</Link>
              <Link href="/blog/" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Blog</Link>
              <Link href="/contact/" className="block px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg">Contact</Link>
              {onOpenModal && (
                <div className="pt-4 px-3">
                  <button onClick={() => { onOpenModal?.(); setMobileOpen(false); }} className="block w-full btn-primary text-center">Get Free Quotes</button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
