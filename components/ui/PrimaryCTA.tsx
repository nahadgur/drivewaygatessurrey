// components/ui/PrimaryCTA.tsx
'use client';

import { Check } from 'lucide-react';
import { Button } from './Button';

interface PrimaryCTAProps {
  label: string;
  onClick?: () => void;
  href?: string;
  leftMeta?: string;
  rightMeta?: string;
}

export function PrimaryCTA({
  label,
  onClick,
  href,
  leftMeta = 'Free site survey',
  rightMeta = 'Reply within 4 hours',
}: PrimaryCTAProps) {
  return (
    <div>
      {href ? (
        <Button href={href} variant="primary" fullWidth showArrow>{label}</Button>
      ) : (
        <Button onClick={onClick} variant="primary" fullWidth showArrow>{label}</Button>
      )}
      <div className="flex items-center justify-between mt-2.5 text-[11px] text-teal-brand font-medium">
        <div className="flex items-center gap-1.5">
          <Check className="w-3.5 h-3.5 text-accent" strokeWidth={3} />
          <span>{leftMeta}</span>
        </div>
        <span>{rightMeta}</span>
      </div>
    </div>
  );
}
