// data/blog.ts — Driveway Gates Surrey

export interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  publishDate: string;
  featuredImage: string;
  excerpt: string;
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'image'; src: string; alt: string }
  | { type: 'list'; items: string[] }
  | { type: 'cta' }
  | { type: 'internal-link'; href: string; text: string; context: string }
  | { type: 'external-link'; href: string; text: string; source: string; rel: 'noopener noreferrer' }
  | { type: 'related-articles'; articles: { slug: string; title: string; category: string }[] };

const article1: BlogArticle = {
  slug: 'how-much-do-driveway-gates-cost-surrey-2026',
  title: 'How Much Do Driveway Gates Cost in Surrey? A Full 2026 Pricing Guide',
  metaTitle: 'Driveway Gate Costs Surrey 2026 | Full Pricing Guide',
  metaDescription: 'What do driveway gates cost in Surrey in 2026? Real prices for electric sliding gates, swing gates, hardwood gates, metal gates, automation, and repairs across the county.',
  category: 'Pricing',
  publishDate: '2026-01-15',
  featuredImage: '/images/gates/gate-wrought-iron-open-manor-brick-pillars.png',
  excerpt: 'Surrey driveway gate prices sit at the higher end nationally, reflecting the premium property market and the level of specification that Surrey homeowners typically require. Here is what you will actually pay in 2026.',
  content: [
    { type: 'p', text: 'Surrey is one of the most active counties in the UK for residential driveway gate installation, and prices reflect both the premium property market and the level of specification that buyers in this county typically require. The stockbroker belt towns of Weybridge, Cobham, and Esher consistently produce some of the highest-specification gate installations in the country. But across the county as a whole, the full price range from a standard aluminium sliding gate to a bespoke wrought iron estate entrance is as wide as anywhere.' },
    { type: 'p', text: 'The figures in this guide come from completed installations across Surrey in 2025 and early 2026. They reflect what installers in the county are actually quoting and completing, not manufacturer list prices or estimates based on national averages.' },
    { type: 'h2', text: 'Electric Sliding Gates: £5,000 to £13,000 Installed' },
    { type: 'p', text: 'Electric sliding gates start at around £5,000 for a standard aluminium single-leaf gate on a flat site. This covers gate supply, ground-track foundation, a quality motor from a branded manufacturer, two remotes, and safety commissioning to BS EN 12453. Bespoke fabricated steel or wrought iron systems with video intercom, keypad, and smartphone control push toward £11,000 to £13,000.' },
    { type: 'p', text: 'Cantilever systems for sloped driveways add £800 to £2,500 over standard tracked installations. Surrey has a significant number of properties on sloped plots, particularly in the North Downs and Surrey Hills areas, making cantilever systems more commonly specified here than in flatter counties.' },
    { type: 'h2', text: 'Electric Swing Gates: £4,000 to £12,000 Installed' },
    { type: 'p', text: 'Electric swing gates start at around £4,000 for a standard installation on a flat driveway. Underground motors, which are strongly preferred in the premium Surrey market for the clean appearance they give, add £400 to £800 over equivalent ram-arm systems. Premium installations with wrought iron, full access management, and pier work reach £12,000 and above.' },
    { type: 'h2', text: 'Wooden Driveway Gates: £3,000 to £9,000 Installed' },
    { type: 'p', text: 'Hardwood gates suit the character of many Surrey properties, particularly in the Surrey Hills AONB, the Green Belt villages, and the historic towns of Guildford, Godalming, and Farnham. Iroko and oak are the standard specifications. Accoya, with its 50-year manufacturer guarantee, is the preferred specification on exposed rural properties and in conservation areas where low maintenance is a priority alongside authenticity.' },
    { type: 'h2', text: 'Metal Driveway Gates: £3,200 to £10,000 Installed' },
    { type: 'p', text: 'Fabricated mild steel with hot-dip galvanising and powder coating starts from £3,200 including automation. Hot-dip galvanising before powder coat is the non-negotiable specification for any outdoor steel installation in Surrey. Wrought iron gates, hand-forged for premium properties, start from around £7,000 and are widely specified in the Weybridge, Cobham, and Esher market.' },
    { type: 'h2', text: 'Getting an Accurate Quote for Your Surrey Property' },
    { type: 'p', text: 'A site survey is the only route to a reliable price. Gate installation costs are site-specific in ways that cannot be assessed remotely. Compare a minimum of three quotes from specialist installers, with each quote broken down by gate, groundwork, motor, and access control separately.' },
    { type: 'cta' },
    { type: 'related-articles', articles: [
      { slug: 'electric-sliding-vs-swing-gates-surrey', title: 'Electric Sliding vs Swing Gates: Which is Right for Your Surrey Driveway?', category: 'Buying Guide' },
      { slug: 'planning-permission-driveway-gates-surrey', title: 'Do You Need Planning Permission for Driveway Gates in Surrey?', category: 'Planning' },
      { slug: 'choosing-gate-installer-surrey', title: 'How to Choose a Driveway Gate Installer in Surrey', category: 'Buying Guide' },
    ]},
  ],
};

