// components/PricingSection.tsx
'use client';

import { pricingTiers, treatmentIncludes, getPricingForService } from '@/data/pricing';
import { Check } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

interface PricingSectionProps {
  cityName?: string;
  serviceId?: string;
  serviceName?: string;
}

export function PricingSection({ cityName, serviceId, serviceName }: PricingSectionProps) {
  const tiers = serviceId ? getPricingForService(serviceId) : pricingTiers;

  const heading = cityName && serviceName
    ? `How much do ${serviceName.toLowerCase()} cost in ${cityName}?`
    : cityName
    ? `How much do driveway gates cost in ${cityName}?`
    : serviceName
    ? `${serviceName} pricing`
    : 'Driveway gate pricing';

  const subtitle = cityName
    ? `Typical Surrey installer quotes in ${cityName}. Installation included.`
    : 'Typical Surrey installer quotes. Installation included.';

  return (
    <section>
      <SectionHeader
        title={<>{heading.split('?')[0].trim()}<span className="italic-voice">?</span></>}
        subtitle={subtitle}
      />

      {/* Desktop table */}
      <div className="hidden md:block mb-8 border-t-2 border-teal-ink">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-teal-ink">
              <th className="py-3 pr-4 text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium">Gate type</th>
              <th className="py-3 pr-4 text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium">Price range</th>
              <th className="py-3 pr-4 text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium hidden md:table-cell">Install time</th>
              <th className="py-3 text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium hidden lg:table-cell">What is included</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr key={tier.slug} className="border-b border-teal-line align-top">
                <td className="py-5 pr-4">
                  <div className="font-display text-[17px] leading-tight tracking-tight text-teal-ink" style={{ fontWeight: 500 }}>
                    {tier.treatment}
                  </div>
                  <p className="font-prose text-[14px] text-teal-ink/70 mt-1">{tier.description}</p>
                </td>
                <td className="py-5 pr-4 whitespace-nowrap">
                  <span className="font-display text-[16px] text-teal-deep" style={{ fontWeight: 500 }}>
                    &pound;{tier.priceFrom.toLocaleString()} — &pound;{tier.priceTo.toLocaleString()}
                  </span>
                </td>
                <td className="py-5 pr-4 font-prose text-[15px] text-teal-ink/80 hidden md:table-cell">
                  {tier.typicalDuration}
                </td>
                <td className="py-5 font-prose text-[14px] text-teal-ink/70 hidden lg:table-cell">
                  {tier.alignerSets}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden mb-8 border-t border-teal-ink">
        {tiers.map(tier => (
          <div key={tier.slug} className="py-5 border-b border-teal-line">
            <div className="flex justify-between items-baseline gap-3 mb-1">
              <div className="font-display text-[16px] leading-tight tracking-tight text-teal-ink" style={{ fontWeight: 500 }}>
                {tier.treatment}
              </div>
              <div className="font-display text-[14px] text-teal-deep whitespace-nowrap" style={{ fontWeight: 500 }}>
                &pound;{tier.priceFrom.toLocaleString()}—&pound;{tier.priceTo.toLocaleString()}
              </div>
            </div>
            <p className="font-prose text-[14px] text-teal-ink/70 mb-2">{tier.description}</p>
            <div className="flex gap-4 text-[12px] text-teal-muted">
              <span>{tier.typicalDuration}</span>
              <span>{tier.alignerSets}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Included + Finance */}
      <div className="grid gap-4 md:gap-6">
        <div className="bg-white border-2 border-teal-ink p-6">
          <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-3">
            What's included
          </div>
          <ul className="space-y-2">
            {treatmentIncludes.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 font-prose text-[15px] leading-[1.5] text-teal-ink/85">
                <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* City-specific SEO paragraph */}
      {cityName && (
        <div className="mt-8 prose-editorial max-w-prose-editorial">
          <p>
            The cost of driveway gates in {cityName} depends on material (wood, steel, aluminium, or wrought iron), automation, entrance width, and any bespoke design requirements. Prices vary across Surrey with site conditions and specification. Ask for an itemised written quote after a site survey before you commit to anything.
          </p>
        </div>
      )}
    </section>
  );
}
