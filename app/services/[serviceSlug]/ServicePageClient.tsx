// app/services/[serviceSlug]/ServicePageClient.tsx
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
import { FAQ } from '@/components/FAQ';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadFormModal } from '@/components/LeadFormModal';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { PricingSection } from '@/components/PricingSection';

const serviceContent: Record<string, { intro: string[]; benefits: { title: string; desc: string }[]; candidateIntro: string; candidates: string[]; process: { title: string; desc: string }[] }> = {
  'electric-sliding': {
    intro: [
      "Surrey driveways present a specific set of challenges that make sliding gates the right answer more often than in most counties. The county has a large number of sloped driveways, particularly across the North Downs between Reigate and Guildford, the Surrey Hills between Dorking and Haslemere, and the hillside streets of Epsom, Leatherhead, and Caterham. A swing gate on a significant gradient requires complex hinge engineering and careful motor specification; a sliding gate sidesteps the problem entirely by moving horizontally along the boundary rather than sweeping through a vertical arc.",
      "The operating principle is straightforward. A motor drives a rack fixed along the bottom of the gate, pulling it along a ground-level track or, in the case of a cantilever installation, sliding it along an elevated rail above the surface. The choice between track and cantilever depends on the site: track systems are standard on flat ground and are the more cost-effective option; cantilever is chosen where the ground cannot accommodate a track, where the gradient makes a level track impractical without significant groundwork, or where the driveway surface has a decorative finish that should not be interrupted.",
      "Run-back space is the main planning constraint. The gate needs a clear zone alongside the opening at least as wide as the gate leaf itself, with an additional 500mm or so for the motor housing and mechanical end stops. On many Surrey properties this space is readily available as a boundary wall or close-boarded fence runs alongside the opening. Where it is not, a biparting layout splits the gate into two leaves that slide in opposite directions, halving the run-back needed on each side.",
    ],
    benefits: [
      { title: 'Works on Sloped Surrey Driveways', desc: 'Where swing gates are defeated by gradient, a sliding gate simply tracks along the boundary. Cantilever systems eliminate the ground constraint entirely and are well-suited to the varied terrain found across the North Downs and Surrey Hills.' },
      { title: 'Structurally Efficient on Wide Openings', desc: 'Wide gate leaves create enormous leverage on swing gate hinge posts. A sliding gate carries its load along the track rather than concentrating it at a hinge point, making it the structurally superior choice for openings above 5 metres.' },
      { title: 'Compact Footprint, Clean Appearance', desc: 'When open, the gate leaf sits flat against the boundary with nothing projecting into the driveway. A significant practical advantage on short approaches common in Surrey commuter towns.' },
      { title: 'Low Maintenance Drive System', desc: 'Rack-and-pinion drives are simple, proven mechanisms. With annual track cleaning and lubrication, a quality system runs reliably for a decade or more without significant component replacement.' },
    ],
    candidateIntro: "A sliding gate is likely the right specification for your Surrey property if:",
    candidates: [
      "Your driveway slopes significantly from the road, making swing gate clearance impractical or expensive to engineer",
      "The approach is short and swing clearance would obstruct parked vehicles or the road itself",
      "The opening exceeds 5 metres and structural efficiency matters as much as appearance",
      "You have a clear run of boundary wall or fence at least as wide as the proposed gate on one side",
      "The architectural style of your property suits a contemporary gate sitting flat against the boundary when open",
    ],
    process: [
      { title: 'Site Survey and Configuration', desc: 'The installer measures the opening, checks gradient, assesses run-back availability on both sides, and recommends track or cantilever based on ground conditions and site layout.' },
      { title: 'Groundwork and Track Foundation', desc: 'The concrete track foundation is excavated and poured, and electrical conduit is run for the motor supply and any intercom cabling during this stage, before reinstatement.' },
      { title: 'Gate and Drive System Installation', desc: 'Track is set and aligned, the gate is hung and adjusted for level travel, the motor and drive rack are fitted, and safety photocells are positioned and wired.' },
      { title: 'Commissioning and Handover', desc: 'Travel limits are calibrated, safety sensor response is tested to BS EN 12453, remotes and any app access are programmed, and the manual release procedure is demonstrated.' },
    ],
  },
  'electric-swing': {
    intro: [
      "Swing gates are the default expectation on detached Surrey properties, and it is an expectation that is well-founded. A pair of gates opening as you pull up to the driveway delivers something that other gate types do not quite achieve: the combination of a strong architectural statement at the entrance and the daily convenience of hands-free access. The format has been in use for long enough that the technology is mature, the failure modes are well-understood, and the installer population that can execute it well is substantial.",
      "The motor decision shapes the aesthetic as much as the gate design itself. Underground motors sit in a chamber excavated beneath the gate post, completely invisible when the gate is in the closed position. The gate face is uninterrupted, the post is unencumbered, and the entrance reads as a clean piece of design rather than a mechanical installation. Ram-arm motors mount on the rear faces of the gate and post, visible from the property side. They are a practical and entirely reliable choice, easier to service than underground systems and better suited to gates being retrofit onto existing posts where excavation is not practical.",
      "The suitability check for a swing gate comes down to clearance. The gate leaf needs to complete its full 90-degree arc without hitting parked vehicles, steps, raised borders, or structures within the swing path. Surrey driveways with gradients, particularly those sloping toward the property, add a further consideration: the bottom of the gate leaf will describe a path that comes closer to the slope as it opens, which requires the motor specification and hinge geometry to account for the gradient. Your installer will walk the arc on site before specifying anything.",
    ],
    benefits: [
      { title: 'Stronger Architectural Presence', desc: 'Paired gates opening symmetrically from a central point make a statement that a single sliding leaf does not. The format suits Surrey period properties, detached family homes, and any entrance where the gate is meant to be seen.' },
      { title: 'Lower Cost Than Sliding on Standard Sites', desc: 'No track foundation and less groundwork means a swing installation typically costs less than an equivalent sliding system on a flat driveway with a standard opening. The saving ranges from £500 to £2,000 depending on specification.' },
      { title: 'Underground Motor Option', desc: 'The concealed motor approach is more widely specified in Surrey than most counties. On premium properties in Weybridge, Cobham, and Esher, underground motors are the standard choice rather than the exception.' },
      { title: 'Accommodates Pedestrian Access', desc: 'A half-width pedestrian leaf or integrated wicket allows foot access without triggering the full gate cycle. Useful on properties with regular foot traffic from staff, deliveries, or family members who do not drive.' },
    ],
    candidateIntro: "Swing gates suit most Surrey residential properties where the driveway allows it:",
    candidates: [
      "Your driveway has adequate depth for gate leaves to swing fully inward without blocking parking or the road",
      "The gradient is manageable with standard hinge engineering, or the driveway is flat",
      "The opening is up to 5 metres wide, within the practical range for swing gate structural efficiency",
      "The architectural character of the property suits paired gates opening symmetrically at the entrance",
      "Budget is a relevant factor and the site does not specifically require a sliding system",
    ],
    process: [
      { title: 'Survey and Arc Check', desc: 'The installer measures the opening, walks the full swing arc checking for obstructions at every point, assesses pillar and foundation condition, and confirms motor type based on gate weight, post condition, and gradient.' },
      { title: 'Foundation and Post Work', desc: 'Posts are set in reinforced concrete if new installation. Underground motor chambers are excavated and formed. Conduit is installed for power, intercom, and keypad wiring before any surface reinstatement.' },
      { title: 'Gate Hanging and Motor Fitting', desc: 'Gate leaves are hung and adjusted for alignment, motors are fitted into chambers or onto post faces, safety photocells are positioned to provide full coverage of the gate path, and all wiring is terminated.' },
      { title: 'Programming and Handover', desc: 'Travel limits are set, force limits are calibrated to BS EN 12453, remotes and access devices are programmed, and the manual release procedure is demonstrated before the installer leaves site.' },
    ],
  },
  'wooden-gates': {
    intro: [
      "Timber gates belong to a different conversation from metal ones. They are not chosen because they are the cheapest option or because the homeowner has not considered steel. They are chosen because the property calls for them: because the entrance faces a conservation area street where cast iron railings and painted timber are the reference materials; because the garden beyond the gate is established and the natural character of wood belongs in that setting; because the house is a barn conversion or a Victorian villa where a powder-coated aluminium gate would jar. When the brief is right, no other material comes close.",
      "Three timber species account for almost all Surrey residential gate installations. Iroko is the practical choice for most situations: it is naturally durable to Use Class 3 without reliance on applied treatment, it holds its shape well through the seasonal weather cycles of the South East, and it accepts oil treatment uniformly across its surface. European oak brings greater character to the grain and is the preference when the timber itself is a design feature rather than a structure to be finished. Accoya is the specification when low maintenance is a firm requirement: the acetylation process so fundamentally changes how the timber responds to moisture that the manufacturer certifies 50 years above-ground durability, and in exposed rural positions in the Surrey Hills this genuinely matters.",
      "Bespoke fabrication is the norm for timber gates in Surrey, not a premium option. A skilled maker can work to a precise brief for a fraction of the additional cost that bespoke metalwork would require, and the output can reference the proportions of your gateposts, the profile of your fencing, or a detail taken from the house itself. Most Surrey joinery firms specialising in gates will produce drawings for approval before cutting a single piece of timber.",
    ],
    benefits: [
      { title: 'The Natural Choice for Surrey Heritage Properties', desc: 'Conservation areas, listed buildings, AONB settings, and properties where the local planning context favours traditional materials all benefit from timber gates. In these contexts, hardwood is not just aesthetically superior; it is often the specification that planning advisers expect.' },
      { title: 'Genuinely Bespoke at an Accessible Price', desc: 'The joinery skills required for hardwood gate fabrication are more widely available than specialist metalworking. A one-off design that exactly suits your property adds modest cost over a standard size and is achievable through most Surrey timber gate makers.' },
      { title: 'Privacy and Acoustic Benefit', desc: 'A close-boarded hardwood gate gives complete visual privacy and meaningful reduction of road noise, which is relevant on Surrey properties fronting A-roads or in areas with consistent traffic flow.' },
      { title: 'Material That Ages Well', desc: 'A well-specified iroko or oak gate does not degrade over time the way a poorly treated timber does; it weathers. Left oiled, it retains warmth. Left untreated, oak develops a consistent silver-grey patina that suits garden settings.' },
    ],
    candidateIntro: "Hardwood driveway gates are worth specifying if:",
    candidates: [
      "The property is a period house, barn conversion, rural dwelling, or any building where a natural material is architecturally right",
      "The entrance is within a conservation area or AONB where planning context favours traditional materials",
      "Privacy is a requirement and a solid-boarded design suits the setting and street scene",
      "You are prepared for a maintenance interval of one to two years with a penetrating oil, or want to specify Accoya for a low-maintenance alternative",
      "A bespoke design referencing the property's specific architectural details is part of the brief",
    ],
    process: [
      { title: 'Design Brief and Timber Selection', desc: 'Your installer discusses the design direction, shows timber samples, advises on species relative to your maintenance preference, and confirms automation requirements before producing drawings.' },
      { title: 'Drawings and Approval', desc: 'Detailed fabrication drawings are produced and submitted for your approval. No timber is ordered or cut until the design is signed off.' },
      { title: 'Workshop Fabrication', desc: 'Gates are made to the approved drawings in the workshop. Allow 3 to 5 weeks from confirmed order, depending on species availability and design complexity.' },
      { title: 'Installation and Aftercare', desc: 'Gates are hung on galvanised or stainless ironmongery, the initial treatment coat is applied on site, automation is fitted and commissioned if included, and a written maintenance schedule is handed over.' },
    ],
  },
  'metal-gates': {
    intro: [
      "Surrey is one of the strongest markets for metal driveway gates in England, and the county illustrates the full range of what the material category covers. At the top end of the market, hand-forged wrought iron gates on brick piers with gilded finials and underground motors are a recurring specification in the Weybridge, Cobham, and Esher area. At the other end, a precision-cut aluminium sliding gate in anthracite powder coat is the functional, contemporary solution for a new-build in Woking or Camberley. Between these points sits the majority of Surrey metal gate installations: mild steel fabricated to a bespoke design, hot-dip galvanised, and finished in whatever colour the property requires.",
      "The treatment specification separates quality installations from inadequate ones, and this matters more than any other single decision in the specification process. Steel corrodes. The only way to prevent it from doing so over a 20-year-plus service life is to encase the metal in zinc before the decorative coating is applied. Hot-dip galvanising immerses the fabricated gate in molten zinc, bonding a zinc layer to every surface including internal faces, weld points, and cut edges. The powder coat is then applied over the zinc. When the powder coat is chipped or scratched, it exposes zinc rather than steel, and the zinc continues to protect through a sacrificial mechanism. An installation specified without this step will show rust at damaged points within a few seasons.",
      "Design flexibility in fabricated metal is substantial. Laser cutting allows intricate patterns, personalised house names or numbers, and geometric motifs to be cut from flat plate with precision that hand fabrication cannot match. Traditional profiles with curved heads, spear finials, and collar scrollwork are well within the capability of most Surrey fabricators and are widely specified on period properties and in conservation areas. CAD drawings before cutting and 3D renders for larger projects are standard practice across the fabricators our network works with.",
    ],
    benefits: [
      { title: 'Exceptional Longevity When Correctly Specified', desc: 'A galvanised and powder-coated steel gate installed to quality standards will require no significant remedial work for two decades. Aluminium has no corrosion mechanism at all and carries an indefinite functional life with no additional treatment.' },
      { title: 'Physical Security', desc: 'Well-built steel or wrought iron provides a level of physical resistance that timber cannot match. Combined with appropriate post foundations and hinge specification, a metal gate is a serious deterrent against forced entry.' },
      { title: 'Complete Design Freedom', desc: 'From Georgian ironwork reproductions to contemporary perforated panels, from personalized laser-cut crests to minimalist horizontal flat bar, metal fabrication can realise any brief. No other material offers this range while maintaining structural strength.' },
      { title: 'Minimal Maintenance Demand', desc: 'Once the galvanising and powder coat are intact, a metal gate needs almost nothing. An annual wash, a visual inspection of the finish, and touch-up of any chips is the full maintenance requirement for the first 20 years.' },
    ],
    candidateIntro: "Metal driveway gates are the natural specification if:",
    candidates: [
      "Security is a primary driver and you want the strongest available physical barrier at the entrance",
      "You want a gate that requires no maintenance schedule beyond an annual wash for the next two decades",
      "The design brief calls for ornate ironwork, laser-cut personalisation, or a contemporary precision-cut aesthetic",
      "Your property is in a conservation area where a specific heritage metalwork style is required or expected by the planning authority",
      "The entrance scale or architectural character of the property suits wrought iron and the budget supports the investment",
    ],
    process: [
      { title: 'Design Consultation and CAD Drawings', desc: 'Your installer reviews portfolio examples with you, discusses material, profile, and colour, and produces CAD drawings for approval. 3D renders are standard on more complex projects.' },
      { title: 'Fabrication and Surface Treatment', desc: 'The gate is fabricated in the workshop, shot-blasted to a clean steel surface, immersed in the hot-dip galvanising bath, and powder-coated in your specified RAL colour. Allow 3 to 6 weeks from drawing approval.' },
      { title: 'Installation and Foundation Check', desc: 'The gate is hung on new or existing posts, post foundations are inspected and upgraded if required, and automation and access control equipment are fitted and wired.' },
      { title: 'Commissioning and Handover', desc: 'Travel limits are set, safety stops are calibrated and tested, all access devices are programmed, and the manual release procedure is demonstrated before the installer leaves site.' },
    ],
  },
  'automated-systems': {
    intro: [
      "Automation retrofits are the gate job that most Surrey installers carry out more than any other. The typical scenario is a homeowner with manual gates that are structurally sound and aesthetically right for the property, who has reached the point where getting out of the car to open them is no longer acceptable as a daily routine. The retrofit process addresses this without disturbing the gates themselves: a motor is added, the structural condition of the posts and hinges is verified and upgraded if needed, and the result is gates that operate identically to a factory-installed system.",
      "The motor choice on a retrofit follows the same logic as on a new installation but with an additional constraint: the existing post may or may not accommodate underground motor installation without significant excavation or structural work. On posts set in adequate concrete with enough clearance at the base, underground motors are a clean and achievable option even on a retrofit project. Where the post foundations are marginal or the access is awkward, a ram-arm system mounted on the face is the practical choice. An experienced installer will make this assessment honestly at the site visit rather than defaulting to the higher-cost option.",
      "Beyond the motor, the access control specification is where the retrofit can be made to do considerably more than the manual gates ever did. A video intercom with a camera at the gate entrance and a smartphone app gives real-time visibility of every caller regardless of where you are. A proximity reader fitted to the gate post registers a card or fob in the vehicle as it approaches and opens the gate without any driver action. GSM and Wi-Fi modules connect the gate to smart home platforms and allow remote operation, notifications on every gate event, and temporary access grants for tradespeople or regular visitors.",
    ],
    benefits: [
      { title: 'Keep Your Existing Gates', desc: 'Where the gates are in sound condition and the right aesthetic choice for the property, a retrofit lets you add the functionality of automation without the cost and lead time of new gate fabrication.' },
      { title: 'Underground Motors Available on Most Surrey Retrofits', desc: 'The preference for concealed motors in the Surrey market is well-established, and most retrofit sites in the county can accommodate underground installation with relatively minor additional work.' },
      { title: 'Full Smart Access Integration', desc: 'Video intercom, proximity readers, keypad entry, and smart home integration with Google Home, Amazon Alexa, and Apple HomeKit are all available as additions to any retrofit package.' },
      { title: 'BS EN 12453 Compliance as Standard', desc: 'Every retrofit must meet the same safety standard as a new installation. Photocell coverage, safety edges, force limits, and auto-reverse are all tested and documented before handover.' },
    ],
    candidateIntro: "A gate automation retrofit makes sense if:",
    candidates: [
      "You have existing manual gates that are structurally sound and correctly hung on posts with adequate foundations",
      "The gates are the right aesthetic choice for the property and fabricating new gates is not the priority",
      "Daily operation of the gates as a manual task has become inconvenient enough to justify the investment",
      "Vehicle security is a concern and a closed automated gate is a meaningful deterrent against the relay theft methods common in Surrey",
      "Smart home integration and remote gate management are on the brief alongside basic electric operation",
    ],
    process: [
      { title: 'Structural Assessment', desc: 'The installer checks gate weight, hinge condition, post alignment, and foundation adequacy. Any remedial work needed before the motor is fitted is identified and quoted separately before the automation work begins.' },
      { title: 'Motor and Access Control Specification', desc: 'Motor type and torque are confirmed based on the gate weight assessment. Access control items are specified based on your requirements. Everything is agreed before any equipment is ordered.' },
      { title: 'Installation', desc: 'Motors are fitted, underground chambers excavated where specified, photocells and safety edges positioned, intercom and keypad cabling run, and all equipment wired to the control board.' },
      { title: 'Commissioning and Handover', desc: 'Safety sensor response is tested to BS EN 12453, travel limits are calibrated, all access devices are programmed and tested, and the written declaration of conformity is provided at handover.' },
    ],
  },
  'gate-repair': {
    intro: [
      "Gate faults in Surrey follow predictable patterns. Motor and gearbox wear from inadequate lubrication or under-specification for the gate weight. Control board failure from moisture ingress, usually through a poorly sealed housing or a cable entry point that was not adequately weatherproofed. Photocell misalignment after vehicle impact or frost movement, causing the gate to stop mid-travel when there is no obstruction. Hinge wear on gates that were never correctly adjusted at installation, creating a sagging leaf that the motor has to fight to move. Track contamination on sliding gates, where leaf litter, grit, and debris build up in the channel until the rollers bind.",
      "The majority of these faults are resolved in a single visit by an engineer who carries diagnostic equipment and the common spare parts for the brands most widely installed in Surrey: FAAC, BFT, CAME, Nice, and Beninca. The brands matter because parts availability for any given motor is determined by the manufacturer support infrastructure, and the established brands all maintain active spare parts supply for their product ranges for a minimum of ten years after production ends. Unbranded or obscure motors installed by less experienced firms create a recurring problem: the motor fails and the parts to fix it are either not available or need to be sourced from overseas at significant delay and cost.",
      "Annual servicing is the most straightforward way to avoid most of the scenarios above. A service visit catches motor wear, lubrication deficiency, hinge fatigue, and safety sensor drift at the point where they are inexpensive to address. The same problems left until they cause a system failure generate a more expensive repair, an emergency callout fee, and a period of manual gate operation that is exactly the inconvenience the system was installed to prevent.",
    ],
    benefits: [
      { title: 'Same-Day Attendance for Urgent Faults', desc: 'Gates stuck open in an unsafe or insecure position are treated as urgent. Engineers in our network aim to attend same-day for situations where the gate cannot be secured in the closed position.' },
      { title: 'Diagnosis Before Repair Commitment', desc: 'Every callout starts with a structured diagnostic. You receive a clear explanation of the fault and a written quote for the repair before any work is carried out. No surprise charges.' },
      { title: 'Stock Parts for Surrey Market Brands', desc: 'Engineers carry parts for FAAC, BFT, CAME, Nice, and Beninca. The majority of Surrey callouts are resolved on the first visit because the right component is on the van.' },
      { title: 'Annual Service Contracts Available', desc: 'A maintenance contract schedules the annual service automatically and typically includes priority callout response. It is the simplest way to ensure the gate is seen every year without having to remember to book it.' },
    ],
    candidateIntro: "You should book a gate repair or service if:",
    candidates: [
      "The gate has stopped responding to the remote, is travelling erratically, or is making unfamiliar mechanical noises",
      "The gate is stuck in the open position and cannot be secured closed manually",
      "The safety sensors are triggering when there is no obstruction, causing repeated stopping mid-travel",
      "The gate has not been serviced in the last 12 months and is still within the motor warranty period",
      "A hinge has developed visible play or the gate leaf is visibly dropping or misaligning with the closing point",
    ],
    process: [
      { title: 'Callout and Diagnostic', desc: 'The engineer attends and runs a systematic diagnostic covering the motor, control board, safety sensors, drive mechanism, hinges, and gate structure. A written fault report and repair quote are provided before work begins.' },
      { title: 'First-Visit Repair', desc: 'Where the fault can be resolved with parts on the van, the repair is completed on the same visit. The system is fully tested after the repair before the engineer leaves site.' },
      { title: 'Parts Order and Return Visit', desc: 'If a component needs to be ordered, the gate is made safe and operable in manual mode pending the return visit. Lead times for parts from the main brands are typically 1 to 5 working days.' },
      { title: 'Post-Repair Testing and Report', desc: 'After repair or servicing, the full system is tested: motor travel limits, safety sensor response, battery backup, and all access control devices. A written service report is provided covering all work completed and any observations for future attention.' },
    ],
  },
};


export function ServicePageClient({ params }: { params: { serviceSlug: string } }) {
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

  return (
    <>
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
                      Surrey specialists for {service.title.toLowerCase()} covering {totalCities} towns and areas across the county.
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
                  A site survey is always the right starting point. Your installer will assess the driveway, check planning position if relevant, and give you a firm recommendation based on what the site actually allows.
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
                <FAQ faqs={[...(service.faqs || []), ...FAQS_SERVICES]} title={`${service.title} FAQs`} />
              </div>

              <section className="mb-14">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Covering Your Part of Surrey</h2>
                <p className="text-gray-600 leading-relaxed mb-0">Gate specialists in our network cover the whole of Surrey, from the stockbroker belt in the north, through the commuter belt of Woking and Camberley, to the AONB villages and rural properties in the south of the county. Submit your postcode and we will identify the right installers for your specific area.</p>
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
                      { icon: <Shield className="w-4 h-4 text-brand-500" />, text: "Verified gate specialists" },
                      { icon: <Star className="w-4 h-4 text-brand-500" />, text: "Insured and warranted network" },
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