const article2: BlogArticle = {
  slug: 'electric-sliding-vs-swing-gates-surrey',
  title: 'Electric Sliding vs Swing Gates: Which is Right for Your Surrey Driveway?',
  metaTitle: 'Sliding vs Swing Gates Surrey | Which Should You Choose in 2026?',
  metaDescription: 'Choosing between electric sliding and swing gates for your Surrey property? We compare both on space requirements, cost, and suitability for different Surrey driveway types.',
  category: 'Buying Guide',
  publishDate: '2026-01-20',
  featuredImage: '/images/gates/gate-aluminium-sliding-horizontal-modern-new-build.png',
  excerpt: 'The choice between sliding and swing usually comes down to your driveway geometry. Here is how to work out which type is right for your Surrey property.',
  content: [
    { type: 'p', text: 'The sliding versus swing question is the first decision most Surrey homeowners face when planning a driveway gate installation. Both types are proven, widely installed across the county, and available in every material and design. The right answer for your property is almost always determined by the physical constraints of your driveway rather than aesthetic preference.' },
    { type: 'h2', text: 'Swing Gate Geometry' },
    { type: 'p', text: 'A swing gate needs clear arc space to open. The leaf sweeps through approximately 90 degrees inward onto the property. If your driveway is short, slopes toward the property, or has parked vehicles close to the gate line, a swing gate may be impractical. Surrey has a notable proportion of properties with sloped driveways, particularly in the North Downs, the Surrey Hills, and on the hillside streets of Guildford, Reigate, and Dorking.' },
    { type: 'h2', text: 'Sliding Gate Geometry' },
    { type: 'p', text: 'A sliding gate needs no swing clearance. It travels horizontally along the boundary, requiring run-back space at least as wide as the gate itself plus approximately 500mm for the motor. Cantilever systems, suspended from an overhead rail rather than a ground track, remove the ground-level constraint and are the correct specification for many Surrey sites where the gradient makes a standard ground track impractical.' },
    { type: 'h2', text: 'Cost Comparison in Surrey' },
    { type: 'p', text: 'On a standard flat Surrey driveway, a swing gate installation is typically £500 to £2,000 less than an equivalent sliding system. This gap narrows significantly on sloped sites where cantilever engineering is required, and on wide openings where the structural efficiency of a sliding gate becomes meaningful.' },
    { type: 'h2', text: 'Which is Right for Your Surrey Property?' },
    { type: 'list', items: [
      'Short driveway or insufficient swing clearance: sliding gate',
      'Sloped driveway in Surrey Hills or North Downs: sliding with cantilever, or specialist swing hinge engineering',
      'Opening wider than 5 metres: sliding for structural efficiency',
      'Standard flat driveway 3 to 4 metres wide: swing is usually more cost-effective',
      'Period property, rural Surrey, conservation village: swing in hardwood or wrought iron usually right',
      'Modern new-build in commuter belt: either works; sliding popular for clean contemporary look',
    ]},
    { type: 'cta' },
    { type: 'related-articles', articles: [
      { slug: 'how-much-do-driveway-gates-cost-surrey-2026', title: 'How Much Do Driveway Gates Cost in Surrey? A Full 2026 Pricing Guide', category: 'Pricing' },
      { slug: 'best-gate-material-surrey', title: 'The Best Gate Material for Surrey: Wood, Steel, or Aluminium?', category: 'Materials' },
    ]},
  ],
};

