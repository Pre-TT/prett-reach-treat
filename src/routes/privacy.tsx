import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";


export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — PreTT" },
      {
        name: "description",
        content:
          "How PreTT collects, uses and protects personal data in accordance with the EU General Data Protection Regulation (GDPR).",
      },
      { property: "og:title", content: "Privacy Policy — PreTT" },
      {
        name: "description",
        content: "GDPR privacy notice for the PreTT website.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <Reveal>
        <p className="eyebrow">Legal</p>
        <h1 className="mt-4 text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: September 2026</p>
      </Reveal>

      <div className="mt-12 space-y-10 leading-relaxed text-muted-foreground">
        <div>
          <h2 className="text-xl font-semibold text-foreground">1. Data Controller</h2>
          <p className="mt-3">
            PreTT<br />
            CVR: DK43121618<br />
            Ole Maaløes Vej 3, 2200 Copenhagen, Denmark<br />
            Email: info@pre-tt.com
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">2. What Data We Collect</h2>
          <p className="mt-3">
            We only collect personal data that you voluntarily provide:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>
              <span className="text-foreground">Contact form:</span> name, email address, and message content
            </li>
            <li>
              <span className="text-foreground">Direct email:</span> any information you include when emailing us at
              info@pre-tt.com
            </li>
          </ul>
          <p className="mt-3">
            We do not use analytics tools, tracking pixels, or advertising cookies. We do not collect data about how you
            browse this website.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">3. Purpose and Legal Basis</h2>
          <p className="mt-3">
            We process your contact data solely to respond to your enquiry.
          </p>
          <p className="mt-3">
            The legal basis is our legitimate interest in communicating with partners, investors, and other interested
            parties (GDPR Article 6(1)(f)), or to take steps at your request prior to entering into a contract (GDPR
            Article 6(1)(b)).
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">4. Cookies</h2>
          <p className="mt-3">
            This website uses only strictly necessary storage to remember your cookie consent preference. No
            third-party tracking or advertising cookies are used.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">5. Service Providers</h2>
          <p className="mt-3">
            We use trusted third-party service providers to operate this website and deliver messages sent through our
            contact form. These providers act as data processors under written agreements and are bound by
            confidentiality obligations. Some providers are based outside the EU/EEA and operate under appropriate
            safeguards, including standard contractual clauses.
          </p>
          <p className="mt-3">
            We do not sell or share your personal data with any other third parties.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">6. Retention</h2>
          <p className="mt-3">
            We retain contact enquiries for up to 2 years from the date of receipt, or until the purpose for which they
            were collected has been fulfilled, whichever comes first.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">7. Your Rights</h2>
          <p className="mt-3">Under GDPR, you have the right to:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request erasure of your data</li>
            <li>Object to or restrict processing</li>
            <li>Data portability</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email us at{" "}
            <a href="mailto:info@pre-tt.com" className="text-foreground underline hover:text-accent">
              info@pre-tt.com
            </a>
            . We will respond within 30 days.
          </p>
          <p className="mt-3">
            You also have the right to lodge a complaint with the Danish Data Protection Agency:
            <br />
            Datatilsynet, Carl Jacobsens Vej 35, 2500 Valby, Denmark
            <br />
            <a
              href="https://www.datatilsynet.dk"
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground underline hover:text-accent"
            >
              www.datatilsynet.dk
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">8. Changes to This Policy</h2>
          <p className="mt-3">
            We may update this policy as our services evolve. The current version is always available on this page.
            Significant changes will be communicated via the website.
          </p>
        </div>
      </div>
    </section>
  );
}
