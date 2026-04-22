// components/ui/ServiceCard.tsx
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  subtitle?: string;
  meta?: string;
  href: string;
}

export function ServiceCard({ title, subtitle, meta, href }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-4 py-5 border-b border-teal-line last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand"
    >
      <div className="flex-1 min-w-0">
        <div className="font-display text-[1.35rem] leading-tight tracking-tight text-teal-ink" style={{ fontWeight: 500 }}>
          {title}
        </div>
        {subtitle && (
          <div className="font-editorial italic text-[14px] text-teal-brand mt-0.5">
            {subtitle}
          </div>
        )}
        {meta && (
          <div className="text-[12px] text-teal-muted mt-2">
            {meta}
          </div>
        )}
      </div>
      <ArrowUpRight
        className="w-4 h-4 mt-1.5 flex-shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-teal-ink"
        strokeWidth={1.5}
      />
    </Link>
  );
}
