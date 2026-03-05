'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Search } from 'lucide-react';
import { blogArticles } from '@/data/blog';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LeadFormModal } from '@/components/LeadFormModal';

const CATEGORIES = ['All', ...Array.from(new Set(blogArticles.map(a => a.category))).sort()];

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

        {/* Hero */}
        <div className="relative h-[340px] md:h-[420px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
            alt="Driveway gate guides and advice"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-3">Expert Advice</p>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white max-w-3xl leading-tight mb-4">
              Driveway Gate Guides for Surrey Homeowners
            </h1>
            <p className="text-brand-100 text-sm md:text-base max-w-xl">
              Straight-talking advice on gate types, materials, automation, planning rules, and getting the best value across Surrey.
            </p>
          </div>
        </div>

        {/* Search + Filter Bar */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
          <div className="container-width py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">

            {/* Category pills */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                    activeCategory === cat
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search guides…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-full border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <section className="section-padding">
          <div className="container-width">

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg mb-2">No articles found</p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory('All'); }}
                  className="text-brand-600 text-sm font-semibold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {/* Featured Article */}
                {featured && (
                  <Link
                    href={`/blog/${featured.slug}/`}
                    className="group block mb-12 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-brand-200 transition-all bg-white"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-60 md:h-auto overflow-hidden">
                        <img
                          src={featured.featuredImage}
                          alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/10" />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-brand-500/90 text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
                          {featured.category}
                        </span>
                      </div>
                      <div className="p-8 md:p-10 flex flex-col justify-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-500 mb-3">Featured Guide</span>
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 group-hover:text-brand-700 transition-colors leading-tight mb-4">
                          {featured.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(featured.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-brand-600 font-bold text-sm group-hover:gap-2.5 transition-all">
                            Read guide <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Article Grid */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map(article => (
                      <Link
                        key={article.slug}
                        href={`/blog/${article.slug}/`}
                        className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-brand-200 transition-all"
                      >
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={article.featuredImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                          <span className="absolute top-3 left-3 px-2 py-0.5 bg-brand-500/90 text-white text-[9px] font-bold uppercase tracking-wide rounded-full">
                            {article.category}
                          </span>
                        </div>
                        <div className="p-5 flex-grow flex flex-col">
                          <h3 className="text-base font-display font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2 leading-snug line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="flex items-center gap-1 text-[11px] text-gray-400">
                              <Calendar className="w-3 h-3" />
                              {new Date(article.publishDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </span>
                            <span className="text-brand-600 font-bold text-xs flex items-center gap-1 group-hover:gap-1.5 transition-all">
                              Read <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* CTA Banner */}
            <div className="mt-16 rounded-2xl overflow-hidden bg-gradient-to-r from-brand-900 to-brand-800 border border-brand-700 shadow-xl relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-brand-400 via-brand-500 to-transparent" />
              <div className="px-8 py-10 md:px-12 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-400 mb-2">Free Service</p>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">
                    Ready to Get Quotes for Your Driveway Gates?
                  </h3>
                  <p className="text-brand-200 text-sm">
                    We match Surrey homeowners with vetted, insured gate installers. Free, no obligation.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                  >
                    Get 3 Free Quotes
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
