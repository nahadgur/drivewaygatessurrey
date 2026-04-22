// components/ui/CTACard.tsx
'use client';

import { Button } from './Button';

interface CTACardProps {
  title: string;
  italicAccent?: string;
  body: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  ctaHref?: string;
}

export function CTACard({ title, italicAccent, body, ctaLabel, onCtaClick, ctaHref }: CTACardProps) {
  return (
    <div className="bg-white p-6 md:p-10 lg:p-12 border-2 border-teal-ink">
      <h3 className="font-display text-[1.4rem] md:text-[1.9rem] leading-tight tracking-tight text-teal-ink mb-3 md:mb-4" style={{ fontWeight: 400 }}>
        {title}
        {italicAccent && (
          <>
            <br />
            <span className="italic-voice">{italicAccent}</span>
          </>
        )}
      </h3>
      <p className="font-prose text-[15px] md:text-[17px] leading-relaxed text-teal-ink/80 mb-5 md:mb-6 max-w-prose-editorial">
        {body}
      </p>
      <div className="max-w-[400px]">
        {ctaHref ? (
          <Button href={ctaHref} variant="primary" fullWidth showArrow>
            {ctaLabel}
          </Button>
        ) : (
          <Button onClick={onCtaClick} variant="primary" fullWidth showArrow>
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
