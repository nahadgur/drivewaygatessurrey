'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { siteConfig } from '@/data/site';

const STORAGE_KEY = 'cookie-consent-v1';
type Consent = 'accepted' | 'rejected' | null;

function readConsent(): Consent {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === 'accepted' || v === 'rejected' ? v : null;
}

function writeConsent(value: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // localStorage unavailable (private mode); silent no-op
  }
}

// Cookie banner + GA4 loader gated on user consent.
// PECR/GDPR: analytics cookies are non-essential and must not load until
// the visitor opts in. This component renders the GA4 <Script> tags only
// once consent === 'accepted'.
export function ConsentBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsent(readConsent());
  }, []);

  const accept = () => {
    writeConsent('accepted');
    setConsent('accepted');
  };

  const reject = () => {
    writeConsent('rejected');
    setConsent('rejected');
  };

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {mounted && consent === null && (
        <div
          role="region"
          aria-label="Cookie notice"
          className="fixed bottom-0 inset-x-0 z-40 px-3 sm:px-4 pb-3 sm:pb-4"
        >
          <div className="mx-auto max-w-3xl bg-teal-ink text-white rounded-2xl shadow-2xl border border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <div className="flex-1 text-[13px] sm:text-[13.5px] leading-[1.55] text-white/85">
              We use a small cookie to remember this choice. With your permission we&apos;d also like to use Google Analytics to see which pages help Surrey homeowners. No advertising, no tracking across other sites.{' '}
              <Link href="/privacy/" className="underline text-white hover:text-accent-soft whitespace-nowrap">
                Read our privacy notice
              </Link>
              .
            </div>
            <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={reject}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-full border border-white/30 hover:border-white text-white text-[13px] font-semibold transition-colors"
              >
                Reject
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-full bg-accent hover:bg-accent-deep text-teal-ink text-[13px] font-bold transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
