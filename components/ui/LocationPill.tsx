// components/ui/LocationPill.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface LocationPillProps {
  name: string;
  href: string;
}

export function LocationPill({ name, href }: LocationPillProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between py-2 border-b border-teal-line text-[14px] hover:text-teal-brand transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand"
    >
      <span className="font-display text-teal-ink" style={{ fontWeight: 500 }}>
        {name}
      </span>
      <ArrowRight className="w-3 h-3 text-teal-brand" strokeWidth={1.5} />
    </Link>
  );
}
