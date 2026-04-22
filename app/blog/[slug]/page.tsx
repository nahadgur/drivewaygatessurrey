// app/blog/[slug]/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { blogArticles, getArticleBySlug, type ContentBlock } from '@/data/blog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadFormModal } from '@/components/LeadFormModal';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { CTACard } from '@/components/ui/CTACard';

// Sidebar service links — curated for relevance from a blog post.
const SIDEBAR_SERVICE_LINKS = [
  { label: 'Electric Sliding Gates in Guildford', href: '/services/electric-sliding-gates/guildford/' },
  { label: 'Electric Swing Gates in Weybridge', href: '/services/electric-swing-gates/weybridge/' },
  { label: 'Wooden Driveway Gates in Haslemere', href: '/services/wooden-driveway-gates/haslemere/' },
  { label: 'Metal Driveway Gates in Cobham', href: '/services/metal-driveway-gates/cobham/' },
  { label: 'Automated Gate Systems in Esher', href: '/services/automated-gate-systems/esher/' },
  { label: 'Electric Sliding Gates in Woking', href: '/services/electric-sliding-gates/woking/' },
  { label: 'Electric Swing Gates in Reigate', href: '/services/electric-swing-gates/reigate/' },
  { label: 'Gate Repair and Maintenance in Epsom', href: '/services/gate-repair-and-maintenance/epsom/' },
  { label: 'Metal Driveway Gates in Dorking', href: '/services/metal-driveway-gates/dorking/' },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Inline CTA inside the article flow. Editorial bordered card instead of
// the old dark-gradient banner.
function BlogCtaBanner({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="my-10 bg-paper border-2 border-teal-ink p-6 md:p-8">
      <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-2">
        Free matching service
      </div>
      <h3 className="font-display text-[1.4rem] leading-tight tracking-tight text-teal-ink mb-3" style={{ fontWeight: 500 }}>
        Ready for driveway gate quotes?<br />
        <span className="italic-voice">Three vetted Surrey installers.</span>
      </h3>
      <p className="font-prose text-[15px] leading-[1.55] text-teal-ink/80 mb-5">
        Free site surveys, detailed written quotes, no obligation. We match you with up to three specialists who cover your Surrey postcode.
      </p>
      <Button onClick={onOpenModal} variant="primary" showArrow>
        Get Three Free Quotes
      </Button>
    </div>
  );
}

function ContentRenderer({ blocks, onOpenModal }: { blocks: ContentBlock[]; onOpenModal: () => void }) {
  // Pre-process: pull all image blocks, map to the h2 index they follow.
  // Also find index of 2nd h2 for CTA injection.
  const imageQueue: { [h2Index: number]: { src: string; alt: string }[] } = {};
  let h2Count = 0;
  let currentH2Index = -1;
  let ctaInsertBeforeH2 = -1;

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

  return (
    <div>
      {blocks.map((block, i) => {
        // Skip image blocks (rendered attached to their preceding h2) and data blocks
        if (block.type === 'image') return null;
        if (block.type === 'internal-link' || block.type === 'external-link' || block.type === 'cta') return null;

        const elements: React.ReactNode[] = [];

        // Inject CTA banner just before the 2nd h2
        if (i === ctaInsertBeforeH2) {
          elements.push(<BlogCtaBanner key="cta-inject" onOpenModal={onOpenModal} />);
        }

        switch (block.type) {
          case 'h2':
            elements.push(
              <h2
                key={i}
                className="font-display text-[1.7rem] md:text-[2rem] leading-[1.1] tracking-tight text-teal-ink mt-12 mb-4"
                style={{ fontWeight: 500 }}
              >
                {block.text}
              </h2>
            );
            // Inject images that belong to this h2, immediately after the heading
            if (imageQueue[i]) {
              imageQueue[i].forEach((img, imgIdx) => {
                elements.push(
                  <div
                    key={`img-${i}-${imgIdx}`}
                    className="my-6 overflow-hidden border border-teal-line relative"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 640px, 100vw"
                      className="object-cover"
                    />
                  </div>
                );
              });
            }
            break;

          case 'h3':
            elements.push(
              <h3
                key={i}
                className="font-display text-[1.35rem] leading-tight tracking-tight text-teal-ink mt-8 mb-3"
                style={{ fontWeight: 500 }}
              >
                {block.text}
              </h3>
            );
            break;

          case 'p':
            elements.push(
              <p
                key={i}
                className="font-prose text-[17px] leading-[1.6] text-teal-ink/85 mb-5"
              >
                {block.text}
              </p>
            );
            break;

          case 'list':
            elements.push(
              <ul key={i} className="my-6 pl-6 space-y-2.5">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="font-prose text-[17px] leading-[1.6] text-teal-ink/85 list-disc marker:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );
            break;

          case 'related-articles':
            elements.push(
              <div key={i} className="mt-12 pt-8 border-t border-teal-ink">
                <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-4">
                  Related articles
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {block.articles.map((a) => {
                    const fullArticle = blogArticles.find(art => art.slug === a.slug);
                    return (
                      <Link
                        key={a.slug}
                        href={`/blog/${a.slug}/`}
                        className="group flex flex-col"
                      >
                        {fullArticle?.featuredImage && (
                          <div className="relative overflow-hidden mb-3 border border-teal-line" style={{ aspectRatio: '16/10' }}>
                            <Image
                              src={fullArticle.featuredImage}
                              alt={a.title}
                              fill
                              sizes="(min-width: 768px) 200px, 100vw"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <h4 className="font-display text-[15px] leading-tight tracking-tight text-teal-ink mb-2 group-hover:text-teal-brand transition-colors" style={{ fontWeight: 500 }}>
                          {a.title}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[12px] font-medium text-teal-brand mt-auto">
                          Read article <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                        </span>
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

  // External-link blocks for sidebar Further Reading
  const furtherReading = article.content.filter(
    (b): b is Extract<ContentBlock, { type: 'external-link' }> => b.type === 'external-link'
  );

  // Bottom related — prefer same category, then by date
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

        {/* HERO — editorial two-column. Image right on desktop. */}
        <section className="editorial-container-wide pt-6 pb-10 md:pt-10 md:pb-16">
          <Breadcrumbs items={[
            { label: 'Blog', href: '/blog/' },
            { label: article.category },
          ]} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 lg:items-center mt-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium">
                  {article.category}
                </span>
                <span className="text-teal-line">·</span>
                <span className="font-mono text-[11px] tracking-wider uppercase text-teal-muted">
                  {formatDate(article.publishDate)}
                </span>
              </div>

              <h1 className="font-display text-[2.2rem] md:text-[3rem] lg:text-[3.4rem] leading-[1] tracking-tight text-teal-ink mb-5 md:mb-6" style={{ fontWeight: 400 }}>
                {article.title}
              </h1>

              <p className="font-prose text-[17px] md:text-[19px] leading-[1.5] text-teal-ink/85 max-w-prose-editorial">
                {article.excerpt}
              </p>
            </div>
            <div className="relative w-full overflow-hidden border border-teal-line" style={{ aspectRatio: '5/4' }}>
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* CONTENT + SIDEBAR */}
        <section className="bg-white border-t border-teal-ink">
          <div className="editorial-container-wide py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 lg:gap-16">

              <article className="max-w-prose-editorial">
                <ContentRenderer blocks={article.content} onOpenModal={() => setIsModalOpen(true)} />
              </article>

              <aside className="lg:sticky lg:top-32 lg:self-start space-y-6">

                {/* CTA card */}
                <div className="bg-paper border-2 border-teal-ink p-5">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-2">
                    Free matching service
                  </div>
                  <h3 className="font-display text-[1.2rem] leading-tight tracking-tight text-teal-ink mb-2" style={{ fontWeight: 500 }}>
                    Get your free gate quotes
                  </h3>
                  <p className="font-prose text-[14px] leading-[1.55] text-teal-ink/75 mb-4">
                    Compare up to three vetted Surrey installers. Free, no obligation.
                  </p>
                  <Button onClick={() => setIsModalOpen(true)} variant="primary" fullWidth showArrow>
                    Find Installers
                  </Button>
                </div>

                {/* Service × location links */}
                <div className="border-t border-teal-ink pt-5">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-3">
                    Our services
                  </div>
                  <ul className="space-y-2.5">
                    {SIDEBAR_SERVICE_LINKS.map(link => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="font-display text-[14px] leading-snug text-teal-ink hover:text-teal-brand transition-colors"
                          style={{ fontWeight: 500 }}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Further reading */}
                {furtherReading.length > 0 && (
                  <div className="border-t border-teal-ink pt-5">
                    <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-3 flex items-center gap-1.5">
                      <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                      Further reading
                    </div>
                    <ul className="space-y-2.5">
                      {furtherReading.map((link, i) => (
                        <li key={i}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-display text-[14px] leading-snug text-teal-ink hover:text-teal-brand transition-colors"
                            style={{ fontWeight: 500 }}
                          >
                            {link.source}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Back to blog */}
                <div className="border-t border-teal-ink pt-5">
                  <Link
                    href="/blog/"
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-teal-brand hover:text-teal-ink transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" strokeWidth={2} />
                    All articles
                  </Link>
                </div>

              </aside>
            </div>
          </div>
        </section>

        {/* BOTTOM RELATED ARTICLES */}
        {bottomRelated.length > 0 && (
          <section className="bg-paper border-t border-teal-ink">
            <div className="editorial-container-wide py-10 md:py-16">
              <div className="mb-6">
                <h2 className="section-heading">
                  More <span className="italic-voice">to read.</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {bottomRelated.map(a => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}/`}
                    className="group flex flex-col border-t border-teal-ink pt-5"
                  >
                    <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '16/10' }}>
                      <Image
                        src={a.featuredImage}
                        alt={a.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-2">
                      {a.category}
                    </div>
                    <h3 className="font-display text-[1.2rem] leading-tight tracking-tight text-teal-ink mb-2 group-hover:text-teal-brand transition-colors" style={{ fontWeight: 500 }}>
                      {a.title}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[12px] font-medium text-teal-brand mt-auto pt-2">
                      Read article <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                    </span>
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
