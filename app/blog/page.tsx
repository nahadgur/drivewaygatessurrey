import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import BlogIndexClient from './BlogIndexClient';

export const metadata: Metadata = {
  title: 'Driveway Gate Guides for Surrey Homeowners',
  description: 'Guides on driveway gate costs, planning permission, materials, automation and security for Surrey homes, from the Surrey Hills to the commuter belt.',
  alternates: { canonical: `${siteConfig.url}/blog/` },
};

export default function BlogIndexPage() {
  return <BlogIndexClient />;
}
