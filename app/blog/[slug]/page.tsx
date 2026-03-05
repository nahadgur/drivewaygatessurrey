'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ArrowLeft, ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { blogArticles, getArticleBySlug, type ContentBlock } from '@/data/blog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadFormModal } from '@/components/LeadFormModal';

// Update these to match your actual live service x location pages
const SIDEBAR_SERVICE_LINKS = [
  { label: 'Electric Sliding Gates — Guildford', href: '/services/electric-sliding-gates/guildford/' },
  { label: 'Electric Swing Gates — Weybridge', href: '/services/electric-swing-gates/weybridge/' },
  { label: 'Wooden Driveway Gates — Haslemere', href: '/services/wooden-driveway-gates/haslemere/' },
  { label: 'Metal Driveway Gates — Cobham', href: '/services/metal-driveway-gates/cobham/' },
  { label: 'Automated Gate Systems — Esher', href: '/services/automated-gate-systems/esher/' },
  { label: 'Electric Sliding Gates — Woking', href: '/services/electric-sliding-gates/woking/' },
  { label: 'Electric Swing Gates — Reigate', href: '/services/electric-swing-gates/reigate/' },
  { label: 'Gate Repair and Maintenance — Epsom', href: '/services/gate-repair-and-maintenance/epsom/' },
  { label: 'Metal Driveway Gates — Dorking', href: '/services/metal-driveway-gates/dorking/' },
];

