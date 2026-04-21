// app/services/[serviceSlug]/[locationSlug]/ServiceLocationClient.tsx
'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { CheckCircle, MapPin } from 'lucide-react';
import { getServiceBySlug } from '@/data/services';
import { getCityBySlug } from '@/data/locations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { FAQ } from '@/components/FAQ';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadFormModal } from '@/components/LeadFormModal';

// Per-service local intro paragraphs. 2 paragraphs of genuine per-city copy
// belongs here. These are placeholder templates that will be replaced during
// the per-survivor rewrite phase; each surviving (service, city) pair gets
// bespoke content that references the city's actual planning context,
// property archetype, and dominant material preference.
//
// Note: the old 7-step "how it works in Cityname" and 4 why-points blocks
// have been removed because they were identical across all 75 cities and
// contributed 60-70% of the duplicated rendered HTML on this template.
const serviceLocationContent: Record<string, { intro: (city: string) => string[] }> = {
  'electric-sliding': {
    intro: (city) => [
      `Most sliding gate enquiries in ${city} start with a constraint rather than a preference. A driveway that is too short for swing leaves to clear without blocking the road. An approach that slopes downward from the pavement and defeats standard swing gate hinge geometry. An opening wide enough that swing gate leaves would put impractical leverage on the hinge posts. A sliding gate solves all three situations with the same mechanism: horizontal travel along the boundary, no arc clearance required, no swing space needed in front of the gate or behind it.`,
      `The two configurations in regular use are ground-track and cantilever. Ground-track is the standard on flat or near-flat sites: a concrete foundation carries the track channel, the gate runs on rollers within it, and the motor drives the gate through a rack fixed to the underside of the leaf. Cantilever systems suspend the gate above the surface from an overhead rail, removing the ground-level requirement entirely. They are specified for sites in ${city} where the driveway gradient makes a level track impractical, where the surface has a finish that should not be interrupted by a track channel, or where the ground conditions would not support a conventional foundation.`,
    ],
  },
  'electric-swing': {
    intro: (city) => [
      `Swing gates are the default choice on most ${city} residential properties, and for good reason. A pair of gates opening as you pull onto the driveway delivers a combination of visual presence and daily convenience that other gate types struggle to match. The format is well-established, the installer population that can execute it well is substantial, and the range of materials and motor configurations available gives it genuine flexibility across different property types and budgets.`,
      `The motor decision shapes the aesthetic almost as much as the gate itself. Underground motors sit in a chamber below the post, invisible when the gate is closed, and are the standard specification on premium ${city} properties where every detail of the entrance matters. Ram-arm motors mount on the face of the gate and post, visible from the property side, and are the practical choice on retrofit projects where post foundations do not allow excavation. Your installer will assess which is appropriate for your specific post condition and gate weight at the survey.`,
    ],
  },
  'wooden-gates': {
    intro: (city) => [
      `Hardwood gates are the instinctive specification for a large proportion of ${city} properties. The Surrey Hills AONB, the Green Belt villages, the conservation areas in and around the county's market towns, and the substantial stock of period and rural residential properties across the county all create contexts where a natural timber gate is not just aesthetically preferable but often the only material that feels genuinely right. Where a planning authority or a conservation officer is in the picture, timber is also frequently the specification that raises least resistance.`,
      `The fabrication approach for hardwood gates in ${city} is almost always bespoke rather than catalogue. A skilled timber gate maker can produce a gate that reflects the proportions of the entrance, references the architectural character of the house, or achieves a specific design detail that matters to the homeowner, with a relatively modest premium over a standard size. Iroko is the default timber for most projects: it is naturally durable, stable across Surrey's seasonal moisture cycle, and available in consistent quality. European oak is specified where the grain character is a deliberate part of the brief. Accoya carries a 50-year manufacturer durability certificate and is the right choice for exposed positions and for homeowners who want timber aesthetics without the maintenance schedule.`,
    ],
  },
  'metal-gates': {
    intro: (city) => [
      `Metal gate installations in ${city} span a wider range than in most markets. At one end, the high-specification residential streets of North and East Surrey produce some of the most ambitious wrought iron entrance treatments in the country: hand-forged gates on brick piers with gilded finials, underground motors, HD video intercom, and proximity access that would not look out of place on a managed estate. At the other end, fabricated steel or aluminium sliding gates in anthracite powder coat are a clean, practical, and lower-maintenance answer for modern builds and commuter belt properties where the brief is functional rather than decorative.`,
      `The specification decision that separates durable installations from those that will need attention within five years is the surface treatment. Hot-dip galvanising before powder coating is the correct and only acceptable specification on quality work. The gate is immersed in molten zinc after fabrication, bonding zinc to every surface including internal faces and weld points. When the decorative coat is damaged, it exposes zinc rather than bare steel, and the zinc continues to protect through a sacrificial mechanism. Every installer in our ${city} network specifies hot-dip galvanising as standard.`,
    ],
  },
  'automated-systems': {
    intro: (city) => [
      `Gate automation retrofits are consistently among the highest-demand jobs for installers covering ${city}. The pattern is familiar: a homeowner with manual gates that are structurally sound and the right look for the property, who has reached the point where the daily inconvenience of getting out of the car to open them is no longer acceptable. The retrofit itself does not touch the gates. It addresses the posts, the foundations, and the hinge condition; adds the motor and control equipment; and leaves the gates operating with the same reliability as a factory-installed system.`,
      `The access control additions are where the investment often makes the most practical difference. A video intercom with a camera at the entrance connected to a smartphone app means you can see and speak to anyone at the gate from anywhere, and open or refuse entry remotely. A proximity reader fitted to the gate post registers a fob or card in the vehicle as it approaches and opens the gate without any driver action. For ${city} homeowners with concerns about vehicle security, a closed automated gate is a meaningful deterrent against the relay theft methods that account for the majority of driveway vehicle crime in the Surrey area.`,
    ],
  },
  'gate-repair': {
    intro: (city) => [
      `Gate repair callouts in ${city} cover a predictable range of faults. Motor and gearbox wear, usually from insufficient lubrication or a motor that was under-specified for the gate weight at installation. Control board failure from moisture ingress through a poorly sealed housing. Photocell misalignment after a vehicle clip or frost movement, causing repeated stops mid-travel with no actual obstruction. Hinge wear on gates that were never correctly set up, creating a dropping leaf that the motor fights to move until it gives up. Track contamination on sliding gates where grit and debris have built up until the rollers bind. Most of these are one-visit fixes when the engineer arrives with the right parts.`,
      `The brand of motor installed matters significantly to repair cost and speed. FAAC, BFT, CAME, Nice, and Beninca all maintain active spare parts supply for their product ranges for at least ten years after production ends. An engineer covering ${city} who carries stock parts for these brands can resolve the majority of faults on the first visit. A gate running an obscure or unbranded motor creates a different situation: parts sourced internationally, extended lead times, and a gate stuck in manual operation while the component is awaited. Annual servicing catches most developing faults before they become failures, and is consistently the more cost-effective path than emergency callout and repair.`,
    ],
  },
};

