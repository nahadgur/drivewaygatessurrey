// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/data/site';

// Body / sans font. DM Sans (variable).
const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: 'variable',
});

// Display / heading font. Fraunces (variable, optical size + weight).
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: 'variable',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Driveway Gates Surrey | Find Trusted Gate Installers Across Surrey',
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
  robots: { index: true, follow: true },
  verification: {
    google: 'BZ06Ie51Fvg9VOX2DO_coCDz6ijU9ozLRkTW6gIOFWM',
    other: {
      // Bing Webmaster Tools verification. Placeholder until the real code
      // is added to siteConfig.bingSiteVerification in data/site.ts.
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

  return (
    <html lang="en-GB" className={`${dmSans.variable} ${fraunces.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body className="min-h-screen flex flex-col">
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
