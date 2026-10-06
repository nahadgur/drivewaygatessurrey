// app/blog/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { blogArticles } from '@/data/blog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadFormModal } from '@/components/LeadFormModal';
import { CTACard } from '@/components/ui/CTACard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogIndexPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // All articles, newest first. Featured slot uses the most recent.
  const sorted = [...blogArticles].sort(
    (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow">

        {/* HERO */}
        <section className="editorial-container-wide pt-6 pb-10 md:pt-10 md:pb-16">
          <Breadcrumbs items={[{ label: 'Blog' }]} />
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 lg:items-center mt-4">
            <div>
              <h1 className="font-display text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] leading-[0.98] tracking-tight text-teal-ink mb-4 md:mb-6" style={{ fontWeight: 400 }}>
                Surrey gate<br />
                <span className="italic-voice">guides.</span>
              </h1>
              <p className="font-prose text-[17px] md:text-[19px] leading-[1.5] text-teal-ink/85 max-w-prose-editorial">
                Planning rules, material choices, automation options, pricing, and installer selection — written for Surrey properties.
              </p>
            </div>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '5/4' }}>
              <Image
                src="/images/gates/gate-wrought-iron-detail-spear-finials-closeup.png"
                alt="Detail of hand-forged wrought iron gate finials and scrollwork"
                fill
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ARTICLE LIST */}
        <section className="bg-paper border-t border-teal-ink">
          <div className="editorial-container-wide py-10 md:py-16">

            {/* Featured — most recent article */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}/`}
                className="group block mb-12 border-t-2 border-b border-teal-ink pt-6 pb-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[400px_1fr] gap-6 md:gap-10 lg:gap-14">
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src={featured.featuredImage}
                      alt={featured.title}
                      fill
                      sizes="(min-width: 1024px) 400px, (min-width: 768px) 240px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium">
                          Featured
                        </span>
                        <span className="text-teal-line">·</span>
                        <span className="text-[11px] tracking-wide uppercase text-teal-muted">
                          {featured.category}
                        </span>
                      </div>
                      <h2 className="font-display text-[1.6rem] md:text-[2rem] lg:text-[2.4rem] leading-[1.05] tracking-tight text-teal-ink mb-3 group-hover:text-teal-brand transition-colors" style={{ fontWeight: 500 }}>
                        {featured.title}
                      </h2>
                      <p className="font-prose text-[15px] md:text-[17px] leading-[1.55] text-teal-ink/75 mb-4">
                        {featured.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-teal-line">
                      <span className="font-mono text-[11px] tracking-wider uppercase text-teal-muted">
                        {formatDate(featured.publishDate)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-teal-brand group-hover:text-teal-ink transition-colors">
                        Read guide <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid of the rest */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-10 gap-y-10">
                {rest.map(article => (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}/`}
                    className="group flex flex-col border-t border-teal-ink pt-5"
                  >
                    <div className="relative w-full overflow-hidden mb-4" style={{ aspectRatio: '16/10' }}>
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-teal-brand font-medium">
                        {article.category}
                      </span>
                      <span className="text-teal-line">·</span>
                      <span className="font-mono text-[10px] tracking-wider uppercase text-teal-muted">
                        {formatDate(article.publishDate)}
                      </span>
                    </div>
                    <h3 className="font-display text-[1.35rem] leading-[1.1] tracking-tight text-teal-ink mb-2 group-hover:text-teal-brand transition-colors" style={{ fontWeight: 500 }}>
                      {article.title}
                    </h3>
                    <p className="font-prose text-[15px] leading-[1.55] text-teal-ink/75 mb-3 flex-grow">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-teal-brand">
                      Read article <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </span>
                  </Link>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-white border-t border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <CTACard
              title="Ready for three installer quotes?"
              italicAccent="Surrey-wide, no obligation."
              body="Submit your postcode and gate type. We match you with three vetted Surrey specialists for free site surveys and detailed written quotes."
              ctaLabel="Request Your Quotes"
              onCtaClick={() => setIsModalOpen(true)}
            />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
