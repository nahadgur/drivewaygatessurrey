// app/terms/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { siteConfig } from '@/data/site';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Terms of use for Driveway Gates Surrey, an independent matching service connecting Surrey homeowners with third-party gate installers.',
  alternates: { canonical: `${siteConfig.url}/terms/` },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = '21 April 2026';

function LegalH2({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[1.35rem] leading-tight tracking-tight text-teal-ink mt-10 mb-3 flex items-baseline gap-3" style={{ fontWeight: 500 }}>
      <span className="text-[0.85rem] text-teal-brand font-medium tracking-wider" style={{ fontWeight: 500 }}>{n}</span>
      <span>{children}</span>
    </h2>
  );
}

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="flex-grow">

        <section className="editorial-container-wide pt-6 pb-10 md:pt-10 md:pb-14">
          <Breadcrumbs items={[{ label: 'Terms of Use' }]} />
          <h1 className="font-display text-[2.2rem] md:text-[3rem] lg:text-[3.5rem] leading-[0.98] tracking-tight text-teal-ink mb-3 mt-4" style={{ fontWeight: 400 }}>
            Terms of <span className="italic-voice">use.</span>
          </h1>
          <p className="font-mono text-[12px] tracking-wider text-teal-muted uppercase">
            Last updated — {LAST_UPDATED}
          </p>
        </section>

        <section className="bg-white border-t border-teal-ink">
          <div className="editorial-container py-10 md:py-14">
            <div className="prose-editorial max-w-prose-editorial">

              <LegalH2 n="1">About this site</LegalH2>
              <p>
                drivewaygatessurrey.uk (the &quot;site&quot;) is operated under the trading name Driveway
                Gates Surrey. The site provides a free matching service that connects homeowners
                in Surrey with independent, third-party gate installers. Driveway Gates Surrey is
                not itself a gate installation company. We do not carry out any installation,
                repair, or maintenance work, and we do not employ gate installers.
              </p>

              <LegalH2 n="2">The matching service</LegalH2>
              <p>
                When you submit an enquiry through the lead form, we identify up to three gate
                installers in our network whose experience and service area match your project,
                and we pass your contact details to them. Each installer then contacts you
                directly to arrange a site survey and provide a written quote.
              </p>
              <p>
                We are not a party to any contract you enter into with an installer. All
                commercial terms, including price, timeline, specification, payment, and
                warranties, are agreed directly between you and the installer.
              </p>

              <LegalH2 n="3">Installer selection and liability</LegalH2>
              <p>
                We exercise reasonable care in selecting the gate installers we refer enquiries
                to. Our vetting covers verified residential gate project history, current public
                liability insurance, and the provision of written warranties on both the gate
                and the automation. We monitor customer feedback and remove installers from the
                network where quality falls below our standards.
              </p>
              <p>
                However, we are not responsible for the work carried out by an installer, their
                pricing, their timeliness, the quality of any materials or equipment supplied,
                or any dispute that arises between you and them. Our role ends at the
                introduction.
              </p>
              <p>
                Installers in our network are independent businesses. Nothing on this site
                should be read as suggesting that they are agents, employees, partners, or
                subsidiaries of Driveway Gates Surrey.
              </p>

              <LegalH2 n="4">Use of the site</LegalH2>
              <p>You agree that you will:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Submit accurate and complete information through the lead form</li>
                <li>Not use the site in a way that interferes with its operation or security</li>
                <li>Not attempt to extract, scrape, or otherwise harvest content from the site except through normal browsing</li>
                <li>Not submit enquiries on behalf of other people without their knowledge and consent</li>
              </ul>

              <LegalH2 n="5">Content on the site</LegalH2>
              <p>
                Guidance on the site, including blog articles, pricing ranges, and service
                pages, is provided for general information only. Prices and typical timelines
                are based on completed installations across Surrey at the time of writing and
                are not a quote. Only a site survey by an installer can produce an accurate
                quote for your specific project.
              </p>
              <p>
                Planning permission guidance on the site is general and not a substitute for
                advice from your local planning authority or a planning consultant. You are
                responsible for confirming the planning position that applies to your property.
              </p>

              <LegalH2 n="6">Intellectual property</LegalH2>
              <p>
                All content on the site, including text, images, logos, and layout, is the
                property of Driveway Gates Surrey or its licensors. You may view, print, and
                share content for personal and non-commercial use. You may not reproduce,
                republish, or use the content for commercial purposes without written
                permission.
              </p>

              <LegalH2 n="7">External links</LegalH2>
              <p>
                The site may link to external websites. We do not control those websites and
                are not responsible for their content, privacy practices, or availability.
              </p>

              <LegalH2 n="8">Limitation of liability</LegalH2>
              <p>
                To the maximum extent permitted by law, Driveway Gates Surrey is not liable for
                any indirect or consequential loss arising from your use of the site or from
                your engagement with any installer we introduce. Nothing in these terms
                excludes or limits liability that cannot be excluded or limited under UK law,
                including liability for death or personal injury caused by negligence.
              </p>

              <LegalH2 n="9">Changes to these terms</LegalH2>
              <p>
                We may update these terms from time to time. The &quot;last updated&quot; date at the top
                of this page reflects the most recent change. Continued use of the site after
                an update constitutes acceptance of the updated terms.
              </p>

              <LegalH2 n="10">Governing law</LegalH2>
              <p>
                These terms, and any dispute arising from them, are governed by the laws of
                England and Wales. You and Driveway Gates Surrey agree to the exclusive
                jurisdiction of the courts of England and Wales.
              </p>

              <LegalH2 n="11">Contact</LegalH2>
              <p>
                Questions about these terms:
                <br />
                <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
              </p>

              <div className="mt-12 pt-6 border-t border-teal-line flex gap-6 text-[13px]">
                <Link href="/privacy/" className="text-teal-brand hover:text-teal-ink transition-colors">Privacy Policy</Link>
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
