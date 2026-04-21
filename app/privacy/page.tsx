// app/privacy/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Driveway Gates Surrey collects, uses, and shares your personal data under UK GDPR.',
  alternates: { canonical: `${siteConfig.url}/privacy/` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = '21 April 2026';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-white">
        <div className="container-width py-10 md:py-14 max-w-3xl">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mt-6 mb-3">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-10">Last updated: {LAST_UPDATED}</p>

          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed space-y-6">

            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mt-8 mb-3">1. Who we are</h2>
              <p>
                This website, Driveway Gates Surrey (drivewaygatessurrey.uk), operates under the
                trading name &apos;Driveway Gates Surrey&apos;. We do not yet operate as a separately
                incorporated legal entity. Driveway Gates Surrey is run as a sole trader. If you
                need to identify a named individual for any data protection request, you can
                email us at <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-600 hover:underline">{siteConfig.contactEmail}</a> and we will respond with a named contact.
              </p>
              <p>
                Driveway Gates Surrey is an independent matching service. We are not a gate
                installation company. We connect homeowners in Surrey with independent,
                third-party gate installers who carry out any work you agree with them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mt-8 mb-3">2. What data we collect</h2>
              <p>When you submit an enquiry through our lead form, we collect:</p>
              <ul className="list-disc pl-6 space-y-1">
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
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mt-8 mb-3">3. How we use your data</h2>
              <p>We use the personal data you submit through the lead form to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Identify suitable gate installers in our network for your specific project</li>
                <li>Share your details with up to three of those installers so they can contact you directly</li>
                <li>Send you occasional follow-up communication about your enquiry</li>
              </ul>
              <p>
                The lawful basis for this processing is your consent, given when you tick the
                consent box on the lead form. You can withdraw consent at any time by emailing us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mt-8 mb-3">4. Who we share your data with</h2>
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
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mt-8 mb-3">5. How long we keep your data</h2>
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
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mt-8 mb-3">6. Your rights under UK GDPR</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of any inaccurate data</li>
                <li>Request deletion of your data (right to be forgotten)</li>
                <li>Object to or restrict processing</li>
                <li>Withdraw consent at any time</li>
                <li>Lodge a complaint with the Information Commissioner&apos;s Office (ico.org.uk)</li>
              </ul>
              <p>
                To exercise any of these rights, email <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-600 hover:underline">{siteConfig.contactEmail}</a>. We will respond within one month.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mt-8 mb-3">7. Cookies</h2>
              <p>
                This site uses essential cookies to make the site function, and Google Analytics
                cookies to measure traffic. Analytics cookies are set only after a reasonable
                opportunity has passed for the page to load. You can block cookies through your
                browser settings, though doing so may affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mt-8 mb-3">8. Changes to this policy</h2>
              <p>
                We may update this policy from time to time. The &quot;last updated&quot; date at the top
                of this page reflects the most recent change. We recommend checking back
                periodically if you have a live enquiry with us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-bold text-gray-900 mt-8 mb-3">9. Contact</h2>
              <p>
                Questions about this privacy policy or about how we handle your data:
                <br />
                <a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-600 hover:underline">{siteConfig.contactEmail}</a>
              </p>
            </section>

            <div className="mt-10 pt-6 border-t border-gray-200 text-sm">
              <Link href="/terms/" className="text-brand-600 hover:underline mr-6">Terms of Use</Link>
              <Link href="/contact/" className="text-brand-600 hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
