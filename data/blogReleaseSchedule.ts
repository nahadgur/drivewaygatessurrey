// Staged sitemap rollout ("drip feed") for the Surrey blog.
//
// A blog post is added to the sitemap only once its release date is on/before
// today. Each release date is a fixed constant used as that post's static
// lastModified — consistent with this site's deliberate "no dynamic dates"
// sitemap policy. The drip only changes which posts are members of the sitemap,
// not their freshness dates. The sitemap revalidates daily so each batch enters
// automatically on its date with no redeploy.
//
// Plan: Batch 1 (2026-06-23) = the AONB moat post + 4 cornerstones, then ~3/week.
// To retune cadence, edit the dates here — nothing else changes. The two AONB
// posts and the two security posts are split across different batches on purpose
// so near-duplicate-topic pages do not enter the index on the same day.

export const BLOG_SITEMAP_RELEASE: Record<string, string> = {
  // Batch 1 — 2026-06-23 (moat + cornerstones)
  'driveway-gates-surrey-hills-aonb': '2026-06-23',
  'planning-permission-driveway-gates-surrey': '2026-06-23',
  'how-much-do-driveway-gates-cost-surrey-2026': '2026-06-23',
  'best-gate-material-surrey': '2026-06-23',
  'electric-sliding-vs-swing-gates-surrey': '2026-06-23',

  // Batch 2 — 2026-06-30
  'electric-gate-maintenance-surrey': '2026-06-30',
  'choosing-gate-installer-surrey': '2026-06-30',
  'wooden-driveway-gates-surrey-iroko-oak-accoya': '2026-06-30',

  // Batch 3 — 2026-07-07
  'electric-gate-automation-retrofit-surrey': '2026-07-07',
  'driveway-gates-home-security-surrey': '2026-07-07',
  'steel-aluminium-driveway-gates-surrey-guide': '2026-07-07',

  // Batch 4 — 2026-07-14
  'gate-video-intercom-access-control-surrey': '2026-07-14',
  'wrought-iron-driveway-gates-surrey-guide': '2026-07-14',
  'driveway-gates-north-surrey-weybridge-cobham-esher': '2026-07-14',

  // Batch 5 — 2026-07-21
  'underground-motor-gate-installation-surrey': '2026-07-21',
  'electric-gate-security-vehicle-theft-surrey': '2026-07-21',
  'driveway-gates-surrey-hills-aonb-green-belt': '2026-07-21',

  // Batch 6 — 2026-07-28
  'gate-repair-common-faults-surrey': '2026-07-28',
  'gate-installer-commissioning-bs-en-12453-surrey': '2026-07-28',
  'aerial-view-driveway-gate-design-surrey-estates': '2026-07-28',
};

// Slugs whose release date is on or before `now` (ISO YYYY-MM-DD compares chronologically).
export function releasedBlogSlugs(now: Date = new Date()): string[] {
  const today = now.toISOString().slice(0, 10);
  return Object.entries(BLOG_SITEMAP_RELEASE)
    .filter(([, date]) => date <= today)
    .map(([slug]) => slug);
}