const article3: BlogArticle = {
  slug: 'planning-permission-driveway-gates-surrey',
  title: 'Do You Need Planning Permission for Driveway Gates in Surrey?',
  metaTitle: 'Planning Permission Driveway Gates Surrey | 2026 Rules Explained',
  metaDescription: 'Surrey has more planning designations than most English counties. Find out when you need consent for driveway gates and what the rules are across Surrey districts.',
  category: 'Planning',
  publishDate: '2026-01-25',
  featuredImage: '/images/gates/gate-wrought-iron-open-stone-pillars-lanterns-estate.png',
  excerpt: 'Surrey has a high concentration of Green Belt land, AONB, conservation areas, and listed buildings. Here is what the planning rules mean for your gate project.',
  content: [
    { type: 'p', text: 'Surrey has more planning designations per square kilometre than almost any other English county. Green Belt land covers the majority of the county. The Surrey Hills Area of Outstanding Natural Beauty covers a substantial swathe of the rural south and west. Conservation areas exist in every Surrey town and in dozens of villages. Listed buildings are widespread across the historic market towns and rural parishes. Understanding which designations affect your property, and what they mean for a gate installation, is essential before you commission any work.' },
    { type: 'h2', text: 'Permitted Development: The Baseline Rule' },
    { type: 'p', text: 'Under Schedule 2, Part 2 of the GPDO, gates up to 2 metres tall that open inward onto your property are generally permitted development and do not require a planning application. The limit drops to 1 metre for gates adjacent to a classified road. This baseline applies across most residential properties in Surrey provided none of the exceptions below apply.' },
    { type: 'h2', text: 'The Surrey Hills AONB' },
    { type: 'p', text: 'The Surrey Hills AONB covers a broad band of rural Surrey running from the Hampshire border in the west to the Kent border in the east, including the areas around Haslemere, Godalming, Dorking, Reigate, and Oxted. Within the AONB, permitted development rights are not automatically removed for standard residential gates, but planning authorities in the AONB are expected to apply policies that protect the natural beauty of the area. Gate installations that would have a significant visual impact, use materials or designs out of character with the setting, or require substantial groundworks may attract scrutiny even where a formal application is not technically required.' },
    { type: 'h2', text: 'Green Belt' },
    { type: 'p', text: 'Green Belt designation does not in itself remove permitted development rights for standard residential gates. However, properties in the Green Belt may be subject to Article 4 Directions that remove some permitted development rights, and any works that constitute inappropriate development in the Green Belt require planning permission. Most standard residential gate installations in Green Belt areas are permitted development, but it is worth confirming the specific position with your local authority for any project involving significant new structures.' },
    { type: 'h2', text: 'Conservation Areas in Surrey' },
    { type: 'p', text: 'Conservation areas exist across all Surrey districts. The historic cores of Guildford, Farnham, Godalming, Reigate, and Haslemere have designated areas. Dozens of Surrey villages have conservation area status. Within a conservation area, gate proposals that would affect the character or appearance of the area may require prior approval or a full application. Materials, design, and the relationship of the gate to the street scene all factor into this assessment.' },
    { type: 'h2', text: 'Listed Buildings' },
    { type: 'p', text: 'Listed building consent is required for any works affecting the character of a listed building or its curtilage, including new gates and gate posts. Surrey has a high concentration of listed buildings, particularly in the rural parishes and market towns. If your property is listed, contact your local authority planning department before commissioning any gate work.' },
    { type: 'h2', text: 'Surrey District Councils to Pay Attention To' },
    { type: 'p', text: 'Mole Valley District Council covers the Surrey Hills AONB heartland including Dorking, Leatherhead, and the surrounding villages. The council applies AONB planning policy carefully and homeowners in the Dorking, Leatherhead, and Fetcham areas should seek pre-application advice for any gate project involving new structures or materials that are not in keeping with the natural landscape.' },
    { type: 'p', text: 'Waverley Borough Council covers the west of Surrey including Farnham, Godalming, Haslemere, and Cranleigh. This district has a large AONB coverage and numerous listed buildings and conservation areas. Pre-application enquiries are advisable for any gate project in the AONB or conservation area within this district.' },
    { type: 'p', text: 'Guildford Borough Council covers the county town and its surrounding area. The historic core of Guildford has extensive conservation area coverage and the rural parishes to the south and west of the town are within the AONB. The council has an active planning enforcement function.' },
    { type: 'cta' },
    { type: 'related-articles', articles: [
      { slug: 'choosing-gate-installer-surrey', title: 'How to Choose a Driveway Gate Installer in Surrey', category: 'Buying Guide' },
      { slug: 'how-much-do-driveway-gates-cost-surrey-2026', title: 'How Much Do Driveway Gates Cost in Surrey? A Full 2026 Pricing Guide', category: 'Pricing' },
    ]},
  ],
};

