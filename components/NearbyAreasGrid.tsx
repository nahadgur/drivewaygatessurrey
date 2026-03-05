'use client';

import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { getNearbyAreas } from '@/data/nearby-areas';

interface NearbyAreasGridProps {
  cityName: string;
  serviceSlug?: string;
  serviceName?: string;
  initialVisible?: number;
}

export function NearbyAreasGrid({ cityName, serviceSlug, serviceName, initialVisible = 10 }: NearbyAreasGridProps) {
  const areas = getNearbyAreas(cityName);
  const [showAll, setShowAll] = useState(false);

  if (areas.length === 0) return null;

  const visibleAreas = showAll ? areas : areas.slice(0, initialVisible);
  const hiddenCount = areas.length - initialVisible;

  const heading = serviceName
    ? `${serviceName}: Areas Around ${cityName}`
    : `Areas We Cover Around ${cityName}`;

  const description = serviceName
    ? `Looking for ${serviceName.toLowerCase()} near ${cityName}? Our vetted installers serve homeowners across ${cityName} and the surrounding areas listed below. Whether you are in the town centre or a nearby suburb, we will match you with the closest experienced installer.`
    : `Our driveway gate installers in ${cityName} serve homeowners from across the surrounding Surrey area. If you live in any of the towns, villages, or nearby areas listed below, you are within reach of expert gate installation. Get matched with a local installer today.`;

  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-brand-100 p-2 rounded-lg">
          <MapPin className="w-5 h-5 text-brand-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">{heading}</h2>
      </div>
      <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {visibleAreas.map(area => (
          <div
            key={area}
            className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 hover:bg-brand-50 hover:border-brand-200 hover:text-brand-700 transition-colors"
          >
            <MapPin className="w-3 h-3 text-brand-400 flex-shrink-0" />
            <span className="font-medium truncate">
              {serviceName ? area : `Gates ${area}`}
            </span>
          </div>
        ))}
      </div>

      {hiddenCount > 0 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 flex items-center gap-2 text-brand-600 font-bold text-sm hover:underline"
        >
          Show all {areas.length} areas around {cityName}
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {showAll && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(false)}
          className="mt-4 flex items-center gap-2 text-brand-600 font-bold text-sm hover:underline"
        >
          Show fewer
          <ChevronDown className="w-4 h-4 rotate-180" />
        </button>
      )}

      {/* SEO paragraph */}
      <div className="mt-6 prose prose-sm max-w-none text-gray-500">
        <p>
          Homeowners from {areas.slice(0, 5).join(', ')}, and other areas around {cityName} regularly use our service to find gate installers.{' '}
          {serviceName
            ? `If you need ${serviceName.toLowerCase()} and live in or near ${cityName}, our vetted installers can arrange a free site survey at a time that suits you, including evenings and weekends.`
            : `All of our ${cityName} partner installers are experienced, fully insured, and offer flexible appointment times to suit your schedule.`
          }
        </p>
      </div>
    </section>
  );
}
