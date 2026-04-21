import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { buildBreadcrumbSchema, type BreadcrumbItem } from '@/lib/breadcrumbs';

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items];
  const schema = buildBreadcrumbSchema(items);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-500">
        {allItems.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-300" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-600 transition-colors">{item.label}</Link>
            ) : (
              <span className="text-gray-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
