// app/services/[serviceSlug]/[locationSlug]/page.tsx
'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, MapPin, Star, Clock, Shield, Award, Users } from 'lucide-react';
import { services, getServiceBySlug } from '@/data/services';
import { LOCATIONS, getCityBySlug } from '@/data/locations';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { FAQ } from '@/components/FAQ';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Testimonials } from '@/components/Testimonials';
import { LeadFormModal } from '@/components/LeadFormModal';
import { PricingSection } from '@/components/PricingSection';
import { NearbyAreasGrid } from '@/components/NearbyAreasGrid';
import { siteConfig } from '@/data/site';
import { FAQSchema } from '@/components/FAQSchema';


const serviceLocationContent: Record<string, {
  intro: (city: string) => string[];
  steps: (city: string) => string[];
  whyPoints: (city: string) => string[];
}> = {
  'electric-sliding': {
    intro: (city) => [
      `Most sliding gate enquiries in ${city} start with a constraint rather than a preference. A driveway that is too short for swing leaves to clear without blocking the road. An approach that slopes downward from the pavement and defeats standard swing gate hinge geometry. An opening wide enough that swing gate leaves would put impractical leverage on the hinge posts. A sliding gate solves all three situations with the same mechanism: horizontal travel along the boundary, no arc clearance required, no swing space needed in front of the gate or behind it.`,
      `The two configurations in regular use are ground-track and cantilever. Ground-track is the standard on flat or near-flat sites: a concrete foundation carries the track channel, the gate runs on rollers within it, and the motor drives the gate through a rack fixed to the underside of the leaf. Cantilever systems suspend the gate above the surface from an overhead rail, removing the ground-level requirement entirely. They are specified for sites in ${city} where the driveway gradient makes a level track impractical, where the surface has a finish that should not be interrupted by a track channel, or where the ground conditions would not support a conventional foundation.`,
    ],
    steps: (city) => [
      `Tell us your ${city} postcode, the opening width, and whether you have run-back space available. We identify up to three specialist installers who work regularly in the ${city} area.`,
      `Each installer contacts you to arrange a site visit. They measure the opening, check run-back on both sides, and confirm whether ground-track or cantilever suits the ${city} site.`,
      `You receive a written quote itemising gate supply or fabrication, track foundation or cantilever rail, motor and drive system, photocells, and any access control equipment selected.`,
      `If new gate leaves are being fabricated, the workshop lead time is typically 2 to 4 weeks from confirmed order depending on material and design.`,
      `On the installation day, groundwork goes in first: the concrete track bed is excavated and poured, and electrical conduit is laid for motor supply and intercom cabling.`,
      `Track is set and aligned, gate is hung and adjusted for level travel, motor and rack are fitted, and safety photocells are positioned and wired to BS EN 12453.`,
      `The system is commissioned and tested. Travel limits are calibrated, remotes and any app access are programmed, and the manual release procedure is demonstrated before the installer leaves.`,
    ],
    whyPoints: (city) => [
      `Sliding gate specialists in our ${city} network have hands-on experience with the ground conditions, gradients, and property types found across this part of Surrey.`,
      `All installations meet BS EN 12453, with photocell and safety edge testing completed and documented at handover as a standard requirement.`,
      `Each ${city} installer provides a free site survey and a fully itemised written quote before you make any commitment.`,
      `FAAC, BFT, CAME, and Nice motor systems available, with established Surrey parts networks supporting long-term maintenance.`,
    ],
  },
  'electric-swing': {
    intro: (city) => [
      `Swing gates are the default choice on most ${city} residential properties, and for good reason. A pair of gates opening as you pull onto the driveway delivers a combination of visual presence and daily convenience that other gate types struggle to match. The format is well-established, the installer population that can execute it well is substantial, and the range of materials and motor configurations available gives it genuine flexibility across different property types and budgets.`,
      `The motor decision shapes the aesthetic almost as much as the gate itself. Underground motors sit in a chamber below the post, invisible when the gate is closed, and are the standard specification on premium ${city} properties where every detail of the entrance matters. Ram-arm motors mount on the face of the gate and post, visible from the property side, and are the practical choice on retrofit projects where post foundations do not allow excavation. Your installer will assess which is appropriate for your specific post condition and gate weight at the survey.`,
    ],
    steps: (city) => [
      `Submit your ${city} enquiry with gate type, opening width, and approximate budget. We match you with up to three swing gate specialists covering your area.`,
      `Each installer visits the ${city} property, measures the opening, walks the full swing arc to confirm clearance, and checks pillar and foundation condition before recommending motor type.`,
      `You receive a written quote covering gate fabrication or supply, post foundations if new, motor installation (underground or ram-arm), safety photocells, and access control equipment.`,
      `Where new gates are being fabricated, allow 2 to 5 weeks for manufacture depending on material and design complexity before the installation date.`,
      `On site, post foundations are set or verified, underground motor chambers are excavated where specified, and electrical conduit is installed before any surface work is reinstated.`,
      `Gate leaves are hung and aligned, motors are fitted into chambers or onto post faces, safety photocells are positioned for full arc coverage, and all wiring is terminated at the control board.`,
      `The complete system is programmed and tested to BS EN 12453. Travel limits are set, force limits calibrated, all access devices paired, and the manual release demonstrated at handover.`,
    ],
    whyPoints: (city) => [
      `Swing gate installers in our ${city} network understand the property types, plot sizes, and gradient conditions typical across this part of Surrey.`,
      `Underground and ram-arm motor options available with straightforward guidance on which suits your gate weight, post condition, and specification.`,
      `BS EN 12453 commissioning completed and documented on every installation before handover, with no exceptions.`,
      `Written warranties covering gate structure and automation system provided separately by every ${city} installer in our network.`,
    ],
  },
  'wooden-gates': {
    intro: (city) => [
      `Hardwood gates are the instinctive specification for a large proportion of ${city} properties. The Surrey Hills AONB, the Green Belt villages, the conservation areas in and around the county's market towns, and the substantial stock of period and rural residential properties across the county all create contexts where a natural timber gate is not just aesthetically preferable but often the only material that feels genuinely right. Where a planning authority or a conservation officer is in the picture, timber is also frequently the specification that raises least resistance.`,
      `The fabrication approach for hardwood gates in ${city} is almost always bespoke rather than catalogue. A skilled timber gate maker can produce a gate that reflects the proportions of the entrance, references the architectural character of the house, or achieves a specific design detail that matters to the homeowner, with a relatively modest premium over a standard size. Iroko is the default timber for most projects: it is naturally durable, stable across Surrey's seasonal moisture cycle, and available in consistent quality. European oak is specified where the grain character is a deliberate part of the brief. Accoya carries a 50-year manufacturer durability certificate and is the right choice for exposed positions and for homeowners who want timber aesthetics without the maintenance schedule.`,
    ],
    steps: (city) => [
      `Submit your enquiry and we connect you with hardwood gate specialists covering ${city} who have completed bespoke timber projects in this part of Surrey.`,
      `Your installer visits the ${city} property, discusses the design brief, shows timber species samples, confirms automation requirements if needed, and takes measurements.`,
      `Detailed fabrication drawings are produced for your approval. No timber is ordered or cut until the design is signed off.`,
      `Gates are made to the approved drawings in the workshop. Lead time is typically 3 to 5 weeks from confirmed order, depending on species and design complexity.`,
      `On the installation day, gates are transported to site and hung on hot-dip galvanised or stainless steel ironmongery, and the initial oil or treatment coat is applied.`,
      `Where automation is part of the brief, the motor system is fitted and commissioned to BS EN 12453 with all safety sensors tested and documented.`,
      `Your installer hands over a written maintenance schedule covering the recommended treatment product, application interval, and method for the specific timber specified.`,
    ],
    whyPoints: (city) => [
      `Hardwood gate specialists in our ${city} network understand Surrey's AONB and conservation area planning context and can advise on the right specification before you commit.`,
      `Iroko, European oak, and Accoya all available, with clear guidance on which suits your maintenance preference and site exposure.`,
      `Free site survey and fabrication drawings produced for approval before any ${city} installer begins work.`,
      `FSC-certified timber available from every fabricator in our network on request.`,
    ],
  },
  'metal-gates': {
    intro: (city) => [
      `Metal gate installations in ${city} span a wider range than in most markets. At one end, the high-specification residential streets of North and East Surrey produce some of the most ambitious wrought iron entrance treatments in the country: hand-forged gates on brick piers with gilded finials, underground motors, HD video intercom, and proximity access that would not look out of place on a managed estate. At the other end, fabricated steel or aluminium sliding gates in anthracite powder coat are a clean, practical, and lower-maintenance answer for modern builds and commuter belt properties where the brief is functional rather than decorative.`,
      `The specification decision that separates durable installations from those that will need attention within five years is the surface treatment. Hot-dip galvanising before powder coating is the correct and only acceptable specification on quality work. The gate is immersed in molten zinc after fabrication, bonding zinc to every surface including internal faces and weld points. When the decorative coat is damaged, it exposes zinc rather than bare steel, and the zinc continues to protect through a sacrificial mechanism. Every installer in our ${city} network specifies hot-dip galvanising as standard.`,
    ],
    steps: (city) => [
      `Submit your ${city} enquiry and we match you with metal gate fabricators and installers whose experience covers your chosen material and gate style.`,
      `Your installer visits the ${city} property, reviews portfolio examples with you, discusses design direction, material, colour, and automation requirements, and measures the opening.`,
      `Full CAD drawings are produced for your approval before fabrication begins. 3D renders are available on more complex projects at no additional cost.`,
      `The gate is fabricated in the workshop, shot-blasted to a clean steel profile, immersed in the hot-dip galvanising bath, and powder-coated in your specified RAL colour. Allow 3 to 6 weeks from drawing approval.`,
      `On the installation day, the gate is hung on new or existing posts, with post foundations inspected and upgraded where required before the gate is fitted.`,
      `Automation, safety photocells, and access control equipment are installed and wired if included in the specification, and the full system is tested before handover.`,
      `Written handover documentation covers the gate warranty, automation system warranty, and maintenance requirements for the powder coat finish.`,
    ],
    whyPoints: (city) => [
      `Metal gate specialists in our ${city} network specify hot-dip galvanising before powder coating as a non-negotiable standard on all steel and iron work.`,
      `CAD drawings produced and approved before any fabrication begins, so you know exactly what is being made before the workshop starts.`,
      `Free site survey and design consultation with each ${city} specialist, with no commitment required until you approve the drawings and quote.`,
      `Gate structure and automation system warranties provided separately in writing by every ${city} installer in our network.`,
    ],
  },
  'automated-systems': {
    intro: (city) => [
      `Gate automation retrofits are consistently among the highest-demand jobs for installers covering ${city}. The pattern is familiar: a homeowner with manual gates that are structurally sound and the right look for the property, who has reached the point where the daily inconvenience of getting out of the car to open them is no longer acceptable. The retrofit itself does not touch the gates. It addresses the posts, the foundations, and the hinge condition; adds the motor and control equipment; and leaves the gates operating with the same reliability as a factory-installed system.`,
      `The access control additions are where the investment often makes the most practical difference. A video intercom with a camera at the entrance connected to a smartphone app means you can see and speak to anyone at the gate from anywhere, and open or refuse entry remotely. A proximity reader fitted to the gate post registers a fob or card in the vehicle as it approaches and opens the gate without any driver action. For ${city} homeowners with concerns about vehicle security, a closed automated gate is a meaningful deterrent against the relay theft methods that account for the majority of driveway vehicle crime in the Surrey area.`,
    ],
    steps: (city) => [
      `Submit your ${city} enquiry. We match you with automation specialists who carry out retrofit projects regularly and stock parts for the most common motor brands.`,
      `Your installer visits the ${city} property to assess gate weight, hinge condition, post alignment, and foundation adequacy before recommending a motor type and torque rating.`,
      `Motor type and access control package are agreed in writing before any equipment is ordered. Any structural remedial work is quoted separately and confirmed before the automation work begins.`,
      `On the installation day, motors are fitted, underground chambers excavated where the site allows, safety photocells positioned, and intercom or keypad cabling run to the control board.`,
      `The system is commissioned to BS EN 12453, with travel limits calibrated, safety sensor response tested and documented, and all access control devices programmed and tested.`,
      `Handover includes the manual release procedure, remote programming, smartphone app setup if included, and a written declaration of conformity.`,
    ],
    whyPoints: (city) => [
      `Automation engineers covering ${city} carry out a thorough structural assessment before specifying any motor, not after fitting it.`,
      `FAAC, BFT, CAME, Nice, and Beninca motor systems available, with established parts networks across Surrey for long-term support.`,
      `BS EN 12453 safety compliance tested, documented, and provided in writing at handover on every ${city} installation.`,
      `Video intercom, proximity readers, keypads, and smart home integration all available as additions to any ${city} retrofit package.`,
    ],
  },
  'gate-repair': {
    intro: (city) => [
      `Gate repair callouts in ${city} cover a predictable range of faults. Motor and gearbox wear, usually from insufficient lubrication or a motor that was under-specified for the gate weight at installation. Control board failure from moisture ingress through a poorly sealed housing. Photocell misalignment after a vehicle clip or frost movement, causing repeated stops mid-travel with no actual obstruction. Hinge wear on gates that were never correctly set up, creating a dropping leaf that the motor fights to move until it gives up. Track contamination on sliding gates where grit and debris have built up until the rollers bind. Most of these are one-visit fixes when the engineer arrives with the right parts.`,
      `The brand of motor installed matters significantly to repair cost and speed. FAAC, BFT, CAME, Nice, and Beninca all maintain active spare parts supply for their product ranges for at least ten years after production ends. An engineer covering ${city} who carries stock parts for these brands can resolve the majority of faults on the first visit. A gate running an obscure or unbranded motor creates a different situation: parts sourced internationally, extended lead times, and a gate stuck in manual operation while the component is awaited. Annual servicing catches most developing faults before they become failures, and is consistently the more cost-effective path than emergency callout and repair.`,
    ],
    steps: (city) => [
      `Submit your ${city} repair enquiry. We connect you with gate engineers covering your area who carry parts for FAAC, BFT, CAME, Nice, and Beninca.`,
      `The engineer attends the ${city} property and runs a structured diagnostic inspection covering the motor, control board, safety sensors, drive mechanism, hinges, and gate structure.`,
      `You receive a clear verbal and written explanation of the fault and a written repair quote before any work is carried out or parts are ordered.`,
      `Where the fault can be resolved with parts on the van, the repair is completed on the first visit and the full system is tested before the engineer leaves site.`,
      `If a component needs to be ordered, the gate is made safe in manual mode and a return visit is scheduled. Lead times for parts from the main brands are typically 1 to 5 working days.`,
      `After repair or servicing, motor travel limits, safety sensor response, battery backup, and all access control devices are tested and confirmed working before handover.`,
      `A written service report is provided covering all work completed, parts replaced, test results, and any observations about components that may need attention in the future.`,
    ],
    whyPoints: (city) => [
      `Repair engineers covering ${city} aim to attend urgent callouts within 24 to 48 hours, with same-day attendance for gates stuck open in unsafe positions.`,
      `Diagnostic assessment and written repair quote provided before any work begins on every ${city} callout, with no surprise charges.`,
      `Engineers carry stock parts for FAAC, BFT, CAME, Nice, and Beninca, resolving the majority of ${city} callouts on the first visit.`,
      `Annual service contracts available from engineers in our network, making scheduled maintenance straightforward to manage.`,
    ],
  },
};