const article4: BlogArticle = {
  slug: 'best-gate-material-surrey',
  title: 'The Best Gate Material for Surrey: Wood, Steel, or Aluminium?',
  metaTitle: 'Best Gate Material Surrey | Wood vs Steel vs Aluminium 2026',
  metaDescription: 'Which gate material performs best across Surrey? We compare hardwood, mild steel, aluminium, and wrought iron for Surrey conditions, from the Hills to the commuter belt.',
  category: 'Materials',
  publishDate: '2026-01-28',
  featuredImage: '/images/gates/gate-wooden-painted-cream-roses-surrey-hills.png',
  excerpt: 'Material choice in Surrey depends on your location, property type, and planning context. Here is an honest comparison of how each material performs across the county.',
  content: [
    { type: 'p', text: 'Gate material choice in Surrey is shaped by three factors that do not apply equally across all parts of the county: the planning context, particularly in the AONB and conservation areas where materials that are out of character with the setting will not be supported; the property type, which ranges from modern commuter belt developments to historic farmhouses and Victorian villas; and the ground conditions, particularly the chalk and greensand soils of the North Downs and Surrey Hills which create specific foundation considerations.' },
    { type: 'h2', text: 'Hardwood Gates in Surrey' },
    { type: 'p', text: 'Hardwood gates are the natural specification for rural Surrey properties, barn conversions, period houses in conservation areas, and homes in the AONB where a natural material is both aesthetically appropriate and more likely to be viewed favourably in planning terms. Iroko performs reliably in Surrey conditions and is the standard specification for most residential projects. European oak is preferred on properties where the grain character and weathering behaviour of the material are part of the design intent. Accoya, with its 50-year manufacturer durability guarantee, is the specification for exposed rural positions and for homeowners who want to minimise maintenance without compromising on the natural material character.' },
    { type: 'h2', text: 'Mild Steel in Surrey' },
    { type: 'p', text: 'Mild steel is the standard fabrication material for bespoke metal gates across the Surrey residential market and is capable of a very long service life when correctly treated. Hot-dip galvanising before powder coating is the specification that quality installers apply as standard. The wide RAL colour range available in powder coat gives complete design flexibility, and Surrey buyers frequently specify anthracite grey, black, and heritage green to complement existing ironwork or boundary treatments.' },
    { type: 'h2', text: 'Aluminium in Surrey' },
    { type: 'p', text: 'Aluminium is the low-maintenance specification for Surrey properties where rust resistance without reliance on coating integrity is a priority. It is lighter than steel, which reduces motor and hinge loads, and the powder coat finish is the same quality as steel. For modern new-build properties in the North Surrey commuter belt, aluminium sliding gates in powder-coated anthracite or black are among the most commonly installed specifications.' },
    { type: 'h2', text: 'Wrought Iron in Surrey' },
    { type: 'p', text: 'Surrey is one of the strongest markets for wrought iron residential gates in the country. The concentration of high-value properties in the Weybridge, Cobham, Esher, and Reigate areas creates consistent demand for hand-forged ironwork, and the premium character of the material suits the architectural scale of many Surrey properties. Wrought iron requires the same galvanising and coating specification as mild steel and is chosen for its material character rather than for functional superiority.' },
    { type: 'cta' },
    { type: 'related-articles', articles: [
      { slug: 'how-much-do-driveway-gates-cost-surrey-2026', title: 'How Much Do Driveway Gates Cost in Surrey? A Full 2026 Pricing Guide', category: 'Pricing' },
      { slug: 'driveway-gates-surrey-hills-aonb', title: 'Driveway Gates in the Surrey Hills AONB: Planning and Material Guide', category: 'Planning' },
    ]},
  ],
};

const article5: BlogArticle = {
  slug: 'electric-gate-automation-retrofit-surrey',
  title: 'Adding Electric Automation to Existing Gates in Surrey: A Complete Guide',
  metaTitle: 'Gate Automation Retrofit Surrey | Adding Motors to Existing Gates',
  metaDescription: 'Already have driveway gates in Surrey and want to add electric operation? Everything you need to know about retrofitting gate automation across Surrey.',
  category: 'Automation',
  publishDate: '2026-02-01',
  featuredImage: '/images/gates/gate-video-intercom-panel-brick-wall-closeup.png',
  excerpt: 'Retrofitting automation to existing gates is one of the most popular gate upgrades across Surrey. Here is everything you need to know before booking an assessment.',
  content: [
    { type: 'p', text: 'Gate automation retrofits are among the most frequently booked gate jobs across Surrey, and the appeal is clear: you keep the gates you have, avoid the cost of new gate fabrication, and add the convenience of electric operation in a day or two. The result is immediate in daily life and, in a county where high-value vehicles are regularly parked on open driveways, has a meaningful security benefit.' },
    { type: 'h2', text: 'Is Your Existing Gate Suitable?' },
    { type: 'p', text: 'The assessment visit is the starting point and a non-negotiable one. The engineer checks gate weight and dimensions, hinge condition and alignment, post condition and foundation adequacy, power supply proximity, and available motor mounting space. Motor specification depends directly on gate weight, and an under-specified motor will fail prematurely regardless of the brand. Hinge condition determines whether the gate is ready for automation or needs remedial work first.' },
    { type: 'h2', text: 'Motor Options for Surrey Swing Gate Retrofits' },
    { type: 'p', text: 'Underground motors are more commonly specified in the premium Surrey market than in most other parts of the country. The preference for a clean gate face with no visible motor hardware is consistent across the Weybridge, Cobham, and Esher market, and underground systems from FAAC and BFT are the standard specification on retrofits in these areas. Ram-arm motors are the practical choice where budget is the primary consideration or where the retrofit site does not suit excavation.' },
    { type: 'h2', text: 'Access Control Options' },
    { type: 'p', text: 'Video intercom with smartphone access, proximity readers, keypads, and smart home integration are all available as additions to any retrofit package. Surrey homeowners increasingly specify the full access management suite rather than basic remotes, reflecting both the security priorities in a high-vehicle-theft area and the expectation of smart home integration that comes with the premium property market.' },
    { type: 'h2', text: 'Safety and Compliance' },
    { type: 'p', text: 'All automated gate installations must comply with BS EN 12453 regardless of whether they are new installations or retrofits. Safety edges, photocell coverage, auto-reverse functionality, and force limiting are all mandatory. Ask your installer for a written declaration of conformity at handover.' },
    { type: 'cta' },
    { type: 'related-articles', articles: [
      { slug: 'electric-gate-maintenance-surrey', title: 'Electric Gate Maintenance in Surrey: What Your Annual Service Should Cover', category: 'Maintenance' },
      { slug: 'how-much-do-driveway-gates-cost-surrey-2026', title: 'How Much Do Driveway Gates Cost in Surrey? A Full 2026 Pricing Guide', category: 'Pricing' },
    ]},
  ],
};

