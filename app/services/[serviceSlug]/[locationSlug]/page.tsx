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
      `Electric sliding gates are one of the most requested gate types across ${city} and the surrounding area. The appeal is practical: a sliding gate needs no swing clearance, which makes it the right answer for the kind of driveway that a swing gate cannot serve. Short approaches, sloped entrances, and wide openings are all situations where a sliding system is the logical choice, and these are common across ${city} properties ranging from compact suburban plots to larger detached homes on corner positions.`,
      `Installers covering ${city} work with ground-track and cantilever configurations depending on what the site demands. Ground-track systems embed a concrete foundation along the boundary line and are the standard solution on flat sites. Cantilever systems suspend the gate above the surface and are used where the ground cannot accommodate a track, or where the driveway gradient would make a level track impractical. Your installer will assess which configuration is appropriate during the site survey and explain the reasoning before any work is committed.`,
    ],
    steps: (city) => [
      `Submit your enquiry and we match you with up to three vetted ${city} installers who specialise in electric sliding gate installation`,
      'Your installer visits the property, measures the opening and available run-back space, checks ground and boundary conditions, and assesses whether a ground-track or cantilever system is appropriate',
      'You receive a detailed written quote covering gate fabrication, track or cantilever foundation, motor and drive system, safety photocells, and all access control equipment',
      'The gate is fabricated to the agreed specification in the workshop, typically taking 2 to 4 weeks depending on material and design',
      'Installation begins with groundwork: the track foundation is excavated and poured, and electrical conduit is run for the motor supply and any intercom wiring',
      'The gate is hung, the motor and drive rack fitted, and safety sensors installed and calibrated to BS EN 12453 requirements',
      'Full commissioning, remote pairing, app setup if included, and handover with manual release demonstration',
    ],
    whyPoints: (city) => [
      `Installers in our ${city} network have specific experience with sliding gate configurations on the property types and ground conditions typical of the area`,
      'Every installation is commissioned to BS EN 12453, with safety edge and photocell testing documented before handover',
      `Free site survey and written quote from each ${city} installer before any commitment is required`,
      'Motor brands including FAAC, BFT, CAME, and Nice are available, with parts support across Surrey for the long term',
    ],
  },
  'electric-swing': {
    intro: (city) => [
      `Electric swing gates are the most widely installed gate type in ${city} and across Surrey as a whole. A pair of gates opening as you arrive is the standard expectation on detached properties throughout the area, and the technology behind it has matured to the point where reliability, safety, and daily convenience are all well-established. Installers covering ${city} fit both underground motors, which are hidden beneath the post and give a clean uncluttered appearance, and ram-arm systems, which are more visible but easier to service and better suited to retrofit projects.`,
      `The key variable for swing gate installations in ${city} is clearance. The gate leaf needs to travel through its full arc without obstructing parked vehicles, boundary walls, or the ground surface, and on driveways that slope toward the road this requires careful hinge geometry and motor specification. Your installer will walk the arc at the site survey, identify any constraints, and specify the motor and hinge arrangement accordingly. Most swing gate installations on standard ${city} driveways are straightforward, but there is no substitute for a site-specific assessment before committing to a design.`,
    ],
    steps: (city) => [
      `Submit your enquiry and we match you with up to three vetted ${city} installers who regularly fit electric swing gates`,
      `Your installer visits the ${city} property, measures the opening, walks the full swing arc to check clearance, assesses pillar and foundation condition, and discusses motor type, gate material, and design options`,
      'You receive a written quote with a full cost breakdown covering gate or gate supply, post foundations if required, motor installation, safety sensors, and access control',
      'If new gate leaves are being fabricated or supplied, manufacture and delivery takes 2 to 5 weeks depending on material and design complexity',
      'On site, post foundations are set or checked, motor chambers excavated for underground systems, and electrical conduit installed',
      'Gate leaves are hung, motors fitted, safety photocells positioned, and all wiring terminated at the control board',
      'The system is commissioned to BS EN 12453, travel limits set, remotes programmed, and handover completed with manual release training',
    ],
    whyPoints: (city) => [
      `${city} installers in our network understand the swing gate requirements of the property types, plot sizes, and access conditions common in the area`,
      'Underground and ram-arm motor options are available, with honest guidance on which suits your specific gate, post, and budget',
      'Full BS EN 12453 safety commissioning is documented and provided at handover on every installation',
      `Written warranties on both the gate structure and the automation system are standard from every ${city} installer we refer`,
    ],
  },
  'wooden-gates': {
    intro: (city) => [
      `Hardwood driveway gates remain a popular choice in ${city}, particularly on period properties, rural plots, and homes where the character of a natural material is a deliberate design decision rather than a default. The most widely specified timber for residential gates in Surrey is iroko, which is naturally resistant to moisture without relying on treatment and holds its shape reliably through the seasonal humidity changes that affect the county. European oak is chosen where the grain character and natural weathering properties of the species are priorities. Accoya, with its certified 50-year above-ground durability, is the specification for homeowners who want timber aesthetics with minimal long-term maintenance.`,
      `Installers covering ${city} work with specialist joinery firms who fabricate gates to a bespoke brief rather than selecting from a catalogue. This means the design can be tailored to the property: matching existing fencing, referencing architectural details, or achieving a specific panel arrangement and top rail profile that suits the entrance. Bespoke fabrication in timber is more accessible than in metal because it does not require specialist metalworking equipment, and the additional cost over a standard design is often modest. Automation can be integrated into the specification from the outset, with the motor selected after the gate weight and dimensions are confirmed.`,
    ],
    steps: (city) => [
      `Submit your enquiry and we match you with installers covering ${city} who have specific experience with bespoke hardwood gate projects`,
      'Your installer visits the property, discusses the design brief, reviews timber species and finish options, assesses automation requirements, and measures the opening',
      'Detailed drawings are produced for your approval before any timber is ordered or cut',
      'The gates are fabricated in the workshop to the approved drawings, typically taking 3 to 5 weeks from confirmed order',
      'On site, the gates are hung on galvanised or stainless ironmongery, the initial treatment coat applied, and any automation fitted and wired',
      'If automation is included, the full system is commissioned to BS EN 12453 with safety sensor calibration and remote programming',
      'Your installer provides a written maintenance schedule with the recommended treatment product, interval, and application method',
    ],
    whyPoints: (city) => [
      `Installers we refer in ${city} work with joinery firms who specialise in hardwood gates and understand the material behaviour in Surrey conditions`,
      'Iroko, European oak, and Accoya are all available, with honest guidance on which species best suits your usage pattern and maintenance appetite',
      `Free site survey and full design drawings before any commitment from each ${city} installer`,
      'FSC-certified timber is available on request from every fabricator in our network',
    ],
  },
  'metal-gates': {
    intro: (city) => [
      `Metal driveway gates are installed across the full range of ${city} residential properties, from compact modern builds where a clean aluminium sliding gate suits the architecture, to larger period or rural homes where a bespoke fabricated steel or wrought iron gate with traditional detailing is the appropriate choice. The three main materials are mild steel, aluminium, and wrought iron, each with different characteristics. Mild steel is the standard for bespoke fabrication: it is strong, weldable into any profile, and takes a hot-dip galvanised and powder-coated finish that protects against rust for 20 years or more. Aluminium is lighter and will not rust under any conditions. Wrought iron is hand-forged and used on high-specification projects where the texture and character of the material are part of the brief.`,
      `For ${city} properties, the correct surface treatment is not negotiable on quality installations. Hot-dip galvanising before powder coating encases the steel in zinc before the polymer finish is applied, giving protection that survives minor coating damage and lasts a minimum of two decades. Installers in our network specify this as standard on all steel and iron work. Powder coat colour is selected from the full RAL range, and most fabricators can produce anything from standard anthracite grey or black through to bespoke colours matched to render, brickwork, or existing metalwork on the property.`,
    ],
    steps: (city) => [
      `Submit your enquiry and we match you with metal gate specialists covering ${city} who have experience with your chosen material and style`,
      `Your installer visits the ${city} property, reviews portfolio examples, discusses design direction, material, and colour, and measures the opening and post positions`,
      'Full CAD drawings are produced for your approval, with 3D renders available on larger or more complex projects',
      'The gate is fabricated in the workshop, shot-blasted, hot-dip galvanised, and powder-coated in your specified RAL colour, typically taking 3 to 6 weeks',
      'On site, the gate is installed on new or existing posts, with post foundations checked and upgraded if required',
      'Automation, safety sensors, and access control equipment are fitted and wired if included in the specification',
      'The complete installation is tested and commissioned, with safety documentation provided at handover',
    ],
    whyPoints: (city) => [
      `Metal gate fabricators in our ${city} network specify hot-dip galvanising before powder coating as standard, not as an optional upgrade`,
      'CAD drawings and 3D renders are produced before fabrication begins so you can approve the design precisely',
      `Free site survey and design consultation with each ${city} specialist before any commitment`,
      `Written warranties on the gate structure, surface finish, and automation system are provided separately on every ${city} installation`,
    ],
  },
  'automated-systems': {
    intro: (city) => [
      `Gate automation retrofits are one of the most common jobs carried out by installers covering ${city}. Homeowners with existing manual gates frequently reach the point where the inconvenience of getting out of the car to open them outweighs the initial cost of adding a motor system, and the retrofit process is straightforward when the gates are in sound condition. The key assessment is structural: the gates need to be correctly hung on posts with adequate foundations, the hinges need to be in working order, and the gate weight needs to match the motor being specified. An experienced installer can assess all of this in a single site visit.`,
      `The access control options available alongside the motor have expanded significantly. A basic retrofit package for ${city} homeowners covers the motor, a control board, safety photocells, and remote handsets. From there, a video intercom adds a camera and speaker at the gate with the feed routed to a panel inside the house and to a smartphone app, allowing callers to be seen and spoken to from anywhere. A proximity reader fitted to the gate post allows regular vehicles to open the gate automatically without using a remote. GSM and Wi-Fi modules connect the gate to smart home systems including Google Home, Amazon Alexa, Apple HomeKit, and Ring. The right specification depends on your usage pattern and what you want the system to do.`,
    ],
    steps: (city) => [
      `Submit your enquiry and we match you with automation specialists covering ${city} who carry out retrofit projects regularly`,
      `Your installer visits the ${city} property to assess the structural condition of the gates, hinge quality, post foundation adequacy, and gate weight before recommending a motor`,
      'Motor type, torque rating, and access control package are specified based on the gate assessment and your requirements',
      'Any hinge upgrades or post work identified during the assessment are quoted and agreed before the automation work begins',
      'Motors are fitted, safety photocells positioned, intercom or keypad cabling run, and all equipment wired to the control board',
      'The system is commissioned to BS EN 12453, with travel limits set, safety sensor response tested and documented, and all access control devices programmed',
      'Full handover includes the manual release procedure, remote pairing, app configuration if included, and a written record of the installation',
    ],
    whyPoints: (city) => [
      `Automation engineers covering ${city} assess gate condition honestly before specifying a motor, rather than quoting without a site visit`,
      'Motor brands including FAAC, BFT, CAME, Nice, and Beninca are available, with long-term parts support across Surrey',
      'BS EN 12453 safety compliance is tested and documented on every installation, not assumed',
      `Video intercom, proximity readers, and smart home integration are available as additions to any ${city} automation package`,
    ],
  },
  'gate-repair': {
    intro: (city) => [
      `Gate repair engineers covering ${city} attend faults ranging from complete motor failure through to gradual degradation that makes a system unreliable or unsafe. The most common faults in the Surrey residential market are motor and gearbox wear, control board failure, photocell misalignment causing false stops, hinge wear leading to sagging and binding, and on sliding gates, track contamination or drive rack deterioration. The majority of these are resolved in a single visit by an engineer who carries diagnostic equipment and common spare parts for the brands most widely installed in the area: FAAC, BFT, CAME, Nice, and Beninca.`,
      `Annual servicing is the most cost-effective approach to gate maintenance for ${city} homeowners and is consistently cheaper than the combination of an emergency callout and a repair. A service covers motor lubrication, gearbox inspection, drive mechanism condition, hinge torque, safety sensor calibration, battery backup verification, and a visual check of the gate structure and surface finish. Problems identified during a service cost far less to address than the same problems addressed after they have caused a system failure. Most engineers covering ${city} can offer an annual service slot within a week of contact.`,
    ],
    steps: (city) => [
      `Submit your enquiry and we connect you with gate repair engineers covering ${city} who carry parts for the most common brands`,
      `The engineer attends the ${city} property and runs a structured diagnostic inspection covering the motor, control board, safety sensors, drive mechanism, hinges, and gate structure`,
      'You receive a clear explanation of the fault and a written quote for the repair before any work begins',
      'Where possible, the fault is repaired on the first visit using parts carried on the van',
      'If a component needs to be ordered, the gate is made safe and operable in manual mode pending the return visit',
      'After repair or part replacement, the full system is tested: motor travel limits, safety sensor response, battery backup, and all access control devices',
      'You receive a written service report covering work completed, parts replaced, test results, and any observations about components that may require attention at a future service',
    ],
    whyPoints: (city) => [
      `Repair engineers covering ${city} aim to attend urgent callouts within 24 to 48 hours, with same-day attendance available for gates stuck in unsafe positions`,
      'Diagnostic assessment and written quote are provided before any repair work begins',
      `Engineers carry parts for FAAC, BFT, CAME, Nice, and Beninca systems, resolving most ${city} callouts on the first visit`,
      'Annual service packages are available from engineers in our network and are priced to make scheduled maintenance straightforward',
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
                  Compare vetted {service.title.toLowerCase()} specialists in {cityName}. Free site survey, written quotes, and up to three options with no obligation.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    `${service.title} specialists covering ${cityName} with 50+ completed projects`,
                    'Up to 3 free quotes from independently vetted installers',
                    'Full insurance, written warranties, and BS EN 12453 compliance as standard',
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