export default function ServiceLocationPage({ params }: { params: { serviceSlug: string; locationSlug: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const service = getServiceBySlug(params.serviceSlug);
  const cityName = getCityBySlug(params.locationSlug);
  if (!service || !cityName) notFound();

  const allCities = Object.values(LOCATIONS).flat();
  const content = serviceLocationContent[service.id] || serviceLocationContent['electric-swing'];
  const intro = content.intro(cityName);
  const steps = content.steps(cityName);
  const whyPoints = content.whyPoints(cityName);

  const benefits = [
    { icon: <Award className="w-6 h-6" />, title: 'Minimum 50 Residential Installs', desc: `Every ${cityName} installer in our network specialises in gate installation and has a verified project history before receiving a single referral from us.` },
    { icon: <Clock className="w-6 h-6" />, title: 'Site Survey Within the Week', desc: `Most installers covering ${cityName} can offer a free site survey slot within 7 days, with evening and Saturday appointments available.` },
    { icon: <Shield className="w-6 h-6" />, title: 'Insured and Warranted', desc: `Public liability cover and written warranties on both the gate and the automation are required from every installer before we refer any ${cityName} enquiries.` },
    { icon: <Users className="w-6 h-6" />, title: 'Matched to Your Gate Type', desc: `We connect you with ${cityName} installers who have specific experience with ${service.title.toLowerCase()}, not a general list of whoever is available.` },
  ];

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: `${service.title} in ${cityName}`,
    url: `${siteConfig.url}/services/${service.slug}/${params.locationSlug}/`,
    description: `Find vetted ${service.title.toLowerCase()} specialists in ${cityName}, Surrey. Free site survey, written quotes, no obligation.`,
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedInPlace: { '@type': 'State', name: 'Surrey' },
    },
    serviceType: service.title,
    priceRange: '\u00a3\u00a3',
  };

  return (
    <>
      <FAQSchema faqs={service.faqs} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
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
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex text-yellow-400">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                  <span>Highly rated by Surrey homeowners</span>
                </div>
              </div>
              <div>
                <HeroLeadForm city={cityName} service={service.title} />
              </div>
            </div>
          </div>
        </section>

        <div className="container-width py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                <div className="bg-brand-100 p-2 rounded-lg text-brand-600">{benefit.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">

              <section className="mb-12">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                  {service.title} in {cityName}: What to Expect
                </h2>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  {intro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>

              <NearbyAreasGrid cityName={cityName} serviceSlug={service.slug} serviceName={service.title} />

              <section className="mb-12">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">How {service.title} Installation Works in {cityName}</h2>
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</div>
                      <p className="text-gray-700 font-medium pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </section>

              <PricingSection cityName={cityName} serviceId={service.id} serviceName={service.title} />

              <section className="mb-12">
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">Why Get {service.title} in {cityName} Through Us?</h3>
                <div className="space-y-3">
                  {whyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 bg-brand-50 p-4 rounded-xl border border-brand-100">
                      <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 font-medium text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </section>

              {service.faqs.length > 0 && (
                <div className="mb-12">
                  <FAQ faqs={service.faqs} title={`${service.title} in ${cityName}: Common Questions`} />
                </div>
              )}

              <section className="mt-12 mb-12">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">What Homeowners Are Saying</h2>
                <Testimonials limit={2} />
              </section>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-4">Other Gate Types in {cityName}</h3>
                  <ul className="space-y-2 mb-8">
                    {services.filter(s => s.id !== service.id).map(s => (
                      <li key={s.id}>
                        <Link href={`/services/${s.slug}/${params.locationSlug}/`} className="block px-4 py-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-brand-300 hover:bg-brand-50 text-gray-700 hover:text-brand-700 transition-all text-sm font-medium">
                          {s.title} in {cityName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-4">{service.title} Elsewhere in Surrey</h3>
                  <ul className="space-y-2">
                    {allCities.filter(c => c !== cityName).slice(0, 5).map(city => {
                      const slug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      return (
                        <li key={city}>
                          <Link href={`/services/${service.slug}/${slug}/`} className="block px-4 py-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-brand-300 hover:bg-brand-50 text-gray-700 hover:text-brand-700 transition-all text-sm font-medium">
                            {service.title} in {city}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="bg-brand-900 text-white p-6 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-display font-bold mb-3">From &pound;99/month</h3>
                  <p className="text-brand-100 text-sm mb-4">0% finance available at most {cityName} installers. Spread the cost of {service.title.toLowerCase()} over 6 to 36 months with nothing to pay upfront.</p>
                  <button onClick={() => setIsModalOpen(true)} className="block w-full bg-white text-brand-900 text-center font-bold py-3 px-6 rounded-xl hover:bg-brand-50 transition-colors text-sm">Get Free Quotes</button>
                </div>
              </div>
            </aside>
          </div>

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
