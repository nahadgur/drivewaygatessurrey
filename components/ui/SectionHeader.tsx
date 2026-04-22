// components/ui/SectionHeader.tsx
import type { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string | ReactNode;
  subtitle?: string;
  as?: 'h2' | 'h3';
  className?: string;
}

export function SectionHeader({ title, subtitle, as = 'h2', className = '' }: SectionHeaderProps) {
  const Tag = as;
  return (
    <div className={`mb-5 ${className}`}>
      <Tag className="section-heading">{title}</Tag>
      {subtitle && <p className="section-subheading">{subtitle}</p>}
    </div>
  );
}
