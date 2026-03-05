// app/services/[serviceSlug]/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Clock, Shield, Star, Search, CheckCircle, ArrowRight, ChevronDown, Award, Users, CreditCard, Sparkles } from 'lucide-react';
import { services, getServiceBySlug } from '@/data/services';
import { LOCATIONS, toSlug } from '@/data/locations';
import { FAQS_SERVICES } from '@/data/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { TrustBadges } from '@/components/TrustBadges';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadFormModal } from '@/components/LeadFormModal';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { PricingSection } from '@/components/PricingSection';
import { FAQSchema } from '@/components/FAQSchema';

const serviceContent: Record<string, { intro: string[]; benefits: { title: string; desc: string }[]; candidateIntro: string; candidates: string[]; process: { title: string; desc: string }[] }> = {
  'electric-sliding': {
    intro: [
      "Electric sliding gates solve the problem that stops many Surrey homeowners fitting gates in the first place: not enough room to swing. Rather than arcing inward, a sliding gate travels horizontally along the boundary line, requiring no clearance in front of or behind the opening. On a short driveway with parked cars, on a sloped approach that defeats a swing gate, or on a wide entrance that would need impractically long gate leaves, a sliding system is almost always the right answer.",
      "The gate runs on a ground track embedded in a concrete foundation, driven by a rack-and-pinion or belt-drive motor housed in a pillar or post at one side of the entrance. Cantilever systems, which suspend the gate above the ground on an overhead rail, are used where a track in the ground is not practical, particularly on driveways with significant gradients or unstable surfaces. Both are proven technologies that are widely installed across Surrey.",
      "The practical requirement to be aware of is run-back space. The gate needs to retract into a clear zone along the boundary line equal to its own width, plus around 500mm for the motor housing and end stops. If that space is not available on one side, a biparting system with two leaves that slide in opposite directions can halve the run-back requirement. Your installer will measure and assess the available space during the site survey before recommending the best configuration.",
    ],
    benefits: [
      { title: 'No Swing Clearance Required', desc: 'Sliding gates work on driveways where there is simply no room for gate leaves to swing open. Short approaches, near-road entrances, and properties with structures close to the gate line are all viable.' },
      { title: 'Handles Wide Openings Reliably', desc: 'A single sliding gate can cover an entrance of 6 metres or more without the structural stress that affects wide swing gates. Biparting systems extend this further and are the standard solution for commercial-scale residential entrances.' },
      { title: 'Performs Well on Slopes', desc: 'While the ground track must be level, the driveway itself can slope. Experienced Surrey installers build a level track bed into a sloped site as a matter of routine, or specify a cantilever system where the ground cannot accommodate a track at all.' },
      { title: 'Quiet and Low-Maintenance Operation', desc: 'Modern rack-and-pinion systems run almost silently and require only periodic lubrication. There are no pivot points or hinges under load, which means fewer wear items and longer service intervals than swing gate motors.' },
    ],
    candidateIntro: "A sliding gate is likely the right choice for your Surrey property if:",
    candidates: [
      "Your driveway is too short for gate leaves to swing inward without blocking parking or the road",
      "The approach slopes downward from the road and a swing gate cannot clear the gradient",
      "The entrance is wider than 5 metres and swing gate leaves would be impractically large",
      "There is a clear run of at least 4.5 metres of boundary wall or fence to one side of the opening",
      "You want a contemporary appearance with the gate sitting flat against the boundary when open",
    ],
    process: [
      { title: 'Site Survey and Configuration Assessment', desc: 'Your installer measures the opening width, checks available run-back space on both sides, assesses the ground and boundary condition, and recommends track or cantilever based on the site.' },
      { title: 'Groundwork and Track Foundation', desc: 'A concrete foundation is excavated and poured for the track base, motor post, and any new pillar work. Electrical conduit is run during this stage for the motor supply and any intercom or keypad wiring.' },
      { title: 'Gate and Motor Installation', desc: 'The track is set into the foundation, the gate is hung and aligned, the motor and drive rack are fitted, and safety photocells and any access control equipment are installed and wired.' },
      { title: 'Commissioning and Handover', desc: 'Travel limits are set, safety sensor response is calibrated, remotes are paired, any intercom or app control is configured, and you are shown the manual release procedure and basic maintenance requirements.' },
    ],
  },
  'electric-swing': {
    intro: [
      "Electric swing gates are the most installed gate type across Surrey residential properties, and for good reason. A pair of gates opening steadily as you approach the driveway is a sight that never gets old, and the engineering behind it is mature, reliable, and available at a range of price points. Single or double leaf, underground motors or ram-arm, timber or metal or a combination: the swing gate format accommodates every design direction and budget.",
      "Motor choice is one of the key decisions in a swing gate installation. Underground motors are set into a chamber beneath the gate post and are completely invisible when the gate is closed. They give the cleanest possible aesthetic and are popular on premium Surrey properties where every detail matters. Ram-arm motors mount on the gate and post face and are visible, but they are more accessible for servicing, generally less expensive, and easier to retrofit onto existing gates and posts. Both perform well in everyday use.",
      "Clearance is the main constraint to check before committing to a swing gate. The gate leaf needs to travel through its full arc without obstructing parked vehicles, walls, steps, or other structures. If your driveway slopes down from the road, the bottom of the gate may drag or catch on the slope as it opens, which requires careful motor specification and hinge geometry. Your installer will walk the site, check the arc, and account for any gradients or obstructions before specifying the system.",
    ],
    benefits: [
      { title: 'The Classic Gate Appearance', desc: 'A pair of swing gates opening symmetrically is the definitive driveway gate image. It suits every property style from a Victorian terraced house in Chelmsford to a contemporary new-build in Brentwood, and can be executed in any material.' },
      { title: 'Lower Installed Cost Than Sliding', desc: 'Swing gate installations typically cost £500 to £2,000 less than an equivalent sliding system because there is no track foundation, less groundwork, and simpler motor mounting. For most standard Surrey driveways the savings are genuine.' },
      { title: 'Completely Hidden Motor Option', desc: 'Underground motors are set below ground level and completely invisible when the gate is in the closed position. For properties where the gate design is a focal point, this approach gives the cleanest possible result with no visible ironmongery on the gate face.' },
      { title: 'Straightforward Pedestrian Access', desc: 'Swing gate designs routinely include a half-width pedestrian leaf or an integrated wicket gate that allows people to pass through without triggering the full gate cycle. Useful for daily foot traffic without unnecessary motor wear.' },
    ],
    candidateIntro: "Electric swing gates are usually the right fit if:",
    candidates: [
      "Your driveway has adequate space for the gate leaves to swing fully open inward without obstruction",
      "The approach is flat or has only a slight gradient that will not cause the gate to catch as it opens",
      "The gate opening is up to 5 metres wide, which is the practical limit for swing gate leaf sizes",
      "You want a traditional double-gate appearance with the option of a fully concealed motor",
      "You are working to a budget and want to achieve a quality result without the additional cost of a sliding system",
    ],
    process: [
      { title: 'Survey and Swing Clearance Check', desc: 'Your installer measures the opening, walks the full swing arc to check for obstructions, assesses pillar condition and foundation adequacy, and recommends motor type based on gate weight and site conditions.' },
      { title: 'Foundation and Post Work', desc: 'New posts are set in reinforced concrete foundations if required. Motor chambers are excavated for underground units and conduit is installed for power, intercom, and any keypad wiring.' },
      { title: 'Gate Hanging and Motor Fitting', desc: 'Gate leaves are hung on heavy-duty hinges, motors are fitted to posts or into prepared chambers, safety photocells are positioned, and all wiring is routed and terminated.' },
      { title: 'Testing, Programming, and Handover', desc: 'Travel limits are set precisely, safety stops and auto-reverse are tested, remotes and keypads are programmed, and the manual release procedure is demonstrated before handover.' },
    ],
  },
  'wooden-gates': {
    intro: [
      "Hardwood driveway gates occupy a different category from metal. They bring a warmth and material richness that powder-coated aluminium cannot replicate, and on the right property they are the obvious choice rather than a compromise. Rural Surrey properties, period houses, barn conversions, and homes with established gardens almost always look better with timber gates. The question is not whether wood is appropriate but which species, which design, and which treatment schedule suits your specific situation.",
      "The most widely specified timbers for Surrey driveway gates are iroko and European oak. Iroko is the practical choice: it is naturally resistant to moisture and fungal attack without relying on treatment, it holds its shape well through the seasonal changes in humidity that affect East Anglia, and it is available in consistent quality from specialist timber merchants across the county. Oak is chosen where the character of the grain and the natural weathering properties of the species are design priorities. Left untreated, oak weathers to a consistent silver-grey. Treated with a penetrating oil, it retains the warm honey colour of new timber. Accoya, a modified radiata pine with a certified 50-year above-ground durability guarantee, is the specification for homeowners who want the appearance of timber with the lowest possible ongoing maintenance requirement.",
      "Bespoke fabrication is the norm for hardwood gates rather than the exception. Unlike metal, where fabrication costs constrain how far a design can deviate from standard profiles, timber can be worked into almost any shape with conventional joinery tools. A skilled maker can produce a gate that references the detail of your house, matches existing gates or fencing on the property, or achieves a specific architectural effect that an off-the-shelf product cannot deliver. Most Surrey joinery firms specialising in gates will provide detailed drawings before any timber is cut.",
    ],
    benefits: [
      { title: 'Material Character That Metal Cannot Match', desc: 'Hardwood has grain, variation, and a tactile quality that is absent from powder-coated metal. On a period property or in a garden setting, the right timber gate reads as genuinely appropriate in a way that aluminium or steel does not.' },
      { title: 'Bespoke Fabrication at Reasonable Cost', desc: 'Because timber does not require specialist metalworking equipment, bespoke joinery is more accessible than bespoke metal fabrication. A one-off design that precisely suits your property is achievable without a significant premium over standard sizes.' },
      { title: 'Effective Privacy and Acoustic Screening', desc: 'A solid-boarded hardwood gate provides genuine visual privacy and meaningful noise reduction from road traffic. Relevant for Surrey properties on A-roads or in areas with consistent passing traffic.' },
      { title: 'Low Environmental Impact', desc: 'FSC-certified hardwood from responsibly managed forests is a renewable material with a lower embodied carbon than steel or aluminium. All timber species used by our Surrey network are available with certification on request.' },
    ],
    candidateIntro: "Hardwood driveway gates are worth considering if:",
    candidates: [
      "Your property is a period house, converted barn, rural dwelling, or any building where a natural material is architecturally appropriate",
      "You want a gate that can be made to a bespoke design referencing details specific to your property",
      "Privacy and noise screening are priorities and a solid-boarded design suits the setting",
      "You are prepared to carry out a timber treatment every one to two years, or are willing to specify Accoya for a low-maintenance alternative",
      "You want a gate material that weathers and ages gracefully rather than degrading",
    ],
    process: [
      { title: 'Design Consultation and Timber Selection', desc: 'Your installer discusses the design brief, shows samples of available timber species and finishes, and advises on the species and construction method that best suit your property, budget, and maintenance preferences.' },
      { title: 'Workshop Fabrication', desc: 'The gates are made to the agreed drawings in the workshop. Hardwood fabrication typically takes 3 to 5 weeks from confirmed order, depending on species availability and design complexity.' },
      { title: 'Installation and Initial Treatment', desc: 'Gates are transported to site and hung on galvanised or stainless steel ironmongery, the initial oil or treatment coat is applied, and any automation is fitted and wired.' },
      { title: 'Aftercare Briefing', desc: 'Your installer provides a written maintenance schedule with the recommended treatment product, interval, and application method. Annual maintenance packages covering re-oiling are available from most installers in our network.' },
    ],
  },
  'metal-gates': {
    intro: [
      "Metal driveway gates cover more design ground than any other material category. At one end of the spectrum is hand-forged wrought iron, made by a blacksmith using centuries-old techniques, producing gates with a surface texture and character that fabricated steel cannot replicate. At the other end is precision-cut aluminium, selected for its combination of lightness, absolute rust resistance, and compatibility with wide-span automated systems. Between the two sits mild steel fabrication, which is the standard material for the majority of bespoke metal gates installed across Surrey.",
      "Mild steel gates are fabricated by welding flat bar, box section, and decorative profiles into a frame, then shot-blasted, hot-dip galvanised, and powder-coated. The hot-dip galvanising step is not optional on a quality installation: it encases the steel in a zinc layer before the powder coat is applied, giving corrosion protection that survives paint damage and lasts a minimum of 20 years. For coastal Surrey properties in areas like Frinton, Mersea Island, and Southend-on-Sea, galvanising before powder coating is the only acceptable specification given the salt environment.",
      "Design options in metal are genuinely unlimited. Laser-cutting technology allows intricate patterns to be cut from flat plate with precision that hand fabrication cannot match, enabling personalised details including house names, numbers, crests, and decorative motifs at relatively low additional cost. For period properties, traditional profiles with curved heads, spear finials, and scrollwork collars remain popular and are well within the capability of any competent fabricator. Most Surrey fabricators provide CAD drawings before cutting begins, and 3D renders are standard practice on larger projects.",
    ],
    benefits: [
      { title: 'Longest Service Life of Any Gate Material', desc: 'A galvanised and powder-coated steel gate, properly installed, will outlast a wooden gate by decades and require nothing beyond an occasional wash in the interim. Aluminium gates have an indefinite service life with no corrosion mechanism at all.' },
      { title: 'The Widest Design Range Available', desc: 'From Georgian ironwork to contemporary perforated panels, metal fabrication can execute any design precisely. Laser cutting and CNC profiling allow personalised details and geometric patterns that no other material can achieve at similar cost.' },
      { title: 'Genuine Physical Security', desc: 'A well-built steel or wrought iron gate is a serious physical deterrent. The material strength, combined with appropriate post foundations and hinge specification, provides a level of resistance to forced entry that timber cannot match.' },
      { title: 'Minimal Ongoing Maintenance', desc: 'Once the galvanising and powder coat are in place, a metal gate needs almost nothing. An annual wash removes surface contamination and allows inspection of the finish. There is no schedule of re-treatment or re-painting for the first two decades.' },
    ],
    candidateIntro: "Metal driveway gates are the natural choice if:",
    candidates: [
      "Security is a primary requirement and you want the strongest available physical barrier at the entrance",
      "You want a gate that needs minimal maintenance over a 20-year-plus service life",
      "Your design brief requires ornate ironwork, laser-cut patterns, or personalised details that timber cannot achieve",
      "Your property is in a conservation area where a specific heritage metalwork style is required or expected",
      "Your site is in coastal Surrey where the salt environment makes a fully galvanised specification essential",
    ],
    process: [
      { title: 'Design Consultation and Approval', desc: 'Your installer discusses the design brief, reviews portfolio examples, and produces CAD drawings. Full drawings and, for larger projects, 3D renders are submitted for your approval before any steel is cut.' },
      { title: 'Fabrication and Surface Treatment', desc: 'The gate is built in the workshop, shot-blasted, hot-dip galvanised, and powder-coated in your specified RAL colour. This stage typically takes 3 to 6 weeks from design approval.' },
      { title: 'Installation and Post Work', desc: 'The gate is installed on new or existing posts. Post foundations are checked and upgraded if required. Automation, safety sensors, and access control equipment are fitted and wired.' },
      { title: 'Commissioning and Handover', desc: 'The complete gate and automation system is tested, travel limits and safety stops are set, all access controls are programmed, and the manual release is demonstrated.' },
    ],
  },
  'automated-systems': {
    intro: [
      "Gate automation is one of the most practical home upgrades available to Surrey homeowners with existing manual gates. If your gates are structurally sound and properly hung, adding a motor system converts them from something you have to get out of the car to open to something that responds to a remote, a keypad, or your phone. The retrofit process is straightforward for an experienced installer and the disruption is minimal.",
      "The core automation package for a pair of swing gates consists of two motors, a control board, a pair of safety photocells, two remote handsets, and a manual release key. From that baseline, the system can be expanded in any direction. A video intercom adds a camera and speaker panel at the gate, with the image and audio routed to a handset inside the house or to your smartphone anywhere in the world. A proximity reader allows authorised vehicles to open the gate automatically without using a remote. A GSM or Wi-Fi module gives full smartphone control and real-time notifications when the gate is operated. The scope of the access control package is entirely up to you.",
      "Safety compliance is not optional. All gate automation installed in the UK must meet the requirements of BS EN 12453, which sets out performance criteria for safety edges, photocell coverage, and the force limits that a closing gate is permitted to apply. An installer who does not test and document compliance is not completing the job properly. Every installer in our Surrey network commissions safety systems to the required standard and provides a declaration of conformity before handover.",
    ],
    benefits: [
      { title: 'Operate Your Gate Without Leaving the Car', desc: 'Remote operation means no more getting out in the rain to open gates on a dark winter evening. A proximity card reader can make the process fully automatic for regular users without any manual action at all.' },
      { title: 'See and Speak to Visitors From Anywhere', desc: 'A video intercom routes live camera footage and two-way audio to a handset inside the house and to your smartphone. You can grant or refuse access to callers whether you are at home, at work, or abroad.' },
      { title: 'Full Smart Home Integration', desc: 'Modern gate motor control boards are compatible with GSM and Wi-Fi modules that integrate with Google Home, Amazon Alexa, Apple HomeKit, and Ring. Gate status, open and close events, and remote access are all available through your existing smart home ecosystem.' },
      { title: 'Retrofit Without Replacing Your Gates', desc: 'If your existing gates are in good condition, automation can be added without changing the gates themselves. You retain the appearance of your current installation and add the convenience of electric operation at a fraction of new-gate-and-motor cost.' },
    ],
    candidateIntro: "Gate automation is the right next step if:",
    candidates: [
      "You have existing manual gates that are structurally sound, correctly hung, and in good overall condition",
      "Daily operation of manual gates has become a frustration, particularly in poor weather or after dark",
      "You want video intercom capability so you can see and speak to callers before deciding whether to admit them",
      "You are building a smart home system and want the gate to be part of it",
      "You want to improve the security and access control of your property without the cost of replacing the gate itself",
    ],
    process: [
      { title: 'Gate Condition Assessment', desc: 'Your installer checks the structural condition of the gates, post foundations, hinge quality, and gate weight. Any work needed before automation can be safely fitted is identified and costed at this stage.' },
      { title: 'Motor and Access Control Specification', desc: 'The motor type and torque rating are matched to the gate weight and dimensions. Intercom, keypad, proximity reader, and smart home integration options are discussed and a full system is specified.' },
      { title: 'Installation and Wiring', desc: 'Motors are fitted to posts or set into prepared foundations, safety photocells are positioned and aligned, intercom or keypad cabling is run, and all equipment is wired to the control board.' },
      { title: 'Safety Commissioning and Handover', desc: 'Travel limits are set, safety sensor response is tested and documented, remote controls and apps are configured, and you receive a full system walkthrough including the manual release procedure.' },
    ],
  },
  'gate-repair': {
    intro: [
      "Gate faults fall into two categories: mechanical failures that stop the gate working entirely, and gradual deterioration that makes it unreliable or unsafe. Motors fail, control boards develop faults, photocells drift out of alignment, hinges wear, and tracks accumulate debris that interrupts smooth travel. Most of these problems are repairable in a single visit by an engineer who carries the right diagnostic equipment and the most common spare parts.",
      "The brands fitted across the Surrey residential gate market are relatively consistent. FAAC, BFT, CAME, Nice, and Beninca account for the majority of motors and control boards in service. Engineers who specialise in gate repair carry spare parts for all of these manufacturers and can cross-reference discontinued components where the original part is no longer available. Before recommending replacement of an expensive component, a competent engineer will exhaust diagnostic and repair options, because the labour cost of a repair and the labour cost of a new motor installation are not significantly different.",
      "Scheduled annual servicing is the most cost-effective approach to gate maintenance. A service visit covers every mechanical and electronic element of the system: motor lubrication and gearbox inspection, drive rack or belt condition check, hinge torque check and adjustment, safety sensor alignment and sensitivity test, battery backup charge verification, intercom and access control function test, and a visual inspection of the gate structure, surface finish, and post foundations. Problems identified during a service are almost always cheaper to address at that point than after they have caused a system failure.",
    ],
    benefits: [
      { title: 'Fast Attendance Across Surrey', desc: 'Engineers in our repair network cover the whole county and aim to attend urgent callouts within 24 to 48 hours. Gates stuck open or presenting a security or safety risk are prioritised for same-day attendance where possible.' },
      { title: 'All Major Brands Serviced', desc: 'Our engineers carry diagnostic equipment and common spare parts for FAAC, BFT, CAME, Nice, Beninca, and other brands regularly installed in Surrey. The majority of faults are resolved on the first visit without a return trip for parts.' },
      { title: 'Diagnosis Before Recommendation', desc: 'A good gate engineer presents findings and options before recommending action. If recalibrating a sensor resolves a fault, that is the recommendation, not a new control board. Written quotes are provided before any repair work begins.' },
      { title: 'Annual Servicing Prevents Failures', desc: 'Scheduled maintenance catches wear and component degradation before they cause a failure. The annual cost of a service is consistently less than the cost of a single emergency callout plus repair, and it keeps manufacturer warranties valid.' },
    ],
    candidateIntro: "You should book a repair or service visit if:",
    candidates: [
      "Your gate is moving slowly, stopping mid-travel, or reversing without apparent reason",
      "The gate does not respond consistently to the remote control, keypad, or intercom",
      "You can hear grinding, scraping, or clicking noises during gate operation that were not present before",
      "The gate is stuck in either the open or closed position and cannot be operated manually",
      "More than 12 months have passed since the last service, or the gate has never been serviced since installation",
    ],
    process: [
      { title: 'Diagnostic Inspection', desc: 'The engineer runs through a structured inspection of the motor, control board, safety sensors, drive mechanism, hinges, and gate structure to identify the root cause. You receive a clear explanation of the fault and a written quote for the repair.' },
      { title: 'Repair or Component Replacement', desc: 'Where possible, the fault is repaired on the first visit using parts carried on the van. If a component needs to be ordered, the gate is made safe and operable in manual mode until the return visit.' },
      { title: 'Full System Test', desc: 'After the repair or part replacement, the complete system is run through a test sequence: motor travel limits, safety sensor response at both the leading and trailing edges, battery backup function, and all access control devices.' },
      { title: 'Written Service Report', desc: 'You receive a written record of the work completed, any parts replaced with batch references, the test results, and any observations about components that may require attention at a future service.' },
    ],
  },
};