interface ServiceLocationClientProps {
  params: { serviceSlug: string; locationSlug: string };
}

export function ServiceLocationClient({ params }: ServiceLocationClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const service = getServiceBySlug(params.serviceSlug);
  const cityName = getCityBySlug(params.locationSlug);
  if (!service || !cityName) notFound();

  const content = serviceLocationContent[service.id] || serviceLocationContent['electric-swing'];
  const intro = content.intro(cityName);

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">
        <section className="bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.image} alt="" className="w-full h-full object-cover opacity-50" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-gray-900/30" />
          </div>
          <div className="container-width py-12 md:py-20 relative z-10">
            <Breadcrumbs items={[
              { label: 'Gate Types', href: '/services/' },
              { label: service.title, href: `/services/${service.slug}/` },
              { label: cityName }
            ]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-sm font-medium mb-6 border border-brand-500/30">
                  <MapPin className="w-4 h-4" /> Vetted Installers in {cityName}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
                  {service.title} in <span className="text-brand-400">{cityName}</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Surrey {service.title.toLowerCase()} specialists covering {cityName}. Site survey at no charge, written quotes, no obligation to proceed.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    `${service.title} specialists in ${cityName}, verified and active in Surrey`,
                    'Up to three independent quotes, each with a free site survey',
                    'Insured, warranted, and commissioned to BS EN 12453 as standard',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-brand-400 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <HeroLeadForm city={cityName} service={service.title} />
              </div>
            </div>
          </div>
        </section>

        <div className="container-width py-16 max-w-3xl">
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">
              {service.title} in {cityName}: What to Expect
            </h2>
            <div className="prose prose-gray max-w-none text-gray-600 space-y-4 text-base leading-relaxed">
              {intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </section>

          {service.faqs.length > 0 && (
            <div className="mb-12">
              <FAQ faqs={service.faqs} title={`${service.title} in ${cityName}: Common Questions`} />
            </div>
          )}

          <div className="bg-brand-900 rounded-2xl p-8 md:p-12 text-center mt-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Get {service.title} Quotes in {cityName}</h2>
            <p className="text-brand-200 mb-8 max-w-2xl mx-auto">Submit your enquiry in under two minutes. We will match you with up to three vetted {cityName} installers for free site surveys, written quotes, and no obligation at any stage.</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-white text-brand-900 font-bold text-lg py-4 px-10 rounded-xl hover:bg-brand-50 transition-colors">Get Your Free Quotes</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
