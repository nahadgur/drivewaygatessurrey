import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import LocationIndexClient from './LocationIndexClient';

export const metadata: Metadata = {
  title: 'Driveway Gate Installers by Surrey Town',
  description: 'Find driveway gate installers in your part of Surrey, from Guildford and Woking to Esher, Cobham, Reigate and the Surrey Hills villages. Request free quotes.',
  alternates: { canonical: `${siteConfig.url}/location/` },
};

export default function LocationIndexPage() {
  return <LocationIndexClient />;
}
