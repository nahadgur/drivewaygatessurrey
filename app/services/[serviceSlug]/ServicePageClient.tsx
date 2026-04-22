// app/services/[serviceSlug]/ServicePageClient.tsx
'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';
import { services, getServiceBySlug } from '@/data/services';
import { LOCATIONS, toSlug } from '@/data/locations';
import { FAQS_SERVICES } from '@/data/site';
import { isServiceLocationIndexed } from '@/data/indexing-tiers';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroLeadForm } from '@/components/HeroLeadForm';
import { LeadFormModal } from '@/components/LeadFormModal';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PricingSection } from '@/components/PricingSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTACard } from '@/components/ui/CTACard';
import { LocationPill } from '@/components/ui/LocationPill';

// ----------------------------------------------------------------------
// Per-service long-form content.
// Source of the substantive page copy for each service hub. The shape is
// stable across the 6 services so the render block treats them uniformly.
// ----------------------------------------------------------------------
const serviceContent: Record<
  string,
  {
    intro: string[];
    benefits: { title: string; desc: string }[];
    candidateIntro: string;
    candidates: string[];
    process: { title: string; desc: string }[];
  }
> = {
  'electric-sliding': {
    intro: [
      "Surrey driveways present a specific set of challenges that make sliding gates the right answer more often than in most counties. The county has a large number of sloped driveways, particularly across the North Downs between Reigate and Guildford, the Surrey Hills between Dorking and Haslemere, and the hillside streets of Epsom, Leatherhead, and Caterham. A swing gate on a significant gradient requires complex hinge engineering and careful motor specification; a sliding gate sidesteps the problem entirely by moving horizontally along the boundary rather than sweeping through a vertical arc.",
      "The operating principle is straightforward. A motor drives a rack fixed along the bottom of the gate, pulling it along a ground-level track or, in the case of a cantilever installation, sliding it along an elevated rail above the surface. The choice between track and cantilever depends on the site: track systems are standard on flat ground and are the more cost-effective option; cantilever is chosen where the ground cannot accommodate a track, where the gradient makes a level track impractical without significant groundwork, or where the driveway surface has a decorative finish that should not be interrupted.",
      "Run-back space is the main planning constraint. The gate needs a clear zone alongside the opening at least as wide as the gate leaf itself, with an additional 500mm or so for the motor housing and mechanical end stops. On many Surrey properties this space is readily available as a boundary wall or close-boarded fence runs alongside the opening. Where it is not, a biparting layout splits the gate into two leaves that slide in opposite directions, halving the run-back needed on each side.",
    ],
    benefits: [
      { title: 'Works on sloped Surrey driveways', desc: 'Where swing gates are defeated by gradient, a sliding gate simply tracks along the boundary. Cantilever systems eliminate the ground constraint entirely and are well-suited to the varied terrain found across the North Downs and Surrey Hills.' },
      { title: 'Structurally efficient on wide openings', desc: 'Wide gate leaves create enormous leverage on swing gate hinge posts. A sliding gate carries its load along the track rather than concentrating it at a hinge point, making it the structurally superior choice for openings above 5 metres.' },
      { title: 'Compact footprint, clean appearance', desc: 'When open, the gate leaf sits flat against the boundary with nothing projecting into the driveway. A significant practical advantage on short approaches common in Surrey commuter towns.' },
      { title: 'Low maintenance drive system', desc: 'Rack-and-pinion drives are simple, proven mechanisms. With annual track cleaning and lubrication, a quality system runs reliably for a decade or more without significant component replacement.' },
    ],
    candidateIntro: 'A sliding gate is likely the right specification for your Surrey property if:',
    candidates: [
      'Your driveway slopes significantly from the road, making swing gate clearance impractical or expensive to engineer',
      'The approach is short and swing clearance would obstruct parked vehicles or the road itself',
      'The opening exceeds 5 metres and structural efficiency matters as much as appearance',
      'You have a clear run of boundary wall or fence at least as wide as the proposed gate on one side',
      'The architectural style of your property suits a contemporary gate sitting flat against the boundary when open',
    ],
    process: [
      { title: 'Site survey and configuration', desc: 'The installer measures the opening, checks gradient, assesses run-back availability on both sides, and recommends track or cantilever based on ground conditions and site layout.' },
      { title: 'Groundwork and track foundation', desc: 'The concrete track foundation is excavated and poured, and electrical conduit is run for the motor supply and any intercom cabling during this stage, before reinstatement.' },
      { title: 'Gate and drive system installation', desc: 'Track is set and aligned, the gate is hung and adjusted for level travel, the motor and drive rack are fitted, and safety photocells are positioned and wired.' },
      { title: 'Commissioning and handover', desc: 'Travel limits are calibrated, safety sensor response is tested to BS EN 12453, remotes and any app access are programmed, and the manual release procedure is demonstrated.' },
    ],
  },
  'electric-swing': {
    intro: [
      'Swing gates are the default expectation on detached Surrey properties, and it is an expectation that is well-founded. A pair of gates opening as you pull up to the driveway delivers something that other gate types do not quite achieve: the combination of a strong architectural statement at the entrance and the daily convenience of hands-free access. The format has been in use for long enough that the technology is mature, the failure modes are well-understood, and the installer population that can execute it well is substantial.',
      'The motor choice shapes the appearance more than any other specification decision. Underground motors, fitted into sealed chambers set into the driveway surface either side of the entrance, leave the gateposts visually unaltered and are the expected specification on premium Surrey properties where the gate is a frequent aesthetic reference point. Ram-arm motors bolt onto the face of the post and drive the gate through an articulated arm; they are visible, rugged, and considerably less expensive, and they are the standard specification on mid-market installations where the gate itself is the visual priority rather than the pier.',
      'The gate weight and width drive the motor sizing. A hardwood pair of 2.5-metre leaves on a typical residential opening is comfortably handled by a domestic-grade motor. A full pair of wrought iron leaves on a 4-metre opening with integrated decorative scrollwork crosses into the heavy-duty category and requires a commercial-grade motor with appropriate thermal protection. A good installer sizes the motor for the gate, not the other way round, and the assessment is made at the site survey before any motor brand is specified.',
    ],
    benefits: [
      { title: 'The traditional specification for period properties', desc: 'A pair of swing gates is the right answer for the majority of detached Surrey homes, particularly Victorian, Edwardian, and inter-war properties where the house elevation expects a traditional entrance treatment.' },
      { title: 'Invisible automation available', desc: 'Underground motors leave the gate and piers entirely unaltered, producing an installation that looks manual but operates hands-free. The specification of choice on premium Surrey estates.' },
      { title: 'Faster opening than sliding gates', desc: 'A swing gate typically opens in 10-12 seconds versus 15-20 for a sliding gate of similar weight. Small differences that compound over years of daily use.' },
      { title: 'Lower groundwork cost', desc: 'Without a track to excavate and set, swing gates involve less groundwork than sliding installations. Where the site supports swing clearance, it is often the more cost-effective specification.' },
    ],
    candidateIntro: 'A swing gate is likely right for your Surrey property if:',
    candidates: [
      'Your driveway has adequate clearance for the gate to swing open without blocking parked vehicles',
      'The entrance is on reasonably level ground, or the gradient is shallow enough to allow engineered hinge geometry',
      'The property style is period, traditional, or architecturally formal, where a pair of swing gates is visually correct',
      'You want underground automation that leaves the visible gate entirely traditional',
      'The opening is within 5 metres, which is the comfortable upper limit for a residential swing pair',
    ],
    process: [
      { title: 'Site survey and specification', desc: 'The installer measures opening, swing clearance, post foundation requirements, and advises on underground versus ram-arm motors based on budget and property type.' },
      { title: 'Gate and post fabrication', desc: 'Gates are fabricated to the agreed design in the workshop. Allow 3 to 6 weeks depending on timber or metal specification and whether scrollwork or decorative detail is included.' },
      { title: 'Gate hanging and motor fitting', desc: 'Gate leaves are hung and adjusted for alignment, motors are fitted into chambers or onto post faces, safety photocells are positioned to provide full coverage of the gate path, and all wiring is terminated.' },
      { title: 'Programming and handover', desc: 'Travel limits are set, force limits are calibrated to BS EN 12453, remotes and access devices are programmed, and the manual release procedure is demonstrated before the installer leaves site.' },
    ],
  },
  'wooden-gates': {
    intro: [
      'Timber gates belong to a different conversation from metal ones. They are not chosen because they are the cheapest option or because the homeowner has not considered steel. They are chosen because the property calls for them: because the entrance faces a conservation area street where cast iron railings and painted timber are the reference materials; because the garden beyond the gate is established and the natural character of wood belongs in that setting; because the house is a barn conversion or a Victorian villa where a powder-coated aluminium gate would jar. When the brief is right, no other material comes close.',
      'Three timber species account for almost all Surrey residential gate installations. Iroko is the practical choice for most situations: it is naturally durable to Use Class 3 without reliance on applied treatment, it holds its shape well through the seasonal weather cycles of the South East, and it accepts oil treatment uniformly across its surface. European oak brings greater character to the grain and is the preference when the timber itself is a design feature rather than a structure to be finished. Accoya is the specification when low maintenance is a firm requirement: the acetylation process so fundamentally changes how the timber responds to moisture that the manufacturer certifies 50 years above-ground durability, and in exposed rural positions in the Surrey Hills this genuinely matters.',
      'Bespoke fabrication is the norm for timber gates in Surrey, not a premium option. A skilled maker can work to a precise brief for a fraction of the additional cost that bespoke metalwork would require, and the output can reference the proportions of your gateposts, the profile of your fencing, or a detail taken from the house itself. Most Surrey joinery firms specialising in gates will produce drawings for approval before cutting a single piece of timber.',
    ],
    benefits: [
      { title: 'The natural choice for Surrey heritage properties', desc: 'Conservation areas, listed buildings, AONB settings, and properties where the local planning context favours traditional materials all benefit from timber gates. In these contexts, hardwood is often the specification that planning advisers expect.' },
      { title: 'Genuinely bespoke at an accessible price', desc: 'The joinery skills required for hardwood gate fabrication are more widely available than specialist metalworking. A one-off design that exactly suits your property adds modest cost over a standard size and is achievable through most Surrey timber gate makers.' },
      { title: 'Privacy and acoustic benefit', desc: 'A close-boarded hardwood gate gives complete visual privacy and meaningful reduction of road noise, which is relevant on Surrey properties fronting A-roads or in areas with consistent traffic flow.' },
      { title: 'Material that ages well', desc: 'A well-specified iroko or oak gate weathers rather than degrades. Left oiled, it retains warmth. Left untreated, oak develops a consistent silver-grey patina that suits garden settings.' },
    ],
    candidateIntro: 'Hardwood driveway gates are worth specifying if:',
    candidates: [
      'The property is a period house, barn conversion, rural dwelling, or any building where a natural material is architecturally right',
      'The entrance is within a conservation area or AONB where planning context favours traditional materials',
      'Privacy is a requirement and a solid-boarded design suits the setting and street scene',
      'You are prepared for a maintenance interval of one to two years with a penetrating oil, or want to specify Accoya for a low-maintenance alternative',
      'A bespoke design referencing the property\'s specific architectural details is part of the brief',
    ],
    process: [
      { title: 'Design brief and timber selection', desc: 'Your installer discusses the design direction, shows timber samples, advises on species relative to your maintenance preference, and confirms automation requirements before producing drawings.' },
      { title: 'Drawings and approval', desc: 'Detailed fabrication drawings are produced and submitted for your approval. No timber is ordered or cut until the design is signed off.' },
      { title: 'Workshop fabrication', desc: 'Gates are made to the approved drawings in the workshop. Allow 3 to 5 weeks from confirmed order, depending on species availability and design complexity.' },
      { title: 'Installation and aftercare', desc: 'Gates are hung on galvanised or stainless ironmongery, the initial treatment coat is applied on site, automation is fitted and commissioned if included, and a written maintenance schedule is handed over.' },
    ],
  },
  'metal-gates': {
    intro: [
      'Surrey is one of the strongest markets for metal driveway gates in England, and the county illustrates the full range of what the material category covers. At the top end of the market, hand-forged wrought iron gates on brick piers with gilded finials and underground motors are a recurring specification in the Weybridge, Cobham, and Esher area. At the other end, a precision-cut aluminium sliding gate in anthracite powder coat is the functional, contemporary solution for a new-build in Woking or Camberley. Between these points sits the majority of Surrey metal gate installations: mild steel fabricated to a bespoke design, hot-dip galvanised, and finished in whatever colour the property requires.',
      'The treatment specification separates quality installations from inadequate ones, and this matters more than any other single decision in the specification process. Steel corrodes. The only way to prevent it from doing so over a 20-year-plus service life is to encase the metal in zinc before the decorative coating is applied. Hot-dip galvanising immerses the fabricated gate in molten zinc, bonding a zinc layer to every surface including internal faces, weld points, and cut edges. The powder coat is then applied over the zinc. When the powder coat is chipped or scratched, it exposes zinc rather than steel, and the zinc continues to protect through a sacrificial mechanism. An installation specified without this step will show rust at damaged points within a few seasons.',
      'Design flexibility in fabricated metal is substantial. Laser cutting allows intricate patterns, personalised house names or numbers, and geometric motifs to be cut from flat plate with precision that hand fabrication cannot match. Traditional profiles with curved heads, spear finials, and collar scrollwork are well within the capability of most Surrey fabricators and are widely specified on period properties and in conservation areas. CAD drawings before cutting and 3D renders for larger projects are standard practice across the fabricators our network works with.',
    ],
    benefits: [
      { title: 'Exceptional longevity when correctly specified', desc: 'A galvanised and powder-coated steel gate installed to quality standards will require no significant remedial work for two decades. Aluminium has no corrosion mechanism at all and carries an indefinite functional life with no additional treatment.' },
      { title: 'Physical security', desc: 'Well-built steel or wrought iron provides a level of physical resistance that timber cannot match. Combined with appropriate post foundations and hinge specification, a metal gate is a serious deterrent against forced entry.' },
      { title: 'Complete design freedom', desc: 'From Georgian ironwork reproductions to contemporary perforated panels, from personalised laser-cut crests to minimalist horizontal flat bar, metal fabrication can realise any brief. No other material offers this range while maintaining structural strength.' },
      { title: 'Minimal maintenance demand', desc: 'Once the galvanising and powder coat are intact, a metal gate needs almost nothing. An annual wash, a visual inspection of the finish, and touch-up of any chips is the full maintenance requirement for the first 20 years.' },
    ],
    candidateIntro: 'Metal driveway gates are the natural specification if:',
    candidates: [
      'Security is a primary driver and you want the strongest available physical barrier at the entrance',
      'You want a gate that requires no maintenance schedule beyond an annual wash for the next two decades',
      'The design brief calls for ornate ironwork, laser-cut personalisation, or a contemporary precision-cut aesthetic',
      'Your property is in a conservation area where a specific heritage metalwork style is required or expected by the planning authority',
      'The entrance scale or architectural character of the property suits wrought iron and the budget supports the investment',
    ],
    process: [
      { title: 'Design brief and drawings', desc: 'Your fabricator takes measurements, discusses style direction, and produces CAD drawings or 3D renders for your approval before cutting begins. Allow 1 to 2 weeks at this stage for review and iteration.' },
      { title: 'Fabrication and finishing', desc: 'Gates are cut, welded, and finished in the workshop. Hot-dip galvanising is a separate process step handled by a specialist facility, and powder coating follows galvanising. Total workshop lead time is 4 to 7 weeks for bespoke fabrication.' },
      { title: 'Installation and motor fitting', desc: 'Gates are hung on appropriately sized hinges matched to the leaf weight, motors are fitted where automation is specified, and safety sensors are positioned to BS EN 12453 coverage requirements.' },
      { title: 'Commissioning and handover', desc: 'Force limits are calibrated, safety response is tested, access control is programmed, and the finish is inspected for any defects from transport or installation. Any issues are addressed before sign-off.' },
    ],
  },
  'automated-gates': {
    intro: [
      'Gate automation in Surrey falls into two distinct categories: new installations where the gate and motor are specified together, and retrofit automation where an existing manual gate is upgraded with a motor and access control. Both are well-supported by the installer network in the county, and the specification questions are broadly similar in each case. The difference lies in what constraints the existing structure places on the motor choice.',
      'Motor brand matters substantially for long-term parts availability. FAAC, BFT, CAME, NICE, and Beninca are the five manufacturers whose products dominate the residential automation market in the UK and who maintain active parts supply for 10 years or more after a given model is discontinued. Specifying a motor from one of these manufacturers means that when a control board needs replacement in year 12, the part is available from a UK distributor and can be fitted by any competent automation engineer. Specifying an unbranded or lesser-known motor means that at the first board failure, the entire unit typically needs replacing.',
      'Safety commissioning is the element of automation that distinguishes a competent installer from an inadequate one. BS EN 12453 sets out the requirements for force limits, photocell coverage, and auto-reverse behaviour on residential gate systems; a proper commissioning involves measuring force at multiple points on the gate arc with a calibrated test instrument, confirming photocell response at multiple beam positions, and verifying that the gate reverses when contact resistance is encountered. A written commissioning certificate documenting all test results is handed over at the end of the installation. Anything less is not a finished automation job.',
    ],
    benefits: [
      { title: 'Hands-free access', desc: 'The daily convenience is significant. Remote or app-triggered opening as you approach the driveway, automatic closing behind you, no need to get out of the car in weather or at night.' },
      { title: 'Security benefit when closed', desc: 'An automated gate stays closed by default. A manual gate, in practice, often gets left open because closing it every time is inconvenient. Automation removes the friction and the gate does what it is meant to do.' },
      { title: 'Integration with access control', desc: 'Video intercom, keypad entry, proximity fobs, smartphone apps, and ANPR-integrated recognition are all available as part of the automation specification. These layer together to give different user types different access paths.' },
      { title: 'Retrofit is viable on most gates', desc: 'If your existing gate structure is sound and the posts have adequate foundations, retrofit automation is a relatively straightforward upgrade. A site survey establishes feasibility before committing to the specification.' },
    ],
    candidateIntro: 'Gate automation is worth specifying if:',
    candidates: [
      'Your existing gates are manually operated and you want to upgrade to automatic opening',
      'You are installing new gates and want automation specified from the outset for integrated control',
      'Access control is important to you and you want intercom, keypad, or app-based entry built into the system',
      'You live on a busy road where closing the gate manually every time is impractical',
      'The gate weight is within the capability of residential-grade motors (most are) and the post foundations can accept the motor loading',
    ],
    process: [
      { title: 'Feasibility survey', desc: 'For retrofit projects, the installer assesses gate structure, hinge condition, post foundation, available power supply, and establishes whether the existing gate can take automation without remedial work to the structure.' },
      { title: 'Motor and access control specification', desc: 'Motor type (underground, ram-arm, or sliding) is specified based on gate type and weight. Access control system is agreed: intercom brand, keypad type, number of remote handsets, any app or cloud integration.' },
      { title: 'Installation', desc: 'Motor units are fitted to gates or posts, power supply is run from the house consumer unit via appropriate conduit, control gear is mounted in weatherproof housing, safety photocells are positioned and wired to BS EN 12453 coverage.' },
      { title: 'Commissioning and handover', desc: 'Force limits are calibrated, safety response is tested at multiple points, all access control is programmed and tested with you present, and a written commissioning certificate is issued covering all test results.' },
    ],
  },
  'gate-repair-maintenance': {
    intro: [
      'Gate repair and maintenance work falls into three broad categories in the Surrey market, and understanding which category your situation falls into shapes the urgency and the specification. Emergency repairs cover gates that have failed in a way that leaves the property insecure or inaccessible: a motor that has stopped responding, a control board that has burned out, a gate that has come off its hinges or run off its track. These need same-day or next-day response from an installer who carries common parts on the van and can make the gate safe, operable, or properly secured within one visit.',
      'Scheduled servicing is the second category and is what a properly specified gate system should receive annually. A service covers motor and gearbox lubrication, drive mechanism inspection and adjustment, hinge condition assessment, safety sensor recalibration and testing, track cleaning on sliding systems, battery backup load testing, and a full structural check of the gate and posts. The service identifies issues before they fail, extends the system life significantly, and costs a fraction of an emergency repair. In Surrey, annual gate servicing is typically £130 to £220 depending on system complexity.',
      'The third category is upgrade work on an ageing but structurally sound gate: replacing worn motor units with a current-specification unit, adding access control that was not part of the original installation, retrofitting safety photocells to bring a pre-standard system up to BS EN 12453 compliance, or swapping a dated intercom panel for a current video intercom. This is common on Surrey gate systems installed 10 to 15 years ago where the gate itself is in good condition but the automation has reached the end of its useful life. An upgrade is often significantly more cost-effective than a full replacement.',
    ],
    benefits: [
      { title: 'Same-day or next-day emergency response', desc: 'For a gate that has failed and left the property insecure, response time is the primary specification. Installers in our Surrey network carry common spares and are equipped for first-visit repair on the majority of fault types.' },
      { title: 'Written fault diagnosis before work begins', desc: 'A proper diagnostic visit produces a written fault report and a repair quote before any work proceeds. You see what is wrong, what the fix involves, and what it costs before committing.' },
      { title: 'Access to all major motor brands', desc: 'Our network installers maintain parts supply relationships with FAAC, BFT, CAME, NICE, and Beninca. Whatever brand your gate is running, we can find an installer who carries or can source the right parts.' },
      { title: 'Safety recommissioning to current standard', desc: 'Repair work on older gates is an opportunity to bring the safety system up to current BS EN 12453 standard. Photocell retrofit, force-limit recalibration, and auto-reverse testing can be included as part of the repair scope.' },
    ],
    candidateIntro: 'Call out a Surrey gate repair specialist if:',
    candidates: [
      'Your automated gate has stopped responding, is responding intermittently, or is making new noises during operation',
      'You have a manual gate that has sagged, become difficult to close, or shows signs of hinge or post failure',
      'Your automation is over 5 years old and has never had a proper service',
      'Your intercom or access control has failed and needs repair or replacement',
      'Your safety sensors are unresponsive, misaligned, or showing fault codes on the control panel',
    ],
    process: [
      { title: 'Callout and diagnostic', desc: 'The engineer attends and runs a systematic diagnostic covering the motor, control board, safety sensors, drive mechanism, hinges, and gate structure. A written fault report and repair quote are provided before work begins.' },
      { title: 'First-visit repair', desc: 'Where the fault can be resolved with parts on the van, the repair is completed on the same visit. The system is fully tested after the repair before the engineer leaves site.' },
      { title: 'Parts order and return visit', desc: 'If a component needs to be ordered, the gate is made safe and operable in manual mode pending the return visit. Lead times for parts from the main brands are typically 1 to 5 working days.' },
      { title: 'Post-repair testing and report', desc: 'After repair or servicing, the full system is tested: motor travel limits, safety sensor response, battery backup, and all access control devices. A written service report is provided covering all work completed and any observations for future attention.' },
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
  const relatedServices = services.filter((s) => s.id !== service.id);

  // Only offer links to service × location combinations that are actually
  // indexed. All other combinations are noindex and linking to them from
  // the indexed service hub would leak link equity into non-indexed URLs.
  const filteredLocations = useMemo(() => {
    const result: Record<string, string[]> = {};
    Object.entries(LOCATIONS).forEach(([region, cities]) => {
      const filtered = cities.filter(
        (city) =>
          isServiceLocationIndexed(service.slug, toSlug(city)) &&
          (!searchQuery ||
            city.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      if (filtered.length > 0) result[region] = filtered;
    });
    return result;
  }, [searchQuery, service.slug]);

  const indexedCountByRegion = useMemo(() => {
    const result: Record<string, number> = {};
    Object.entries(LOCATIONS).forEach(([region, cities]) => {
      result[region] = cities.filter((city) =>
        isServiceLocationIndexed(service.slug, toSlug(city))
      ).length;
    });
    return result;
  }, [service.slug]);

  const totalIndexedForService = Object.values(indexedCountByRegion).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <>
      <LeadFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow">

        {/* HERO */}
        <section className="editorial-container pt-6 pb-8">
          <Breadcrumbs items={[
            { label: 'Gate Services', href: '/services/' },
            { label: service.title },
          ]} />
          <h1 className="font-display text-[2.2rem] md:text-[2.8rem] leading-[0.98] tracking-tight text-teal-ink mb-4" style={{ fontWeight: 400 }}>
            {service.title}<br />
            <span className="italic-voice">across Surrey.</span>
          </h1>
          <p className="font-prose text-[17px] md:text-[18px] leading-[1.5] text-teal-ink/85 max-w-prose-editorial">
            {service.description}
          </p>
        </section>

        {/* LONG-FORM INTRO + LEAD FORM */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container-wide py-10 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
              <div>
                <SectionHeader
                  title={<>{service.title}<br /><span className="italic-voice">in context.</span></>}
                  subtitle="How this specification works in the Surrey market."
                />
                <div className="prose-editorial max-w-prose-editorial">
                  {content.intro.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <HeroLeadForm service={service.title} />
              </aside>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="bg-paper">
          <div className="editorial-container-wide py-10 md:py-16">
            <SectionHeader
              title={<>Benefits of <span className="italic-voice">{service.title.toLowerCase()}.</span></>}
              subtitle="Why this specification works."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
              {content.benefits.map((b, i) => (
                <div key={i} className="py-5 border-t border-teal-ink">
                  <div className="text-[11px] tracking-[0.2em] uppercase text-teal-brand font-medium mb-2">
                    {['One', 'Two', 'Three', 'Four'][i]}
                  </div>
                  <h3 className="font-display text-[1.3rem] leading-tight tracking-tight text-teal-ink mb-2" style={{ fontWeight: 500 }}>
                    {b.title}
                  </h3>
                  <p className="font-prose text-[16px] leading-[1.55] text-teal-ink/80">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CANDIDATE CHECKLIST */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title={<>Is this right<br /><span className="italic-voice">for your property?</span></>}
              subtitle={content.candidateIntro}
            />
            <ul className="space-y-0 mt-4">
              {content.candidates.map((c, i) => (
                <li key={i} className="flex items-start gap-4 py-4 border-b border-teal-line">
                  <div className="font-display text-[1.2rem] leading-none text-accent flex-shrink-0 mt-0.5" style={{ fontWeight: 300 }}>
                    {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][i]}
                  </div>
                  <span className="font-prose text-[16px] leading-[1.55] text-teal-ink/85">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
            <p className="font-prose text-[15px] leading-[1.55] text-teal-ink/70 mt-6 italic">
              A site survey is always the right starting point. Your installer assesses the driveway, checks the planning position where relevant, and gives you a firm recommendation.
            </p>
          </div>
        </section>

        {/* PROCESS */}
        <section className="bg-paper">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title="The installation process"
              subtitle="What happens from enquiry to handover."
            />
            <div>
              {content.process.map((step, i) => (
                <div key={i} className="py-6 border-b border-teal-line last:border-b-0 flex items-start gap-5">
                  <div className="font-display text-[2rem] leading-none text-accent flex-shrink-0" style={{ fontWeight: 300 }}>
                    {['I', 'II', 'III', 'IV'][i]}
                  </div>
                  <div>
                    <h3 className="font-display text-[1.3rem] leading-tight tracking-tight text-teal-ink mb-1" style={{ fontWeight: 500 }}>
                      {step.title}
                    </h3>
                    <p className="font-prose text-[16px] leading-[1.55] text-teal-ink/80">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING — reuses existing component */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container-wide py-10 md:py-16">
            <PricingSection serviceId={service.id} serviceName={service.title} />
          </div>
        </section>

        {/* LOCATION FINDER */}
        {totalIndexedForService > 0 && (
          <section className="bg-paper">
            <div className="editorial-container-wide py-10 md:py-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
                <div>
                  <h2 className="section-heading">
                    Find <span className="italic-voice">{service.title.toLowerCase()}</span> installers
                  </h2>
                  <p className="section-subheading">
                    Surrey coverage in {totalIndexedForService} indexed towns for this specification.
                  </p>
                </div>
                <button
                  onClick={() => setShowLocations(!showLocations)}
                  className="flex items-center gap-2 text-teal-brand font-medium text-[13px] hover:text-teal-ink transition-colors self-start md:self-auto whitespace-nowrap"
                >
                  {showLocations ? 'Hide locations' : `Show all ${totalIndexedForService} locations`}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showLocations ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                </button>
              </div>

              <div className="mb-6 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-muted w-4 h-4" strokeWidth={1.5} />
                  <input
                    type="text"
                    placeholder="Search your Surrey town..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (!showLocations) setShowLocations(true);
                    }}
                    className="w-full pl-11 pr-4 py-3 border-2 border-teal-line bg-white text-teal-ink placeholder-teal-muted text-[14px] focus:outline-none focus:border-teal-brand transition-colors"
                  />
                </div>
              </div>

              <div
                className={`transition-all duration-500 overflow-hidden ${
                  showLocations ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'
                }`}
                aria-hidden={!showLocations}
              >
                <div className="space-y-8 pb-2">
                  {Object.entries(filteredLocations).map(([region, cities]) => (
                    <div key={region}>
                      <h3 className="font-display text-[1.2rem] leading-tight tracking-tight text-teal-ink mb-3 pb-1 border-b-2 border-teal-ink" style={{ fontWeight: 500 }}>
                        {region}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 lg:gap-x-10 gap-y-0">
                        {cities.map((city) => (
                          <LocationPill
                            key={city}
                            name={city}
                            href={`/services/${service.slug}/${toSlug(city)}/`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  {Object.keys(filteredLocations).length === 0 && (
                    <p className="font-prose text-[16px] text-teal-ink/70 italic">
                      No Surrey towns matching "{searchQuery}" with indexed {service.title.toLowerCase()} coverage. Try a nearby area.
                    </p>
                  )}
                </div>
              </div>

              {!showLocations && (
                <p className="font-prose text-[14px] text-teal-ink/70">
                  Search above, or <button onClick={() => setShowLocations(true)} className="text-teal-brand underline underline-offset-2 hover:text-teal-ink">browse all locations</button> for {service.title.toLowerCase()}.
                </p>
              )}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="bg-white border-y border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <SectionHeader
              title="Common questions"
              subtitle={`About ${service.title.toLowerCase()} in Surrey.`}
            />
            <FAQAccordion
              faqs={[...(service.faqs || []), ...FAQS_SERVICES].map(
                (f: { question: string; answer: string }) => ({ q: f.question, a: f.answer })
              )}
              defaultOpenIndex={-1}
            />
          </div>
        </section>

        {/* RELATED SERVICES */}
        <section className="bg-paper">
          <div className="editorial-container-wide py-10 md:py-16">
            <SectionHeader title="Other gate services" subtitle="Explore the rest of the network." />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-0">
              {relatedServices.map((s) => (
                <LocationPill key={s.id} name={s.title} href={`/services/${s.slug}/`} />
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-white border-t border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <CTACard
              title={`Get ${service.title.toLowerCase()} quotes.`}
              italicAccent="Across Surrey."
              body={`Submit your postcode and we match you with up to three vetted ${service.title.toLowerCase()} specialists. Free surveys, detailed written quotes, no obligation.`}
              ctaLabel="Get Free Quotes"
              onCtaClick={() => setIsModalOpen(true)}
            />
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