const article6: BlogArticle = {
  slug: 'choosing-gate-installer-surrey',
  title: 'How to Choose a Driveway Gate Installer in Surrey',
  metaTitle: 'How to Choose a Gate Installer Surrey | What to Look For in 2026',
  metaDescription: 'Choosing the right gate installer in Surrey is the most important decision in any gate project. What to check, what to ask, and what warning signs to avoid.',
  category: 'Buying Guide',
  publishDate: '2026-02-05',
  featuredImage: '/images/gates/gate-opening-driver-pov-tree-lined-driveway.png',
  excerpt: 'The installer determines the quality of the outcome more than any other single factor. Here is how to evaluate gate installers in Surrey before committing.',
  content: [
    { type: 'p', text: 'The most important decision in any gate project is who installs it. Surrey has a good supply of specialist gate installation firms, but it also has a larger number of general builders, landscapers, and groundwork contractors who take gate work when it comes their way. These are not interchangeable. A specialist firm that installs gates every working day has a depth of experience that a generalist doing its fifth gate job cannot match, and the difference shows in the outcome.' },
    { type: 'h2', text: 'Specialisation is the Primary Filter' },
    { type: 'p', text: 'Ask directly how many residential gate installations a firm completes in a year. Fewer than twenty suggests gate work is supplementary to another trade. Fifty or more indicates genuine specialisation. A specialist firm knows the Surrey Hills planning requirements, the chalk and greensand foundation conditions in the North Downs, the motor specifications appropriate for the heavy wrought iron gates common in the premium Surrey market, and the BS EN 12453 commissioning process in detail.' },
    { type: 'h2', text: 'Insurance, Safety Standards, and Warranties' },
    { type: 'p', text: 'Public liability insurance of at least £2 million is required before any site visit is booked. Ask for the current certificate. BS EN 12453 compliance must be documented at handover. Written warranties on gate structure and automation separately. Any firm that cannot confirm all three before being shortlisted should not be shortlisted.' },
    { type: 'h2', text: 'The Site Survey as a Quality Indicator' },
    { type: 'p', text: 'A reputable installer insists on a site survey before quoting. This is an engineering assessment, not a sales visit. The installer measures the opening, checks clearances, assesses ground and foundation conditions, reviews power supply routing, and discusses design options in the context of your specific property and any planning constraints. An installer who quotes without a site visit has not done this assessment and cannot provide a reliable price.' },
    { type: 'h2', text: 'What a Quality Quote Includes' },
    { type: 'p', text: 'Gate fabrication or supply, groundwork, motor and control board, safety sensor equipment, and access control all itemised separately. Motor brand and model specified. Surface treatment confirmed as hot-dip galvanising plus powder coat for any steel installation. Warranty terms for gate and automation stated separately in writing.' },
    { type: 'cta' },
    { type: 'related-articles', articles: [
      { slug: 'how-much-do-driveway-gates-cost-surrey-2026', title: 'How Much Do Driveway Gates Cost in Surrey? A Full 2026 Pricing Guide', category: 'Pricing' },
      { slug: 'electric-gate-maintenance-surrey', title: 'Electric Gate Maintenance in Surrey: What Your Annual Service Should Cover', category: 'Maintenance' },
    ]},
  ],
};

