// app/contact/page.tsx
import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Driveway Gates Surrey. Email hello@drivewaygatessurrey.uk for general enquiries, privacy questions, or to apply to join our installer network.',
  alternates: { canonical: `${siteConfig.url}/contact/` },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactClient />;
}
