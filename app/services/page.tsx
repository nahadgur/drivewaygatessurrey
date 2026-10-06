import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import ServicesIndexClient from './ServicesIndexClient';

export const metadata: Metadata = {
  title: 'Driveway Gate Types in Surrey',
  description: 'Electric sliding and swing gates, wooden and metal driveway gates, gate automation and repairs across Surrey. Compare the options and request free quotes.',
  alternates: { canonical: `${siteConfig.url}/services/` },
};

export default function ServicesIndexPage() {
  return <ServicesIndexClient />;
}