const article7: BlogArticle = {
  slug: 'electric-gate-maintenance-surrey',
  title: 'Electric Gate Maintenance in Surrey: What Your Annual Service Should Cover',
  metaTitle: 'Electric Gate Maintenance Surrey | Annual Service Guide 2026',
  metaDescription: 'What should an annual electric gate service in Surrey cover? A complete breakdown of every element of a proper service visit.',
  category: 'Maintenance',
  publishDate: '2026-02-10',
  featuredImage: '/images/gates/gate-wrought-iron-open-manor-brick-pillars.png',
  excerpt: 'Annual servicing is the most cost-effective thing you can do for an automated gate. Here is exactly what a proper service should cover in Surrey.',
  content: [
    { type: 'p', text: 'Most gate failures develop gradually. A motor that stops responding in December was showing signs in the months before: slower travel, a subtle change in sound, safety sensors that stopped and restarted unexpectedly. Annual servicing catches these signals early, when the cost of intervention is a fraction of what it becomes after a failure. In a county where automated gates are a daily-use security and convenience feature on a large number of high-value properties, the case for regular maintenance is straightforward.' },
    { type: 'h2', text: 'Motor and Gearbox' },
    { type: 'p', text: 'Full open and close cycles while the engineer listens for changes in tone, speed, or mechanical noise that indicate developing wear. Lubrication applied to gearbox and drive components per manufacturer specification for the specific brand.' },
    { type: 'h2', text: 'Drive Mechanism' },
    { type: 'p', text: 'For sliding gates: track cleaning, drive rack and pinion inspection for wear, roller condition check. For swing gates: motor arm linkage play, connection condition, pivot point lubrication.' },
    { type: 'h2', text: 'Hinge and Structural Inspection' },
    { type: 'p', text: 'Hinge vertical play, roller condition, fixing torque. Gate structure visual inspection for damage, weld cracks, and powder coat deterioration. Post position check for movement.' },
    { type: 'h2', text: 'Safety Sensor Calibration and Testing' },
    { type: 'p', text: 'Photocell beam test with pass object during gate travel. Safety edge contact test during closure. Force limit measurement against BS EN 12453 thresholds. Written safety test results provided at handover.' },
    { type: 'h2', text: 'Control Board, Battery, and Access Control' },
    { type: 'p', text: 'Control board moisture ingress check, terminal condition, fault code review. Battery load test under simulated power failure. Intercom audio and video quality, keypad and proximity reader function, remote handset battery replacement.' },
    { type: 'h2', text: 'Annual Service Cost in Surrey' },
    { type: 'p', text: 'Annual gate servicing in Surrey typically costs £130 to £220 for a standard residential automated system. Written service report covering all elements checked, adjustments made, safety test results, and any observations about components requiring future attention.' },
    { type: 'cta' },
    { type: 'related-articles', articles: [
      { slug: 'electric-gate-automation-retrofit-surrey', title: 'Adding Electric Automation to Existing Gates in Surrey', category: 'Automation' },
      { slug: 'choosing-gate-installer-surrey', title: 'How to Choose a Driveway Gate Installer in Surrey', category: 'Buying Guide' },
    ]},
  ],
};