function BlogCtaBanner({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="my-10 rounded-2xl overflow-hidden border border-brand-800 bg-gradient-to-r from-brand-900 to-brand-800 shadow-xl relative">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-400 via-brand-500 to-transparent" />
      <div className="px-8 py-8 md:px-10 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-1">Free Matching Service</p>
          <h3 className="text-lg md:text-xl font-bold text-white leading-snug mb-1">Ready to get driveway gate quotes?</h3>
          <p className="text-brand-200 text-sm">Get matched with vetted Surrey installers — no obligation, no cost.</p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Get 3 Free Quotes
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ContentRenderer({ blocks, onOpenModal }: { blocks: ContentBlock[]; onOpenModal: () => void }) {
  // Pre-process: pull all image blocks out, map them to the h2 index they follow
  // Also find index of 2nd h2 for CTA injection
  const imageQueue: { [h2Index: number]: { src: string; alt: string }[] } = {};
  let h2Count = 0;
  let currentH2Index = -1;
  let ctaInsertBeforeH2 = -1; // we'll store the block index of the 2nd h2

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === 'h2') {
      h2Count++;
      currentH2Index = i;
      if (h2Count === 2) ctaInsertBeforeH2 = i;
    }
    if (block.type === 'image' && currentH2Index !== -1) {
      if (!imageQueue[currentH2Index]) imageQueue[currentH2Index] = [];
      imageQueue[currentH2Index].push({ src: block.src, alt: block.alt });
    }
  }

  // Track which images have been rendered
  const renderedImages = new Set<number>();

  return (
    <div className="prose prose-gray max-w-none">
      {blocks.map((block, i) => {
        // Skip image blocks — they render attached to their h2 instead
        if (block.type === 'image') return null;
        // Skip internal-link, external-link, cta data blocks
        if (block.type === 'internal-link' || block.type === 'external-link' || block.type === 'cta') return null;

        const elements: React.ReactNode[] = [];

        // Inject CTA banner just before the 2nd h2
        if (i === ctaInsertBeforeH2) {
          elements.push(<BlogCtaBanner key="cta-inject" onOpenModal={onOpenModal} />);
        }

        switch (block.type) {
          case 'h2':
            elements.push(
              <h2 key={i} className="text-2xl md:text-3xl font-display font-bold text-gray-900 mt-10 mb-4">
                {block.text}
              </h2>
            );
            // Inject images that belong to this h2, immediately after the heading
            if (imageQueue[i]) {
              imageQueue[i].forEach((img, imgIdx) => {
                elements.push(
                  <div key={`img-${i}-${imgIdx}`} className="my-6 rounded-2xl overflow-hidden border border-gray-200 shadow-lg aspect-[16/9]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                );
              });
            }
            break;

          case 'h3':
            elements.push(
              <h3 key={i} className="text-xl md:text-2xl font-display font-bold text-gray-900 mt-8 mb-3">
                {block.text}
              </h3>
            );
            break;

          case 'p':
            elements.push(
              <p key={i} className="text-gray-600 leading-relaxed mb-5">
                {block.text}
              </p>
            );
            break;

          case 'list':
            elements.push(
              <ul key={i} className="my-6 pl-6 space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="text-gray-600 leading-relaxed list-disc marker:text-brand-500">
                    {item}
                  </li>
                ))}
              </ul>
            );
            break;

          case 'related-articles':
            elements.push(
              <div key={i} className="mt-12 pt-8 border-t border-gray-200 not-prose">
                <h3 className="text-lg font-display font-bold text-gray-900 mb-6">Related articles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {block.articles.map((a) => {
                    const fullArticle = blogArticles.find(art => art.slug === a.slug);
                    return (
                      <Link
                        key={a.slug}
                        href={`/blog/${a.slug}/`}
                        className="group flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:shadow-md hover:border-brand-200 transition-all bg-white"
                      >
                        {fullArticle?.featuredImage && (
                          <div className="relative h-32 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={fullArticle.featuredImage}
                              alt={a.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute top-2 left-2 w-6 h-1 rounded-full bg-brand-500" />
                          </div>
                        )}
                        <div className="p-4 flex-grow flex flex-col">
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors leading-snug line-clamp-2 mb-3">
                            {a.title}
                          </h4>
                          <span className="text-brand-600 text-xs font-bold uppercase tracking-wide flex items-center gap-1 mt-auto">
                            Read article <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
            break;

          default:
            break;
        }

        return elements.length > 0 ? <React.Fragment key={i}>{elements}</React.Fragment> : null;
      })}
    </div>
  );
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  // Collect external-link blocks from article content for sidebar Further Reading
  const furtherReading = article.content.filter(
    (b): b is Extract<ContentBlock, { type: 'external-link' }> => b.type === 'external-link'
  );

  const bottomRelated = blogArticles
    .filter(a => a.slug !== article.slug)
    .sort((a, b) => {
      if (a.category === article.category && b.category !== article.category) return -1;
      if (b.category === article.category && a.category !== article.category) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    })
    .slice(0, 3);

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">

        {/* Hero */}
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.featuredImage} alt={article.title} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 container-width pb-10">
            <Link href="/blog/" className="inline-flex items-center gap-1 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4 hover:text-brand-200 transition-colors">
              <ArrowLeft className="w-3 h-3" /> Back to blog
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-brand-500/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-gray-300 text-xs">
                <Calendar className="w-3 h-3" />
                {new Date(article.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white max-w-4xl leading-tight">
              {article.title}
            </h1>
          </div>
        </div>

        {/* Content + Sidebar */}
        <div className="container-width py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            <article className="lg:col-span-2">
              <ContentRenderer blocks={article.content} onOpenModal={() => setIsModalOpen(true)} />
            </article>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">

                {/* CTA */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-3">Get your free gate quotes</h3>
                  <p className="text-gray-500 text-sm mb-5">Compare up to 3 vetted Surrey installers — free, no obligation.</p>
                  <button onClick={() => setIsModalOpen(true)} className="block w-full btn-primary text-center">
                    Find Installers
                  </button>
                </div>

                {/* Service x Location links */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 text-brand-500 flex-shrink-0" />
                    <h3 className="font-bold text-gray-900 text-sm">Our Services</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {SIDEBAR_SERVICE_LINKS.map(link => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-brand-600 hover:text-brand-800 hover:underline underline-offset-2 transition-colors leading-snug"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Further Reading — external links from article */}
                {furtherReading.length > 0 && (
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-4">
                      <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <h3 className="font-bold text-gray-900 text-sm">Further Reading</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {furtherReading.map((link, i) => (
                        <li key={i}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-brand-600 hover:text-brand-800 hover:underline underline-offset-2 transition-colors leading-snug block"
                          >
                            {link.source}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>
            </aside>
          </div>
        </div>

        {/* Bottom related articles */}
        {bottomRelated.length > 0 && (
          <section className="section-padding bg-gray-50">
            <div className="container-width">
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-8">More articles you might like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bottomRelated.map(a => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}/`}
                    className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all"
                  >
                    <div className="relative h-40 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.featuredImage} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                      <span className="absolute top-3 left-3 px-2 py-0.5 bg-brand-500/90 text-white text-[9px] font-bold uppercase rounded-full">{a.category}</span>
                    </div>
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-base font-display font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug">{a.title}</h3>
                      <span className="text-brand-600 font-bold text-xs flex items-center gap-1 mt-auto pt-2">
                        Read article <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <Footer />
    </>
  );
}
