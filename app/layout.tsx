// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Fraunces, Cormorant_Garamond, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/data/site';

// Sans / body — Inter, variable weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: 'variable',
});

// Display — Fraunces, variable (optical size + weight)
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: 'variable',
});

// Body prose — Cormorant Garamond for lede and quoted body copy
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-prose',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
});

// Editorial voice — Instrument Serif italic for display moments
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-editorial',
  weight: '400',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Driveway Gates Surrey | Vetted Installer Network, Free Quotes',
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
  robots: { index: true, follow: true },
  verification: {
    google: 'BZ06Ie51Fvg9VOX2DO_coCDz6ijU9ozLRkTW6gIOFWM',
    other: {
      'msvalidate.01': siteConfig.bingSiteVerification,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    locale: 'en_GB',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    name: siteConfig.name,
    alternateName: siteConfig.tagline,
    url: siteConfig.url,
    publisher: { '@id': `${siteConfig.url}/#organization` },
    inLanguage: 'en-GB',
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/icon-512x512.png`,
    description: siteConfig.description,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Surrey, United Kingdom',
    },
  };

  const classes = [
    inter.variable,
    fraunces.variable,
    cormorant.variable,
    instrumentSerif.variable,
  ].join(' ');

  return (
    <html lang="en-GB" className={classes}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body className="min-h-screen flex flex-col bg-paper text-teal-ink font-sans antialiased">
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.gaId}');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