const article8: BlogArticle = {
  slug: 'driveway-gates-surrey-hills-aonb',
  title: 'Driveway Gates in the Surrey Hills AONB: Planning and Material Guide',
  metaTitle: 'Driveway Gates Surrey Hills AONB | Planning and Materials Guide',
  metaDescription: 'Installing driveway gates in the Surrey Hills AONB? This guide covers the planning position, appropriate materials, and installer experience you need in this protected landscape.',
  category: 'Local Guide',
  publishDate: '2026-02-15',
  featuredImage: '/images/gates/gate-aerial-estate-closed-autumn-trees.png',
  excerpt: 'The Surrey Hills AONB covers a large part of the county and has specific planning considerations for gate installations. Here is what you need to know.',
  content: [
    { type: 'p', text: 'The Surrey Hills AONB is the largest protected landscape in the South East and covers a significant proportion of the county, running from the Hampshire border near Haslemere in the west through the Godalming and Dorking areas and into the hills around Reigate and Oxted in the east. Properties within the AONB range from isolated rural farmhouses and barn conversions to villages within the protected boundary, and gate installations in this landscape require a different approach from those in the Surrey commuter belt towns.' },
    { type: 'h2', text: 'Planning Considerations in the AONB' },
    { type: 'p', text: 'The AONB designation does not automatically remove permitted development rights for standard residential gates. A gate under 2 metres tall opening inward onto a residential property is generally still permitted development within the AONB as it is elsewhere. The key difference is that planning authorities with jurisdiction over AONB land, including Mole Valley, Waverley, Guildford, and Tandridge councils, are required to apply planning policies that conserve and enhance the natural beauty of the AONB. A gate proposal that would have a significant visual impact on the landscape character, use materials that are out of keeping with the rural setting, or require excavation or structures that alter the character of the boundary may attract scrutiny even where a formal application is not required.' },
    { type: 'p', text: 'Pre-application advice from the relevant council is the right approach for any gate project within the AONB where there is any doubt about the planning position. This is particularly relevant for larger or more prominent entrance treatments involving new piers, walls, or lighting that extends into the highway view.' },
    { type: 'h2', text: 'Materials That Work in the AONB' },
    { type: 'p', text: 'Hardwood gates are the strongest specification for AONB properties on both practical and planning grounds. Iroko and European oak are visually appropriate in a rural landscape setting in a way that powder-coated metal gates are not always. In conservation area villages within the AONB, traditional painted or lime-washed timber gates are the historical reference point that new installations are expected to respect.' },
    { type: 'p', text: 'Accoya is the practical specification for AONB properties where the maintenance interval is a concern. Rural properties in the Surrey Hills often have more exposed positions than suburban driveways, and the 50-year manufacturer durability guarantee reflects a material that genuinely performs in these conditions.' },
    { type: 'p', text: 'Wrought iron is appropriate for higher-specification AONB properties, particularly farmhouses and country houses where the scale and character of the entrance warrant the material. It is more commonly seen in the Haslemere, Godalming, and Dorking areas than in the more recently developed parts of the county.' },
    { type: 'h2', text: 'Choosing an Installer with AONB Experience' },
    { type: 'p', text: 'An installer who works regularly in the Surrey Hills AONB will understand the planning position for specific areas, know which local authority officers to approach for pre-application advice, and have experience specifying materials and designs that are sympathetic to the landscape. This local knowledge is difficult to replicate from a firm that works primarily in the commuter belt towns.' },
    { type: 'cta' },
    { type: 'related-articles', articles: [
      { slug: 'planning-permission-driveway-gates-surrey', title: 'Do You Need Planning Permission for Driveway Gates in Surrey?', category: 'Planning' },
      { slug: 'best-gate-material-surrey', title: 'The Best Gate Material for Surrey: Wood, Steel, or Aluminium?', category: 'Materials' },
    ]},
  ],
};

const article9: BlogArticle = {
  slug: 'driveway-gates-north-surrey-weybridge-cobham-esher',
  title: 'Driveway Gates in North Surrey: Weybridge, Cobham, and Esher Buyer Guide',
  metaTitle: 'Driveway Gates North Surrey | Weybridge Cobham Esher Guide 2026',
  metaDescription: 'Planning driveway gates in Weybridge, Cobham, Esher, or the surrounding North Surrey stockbroker belt? This guide covers specifications, costs, and what works in this area.',
  category: 'Local Guide',
  publishDate: '2026-02-20',
  featuredImage: '/images/gates/gate-aerial-wrought-iron-closed-topiary-gravel-circle.png',
  excerpt: 'The North Surrey stockbroker belt produces some of the highest-specification gate installations in the country. Here is what works in Weybridge, Cobham, and Esher.',
  content: [
    { type: 'p', text: 'The triangle of Weybridge, Cobham, and Esher, extending into the surrounding villages of Oxshott, Hersham, and Stoke DAbernon, is one of the most active residential gate markets in the country. The concentration of high-value properties on generous plots, the prominence of gate and boundary treatment as a standard element of property presentation in this area, and the expectation of premium-specification work creates consistent demand at the upper end of the market.' },
    { type: 'h2', text: 'What the North Surrey Market Specifies' },
    { type: 'p', text: 'Wrought iron gates with underground motors are the most commonly specified installation at the premium end of this market. Hand-forged ironwork, brick or stone piers with integrated lighting, HD video intercom with smartphone control, and proximity readers are the standard package on the higher-value projects. Gate budgets at this level routinely exceed £15,000 to £25,000 for the complete entrance treatment.' },
    { type: 'p', text: 'Mid-range installations covering fabricated steel gates with hot-dip galvanising, powder coat in anthracite or black, underground motors, and video intercom sit between £7,000 and £13,000. This is the most commonly installed specification across the Weybridge and Cobham market and represents a meaningful investment that is proportionate to the property values.' },
    { type: 'h2', text: 'Planning Considerations' },
    { type: 'p', text: 'Elmbridge Borough Council administers planning for Weybridge, Cobham, Esher, and the surrounding area. The district has a high proportion of Green Belt land and a number of conservation areas. Most standard residential gate installations in the area are permitted development, but the council planning portal and a quick pre-application enquiry are worth using for any project involving new structures of significant scale.' },
    { type: 'h2', text: 'Choosing an Installer in North Surrey' },
    { type: 'p', text: 'The North Surrey market rewards installers with specific experience in the area. An installer who has completed projects in Weybridge and Cobham knows the fabricators who produce work to the standard the market expects, the underground motor specifications appropriate for the gate weights typical in this area, and the attention to detail in finishing and commissioning that premium property buyers require. Ask for examples of completed local projects when comparing quotes.' },
    { type: 'cta' },
    { type: 'related-articles', articles: [
      { slug: 'how-much-do-driveway-gates-cost-surrey-2026', title: 'How Much Do Driveway Gates Cost in Surrey? A Full 2026 Pricing Guide', category: 'Pricing' },
      { slug: 'best-gate-material-surrey', title: 'The Best Gate Material for Surrey: Wood, Steel, or Aluminium?', category: 'Materials' },
    ]},
  ],
};

