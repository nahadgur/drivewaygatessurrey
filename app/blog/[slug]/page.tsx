import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogArticles, getArticleBySlug } from '@/data/blog';
import { siteConfig } from '@/data/site';
import BlogArticleClient from './BlogArticleClient';

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return blogArticles.map(a => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  const url = `${siteConfig.url}/blog/${article.slug}/`;
  const image = article.featuredImage
    ? (article.featuredImage.startsWith('http') ? article.featuredImage : `${siteConfig.url}${article.featuredImage}`)
    : undefined;
  return {
    title: { absolute: article.metaTitle || article.title },
    description: article.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: siteConfig.name,
      title: article.metaTitle || article.title,
      description: article.metaDescription,
      locale: 'en_GB',
      ...(image ? { images: [{ url: image, alt: article.title }] } : {}),
    },
  };
}

export default function BlogArticlePage({ params }: Props) {
  if (!getArticleBySlug(params.slug)) notFound();
  return <BlogArticleClient params={params} />;
}
