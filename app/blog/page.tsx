// app/blog/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { blogArticles } from '@/data/blog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadFormModal } from '@/components/LeadFormModal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTACard } from '@/components/ui/CTACard';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const CATEGORIES = ['All', ...Array.from(new Set(blogArticles.map(a => a.category))).sort()];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogIndexPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = blogArticles
    .filter(a => activeCategory === 'All' || a.category === activeCategory)
    .filter(a =>
      search.trim() === '' ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  const featured = filtered[0];
  const rest = filtered.slice(1);

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

        {/* FILTER BAR */}
        <section className="border-y border-teal-ink bg-white sticky top-[88px] z-20">
          <div className="editorial-container-wide py-4">
            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

              {/* Category pills */}
              <div className="flex gap-1.5 flex-wrap">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-[11px] font-medium tracking-wide uppercase transition-colors border ${
                      activeCategory === cat
                        ? 'bg-teal-ink text-white border-teal-ink'
                        : 'bg-white text-teal-ink/70 border-teal-line hover:border-teal-ink hover:text-teal-ink'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-teal-muted" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search guides..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border-2 border-teal-line bg-white text-teal-ink placeholder-teal-muted text-[13px] focus:outline-none focus:border-teal-brand transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ARTICLE LIST */}
        <section className="bg-paper">
          <div className="editorial-container-wide py-10 md:py-16">

            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-prose text-[17px] text-teal-ink/70 italic mb-3">
                  No articles match these filters.
                </p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory('All'); }}
                  className="text-[13px] font-medium text-teal-brand hover:text-teal-ink transition-colors"
                >
                  Clear filters →
                </button>
              </div>
            ) : (
              <>
                {/* Featured */}
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

                {/* Grid of rest */}
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
              </>
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