const article10: BlogArticle = {
  slug: 'driveway-gates-home-security-surrey',
  title: 'How Much Do Driveway Gates Actually Improve Home Security in Surrey?',
  metaTitle: 'Driveway Gates Home Security Surrey | Do They Actually Help?',
  metaDescription: 'Do driveway gates genuinely improve home security in Surrey? An honest assessment of what they prevent and how to maximise the security value of your gate installation.',
  category: 'Security',
  publishDate: '2026-02-25',
  featuredImage: '/images/gates/gate-aerial-estate-closed-autumn-trees.png',
  excerpt: 'Surrey has above-average vehicle theft rates and a premium property market that attracts targeted crime. Here is an honest assessment of what driveway gates actually prevent.',
  content: [
    { type: 'p', text: 'Surrey has consistently above-average rates of high-value vehicle theft, and the stockbroker belt towns of Weybridge, Cobham, Esher, and the surrounding area feature regularly in Surrey Police vehicle crime data. Relay theft targeting keyless entry vehicles parked on open driveways is the predominant method, and a driveway gate is one of the most direct physical deterrents available against this specific crime type.' },
    { type: 'h2', text: 'The Vehicle Security Case' },
    { type: 'p', text: 'A vehicle behind a closed automated gate requires additional time, noise, and risk to remove compared to one on an open driveway. Most opportunistic vehicle thieves, who rely on speed and low risk of detection, will move to an easier target rather than invest the additional effort. Insurance industry data consistently shows lower vehicle theft rates on gated properties, and several major insurers offer premium reductions for automated driveway gates.' },
    { type: 'h2', text: 'Access Control and Remote Visibility' },
    { type: 'p', text: 'Video intercom with smartphone access is the access control addition with the most direct security impact beyond the physical gate. The ability to see and speak to anyone at the gate entrance from anywhere, and to open or refuse entry remotely, addresses the risk of social engineering approaches as well as opportunistic access. Proximity readers with individual card management allow access to be granted and revoked per user without affecting the overall system.' },
    { type: 'h2', text: 'Realistic Limitations' },
    { type: 'p', text: 'A gate flanked by low hedges or walls that are easily climbed provides visual deterrence but not physical restriction. Boundary consistency matters and should be assessed as part of any gate specification. BS EN 12453 safety requirements mean automated gates are designed to stop rather than resist deliberate force, which is the correct design priority but creates a limit on the physical barrier function of the gate.' },
    { type: 'h2', text: 'Maximising Security Value' },
    { type: 'list', items: [
      'Specify video intercom connected to smartphone, not just a handset inside the house',
      'Include motion-activated security lighting on gate posts',
      'Use proximity cards rather than shared PIN codes for regular users',
      'Ensure boundary height is consistent on both sides of the gate',
      'Integrate gate operation events into home CCTV recording',
      'Service annually to prevent the gate being stuck open due to a fault',
    ]},
    { type: 'cta' },
    { type: 'related-articles', articles: [
      { slug: 'electric-gate-automation-retrofit-surrey', title: 'Adding Electric Automation to Existing Gates in Surrey', category: 'Automation' },
      { slug: 'driveway-gates-north-surrey-weybridge-cobham-esher', title: 'Driveway Gates in North Surrey: Weybridge, Cobham, and Esher Guide', category: 'Local Guide' },
    ]},
  ],
};

export const blogArticles: BlogArticle[] = [
  article1, article2, article3, article4, article5,
  article6, article7, article8, article9, article10,
];

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(a => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogArticles.map(a => a.slug);
}