export default function ServicePage({ params }: { params: { serviceSlug: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocations, setShowLocations] = useState(false);
  const service = getServiceBySlug(params.serviceSlug);
  if (!service) notFound();

  const content = serviceContent[service.id] || serviceContent['electric-swing'];
  const relatedServices = services.filter(s => s.id !== service.id);

  const filteredLocations = useMemo(() => {
    if (!searchQuery) return LOCATIONS;
    const result: Record<string, string[]> = {};
    Object.entries(LOCATIONS).forEach(([region, cities]) => {
      const filtered = cities.filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()));
      if (filtered.length > 0) result[region] = filtered;
    });
    return result;
  }, [searchQuery]);

  const totalCities = Object.values(LOCATIONS).flat().length;

  const combinedFaqs = [
    ...(service.faqs || []),
    ...FAQS_SERVICES,
  ];

  return (
    <>
      <FAQSchema faqs={combinedFaqs} />
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <main className="flex-grow">
        <section className="bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.image} alt="" className="w-full h-full object-cover opacity-40" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/40" />
          </div>
          <div className="container-width py-12 md:py-20 relative z-10">
            <Breadcrumbs items={[{ label: 'Gate Types', href: '/services/' }, { label: service.title }]} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-6">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
                  {service.title}
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">{service.description}</p>
                <div className="space-y-3">
                  {['Compare up to 3 free quotes', 'Every installer vetted and insured', `${totalCities}+ Surrey locations covered`].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-400 flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <HeroLeadForm service={service.title} />
              </div>
            </div>
          </div>
        </section>

        <TrustBadges />

        <div className="container-width py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">

              <section className="mb-14">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-6">{service.title}: What You Need to Know</h2>
                <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
                  {content.intro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>

              <section className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Benefits of {service.title}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {content.benefits.map((b, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-brand-100 p-2 rounded-lg text-brand-600 flex-shrink-0 h-fit">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{b.title}</h3>
                        <p className="text-sm text-gray-600">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-14">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">Find {service.title} Installers Across Surrey</h2>
                    <p className="text-gray-600">
                      We have vetted installers for {service.title.toLowerCase()} in over {totalCities} areas across Surrey.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowLocations(!showLocations)}
                    className="flex items-center gap-2 text-brand-600 font-bold text-sm hover:underline self-start md:self-auto whitespace-nowrap"
                  >
                    {showLocations ? 'Hide locations' : `Show all ${totalCities}+ locations`}
                    <ChevronDown className={`w-4 h-4 transition-transform ${showLocations ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                <div className="mb-6 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search your town or area..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); if (!showLocations) setShowLocations(true); }}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                    />
                  </div>
                </div>

                <div
                  className={`transition-all duration-500 overflow-hidden ${showLocations ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'}`}
                  aria-hidden={!showLocations}
                >
                  <div className="space-y-8 pb-4">
                    {Object.entries(filteredLocations).map(([region, cities]) => (
                      <div key={region}>
                        <h3 className="text-lg font-display font-bold text-gray-900 mb-3">{region}</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                          {cities.map(city => (
                            <Link
                              key={city}
                              href={`/services/${service.slug}/${toSlug(city)}/`}
                              className="group flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg hover:bg-brand-50 transition-all border border-gray-100 hover:border-brand-200"
                            >
                              <MapPin className="w-3 h-3 text-brand-400 flex-shrink-0" />
                              <span className="text-gray-700 group-hover:text-brand-700 text-xs font-medium truncate">{city}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {!showLocations && (
                  <p className="text-sm text-gray-500">
                    Search for your area above or <button onClick={() => setShowLocations(true)} className="text-brand-600 font-medium hover:underline">browse all locations</button> to find {service.title.toLowerCase()} installers near you.
                  </p>
                )}
              </section>

              <section className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Are {service.title} Right for Your Property?</h2>
                <p className="text-gray-600 mb-4">{content.candidateIntro}</p>
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
                  <ul className="space-y-3">
                    {content.candidates.map((c, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-gray-600 text-sm mt-4">
                  The best way to find out is a free site survey. Your installer will assess your driveway, discuss options, and give you a clear recommendation based on your property layout, budget, and preferences.
                </p>
              </section>

              <section className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">The Installation Process</h2>
                <div className="space-y-4">
                  {content.process.map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="flex-shrink-0 w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-0.5">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <PricingSection serviceId={service.id} serviceName={service.title} />

              <div className="mb-14">
                <FAQ faqs={combinedFaqs} title={`${service.title} FAQs`} />
              </div>

              <section className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">What Homeowners Say</h2>
                <Testimonials limit={3} />
              </section>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-display font-bold text-gray-900 mb-3">Get Matched for {service.title}</h3>
                  <p className="text-gray-600 mb-5 text-sm">Free, no-obligation match with vetted installers in your Surrey area.</p>
                  <button onClick={() => setIsModalOpen(true)} className="block w-full btn-primary text-center">Find an Installer</button>
                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                    {[
                      { icon: <Clock className="w-4 h-4 text-brand-500" />, text: "Surveys available this week" },
                      { icon: <Shield className="w-4 h-4 text-brand-500" />, text: "50+ installs per installer" },
                      { icon: <Star className="w-4 h-4 text-brand-500" />, text: "4.9 average rating" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="bg-brand-100 p-1.5 rounded-full">{item.icon}</div>
                        <span className="text-sm font-medium text-gray-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-900 text-white p-6 rounded-2xl">
                  <h3 className="font-display font-bold mb-2">From &pound;99/month</h3>
                  <p className="text-brand-100 text-sm mb-4">0% finance available. Spread the cost over 6 to 36 months.</p>
                  <button onClick={() => setIsModalOpen(true)} className="block w-full bg-white text-brand-900 text-center font-bold py-3 px-6 rounded-xl hover:bg-brand-50 transition-colors text-sm">Get Free Quotes</button>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm mb-3">Other Gate Types</h3>
                  <div className="space-y-2">
                    {relatedServices.map(s => (
                      <Link key={s.id} href={`/services/${s.slug}/`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-600 transition-colors">
                        <ArrowRight className="w-3 h-3" /> {s.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
