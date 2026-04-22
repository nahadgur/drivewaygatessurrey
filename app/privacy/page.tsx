// app/privacy/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Driveway Gates Surrey collects, uses, and shares your personal data under UK GDPR.',
  alternates: { canonical: `${siteConfig.url}/privacy/` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = '21 April 2026';

// Helper to keep the H2 pattern consistent across sections.
function LegalH2({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[1.35rem] leading-tight tracking-tight text-teal-ink mt-10 mb-3 flex items-baseline gap-3" style={{ fontWeight: 500 }}>
      <span className="text-[0.85rem] text-teal-brand font-medium tracking-wider" style={{ fontWeight: 500 }}>{n}</span>
      <span>{children}</span>
    </h2>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="flex-grow">

        <section className="editorial-container-wide pt-6 pb-10 md:pt-10 md:pb-14">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          <h1 className="font-display text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] leading-[0.98] tracking-tight text-teal-ink mb-3 mt-4" style={{ fontWeight: 400 }}>
            Privacy <span className="italic-voice">policy.</span>
          </h1>
          <p className="font-mono text-[12px] tracking-wider text-teal-muted uppercase">
            Last updated — {LAST_UPDATED}
          </p>
        </section>

        <section className="bg-white border-t border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <div className="prose-editorial max-w-prose-editorial">

              <LegalH2 n="1">Who we are</LegalH2>
              <p>
                This website, Driveway Gates Surrey (drivewaygatessurrey.uk), operates under the
                trading name &apos;Driveway Gates Surrey&apos;. We do not yet operate as a separately
                incorporated legal entity. Driveway Gates Surrey is run as a sole trader. If you
                need to identify a named individual for any data protection request, you can
                email us at <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a> and we will respond with a named contact.
              </p>
              <p>
                Driveway Gates Surrey is an independent matching service. We are not a gate
                installation company. We connect homeowners in Surrey with independent,
                third-party gate installers who carry out any work you agree with them.
              </p>

              <LegalH2 n="2">What data we collect</LegalH2>
              <p>When you submit an enquiry through our lead form, we collect:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Your full name</li>
                <li>Your email address</li>
                <li>Your phone number</li>
                <li>Your Surrey town or postcode</li>
                <li>The type of gate service you are interested in</li>
                <li>The page URL where you submitted the enquiry</li>
              </ul>
              <p>
                We also collect standard analytics data through Google Analytics, including
                anonymised IP address, browser type, device type, pages visited, referral source,
                and session duration. Analytics data is used to understand site traffic in
                aggregate and is not used to identify individual users.
              </p>

              <LegalH2 n="3">How we use your data</LegalH2>
              <p>We use the personal data you submit through the lead form to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Identify suitable gate installers in our network for your specific project</li>
                <li>Share your details with up to three of those installers so they can contact you directly</li>
                <li>Send you occasional follow-up communication about your enquiry</li>
              </ul>
              <p>
                The lawful basis for this processing is your consent, given when you tick the
                consent box on the lead form. You can withdraw consent at any time by emailing us.
              </p>

              <LegalH2 n="4">Who we share your data with</LegalH2>
              <p>
                When you submit an enquiry and tick the consent box, your details are shared with
                a carefully selected UK gate installer in our network who we judge is the best
                match for your project. In most cases we share your details with up to three
                installers, each of whom operates as an independent business and becomes a
                separate data controller for your data once they receive it.
              </p>
              <p>
                We do not sell your data to third parties. We do not share it with anyone outside
                the matched installer or installers. We do not pass your data to marketing lists.
              </p>
              <p>
                We use Google Sheets (via a Google Apps Script webhook) to record incoming
                enquiries, and Google Analytics to measure site traffic. Google may process this
                data on servers outside the United Kingdom and European Economic Area, subject to
                standard contractual clauses.
              </p>

              <LegalH2 n="5">How long we keep your data</LegalH2>
              <p>
                Lead form submissions are retained for 24 months to allow us to respond to any
                follow-up enquiries and to reconcile referrals with installers in our network.
                After 24 months, the data is deleted from our records.
              </p>
              <p>
                You can request earlier deletion at any time by emailing us. Once deleted from
                our records, your data may still be held by any installer to whom it was passed,
                subject to their own retention policy.
              </p>

              <LegalH2 n="6">Your rights under UK GDPR</LegalH2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of any inaccurate data</li>
                <li>Request deletion of your data (right to be forgotten)</li>
                <li>Object to or restrict processing</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with the Information Commissioner&apos;s Office (ico.org.uk)</li>
              </ul>
              <p>
                To exercise any of these rights, email <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. We will respond within one month.
              </p>

              <LegalH2 n="7">Cookies</LegalH2>
              <p>
                This site uses essential cookies to make the site function, and Google Analytics
                cookies to measure traffic. Analytics cookies are set only after a reasonable
                opportunity has passed for the page to load. You can block cookies through your
                browser settings, though doing so may affect site functionality.
              </p>

              <LegalH2 n="8">Changes to this policy</LegalH2>
              <p>
                We may update this policy from time to time. The &quot;last updated&quot; date at the top
                of this page reflects the most recent change. We recommend checking back
                periodically if you have a live enquiry with us.
              </p>

              <LegalH2 n="9">Contact</LegalH2>
              <p>
                Questions about this privacy policy or about how we handle your data:
                <br />
                <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
              </p>

              <div className="mt-12 pt-6 border-t border-teal-line flex gap-6 text-[13px]">
                <Link href="/terms/" className="text-teal-brand hover:text-teal-ink transition-colors">Terms of Use</Link>
                <Link href="/contact/" className="text-teal-brand hover:text-teal-ink transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
