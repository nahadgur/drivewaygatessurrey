// components/ui/FAQAccordion.tsx
'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  defaultOpenIndex?: number;
}

export function FAQAccordion({ faqs, defaultOpenIndex = 0 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  return (
    <div>
      {faqs.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border-b border-teal-line last:border-b-0">
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              className="w-full py-5 flex items-start justify-between text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-brand"
              aria-expanded={isOpen}
            >
              <span className="font-display text-[17px] leading-snug tracking-tight text-teal-ink" style={{ fontWeight: 500 }}>
                {f.q}
              </span>
              <div className="flex-shrink-0 mt-1">
                {isOpen
                  ? <Minus className="w-4 h-4 text-teal-brand" strokeWidth={1.8} />
                  : <Plus  className="w-4 h-4 text-teal-brand" strokeWidth={1.8} />
                }
              </div>
            </button>
            {isOpen && (
              <div className="pb-5 pr-8 animate-fade-in">
                <p className="font-prose text-[16px] leading-[1.55] text-teal-ink/80">
                  {f.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
