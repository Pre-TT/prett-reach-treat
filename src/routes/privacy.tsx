import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { COMPANY } from "@/lib/content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — PreTT ApS" },
      {
        name: "description",
        content:
          "How PreTT ApS collects, uses and protects personal data in accordance with the EU General Data Protection Regulation (GDPR).",
      },
      { property: "og:title", content: "Privacy Policy — PreTT ApS" },
      {
        property: "og:description",
        content: "GDPR privacy notice for the PreTT ApS website.",
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
        <p className="mt-3 text-sm text-muted-foreground">
          Placeholder notice — to be reviewed by legal counsel before publication.
        </p>
      </Reveal>

      <div className="mt-12 space-y-10 leading-relaxed text-muted-foreground">
        <div>
          <h2 className="text-xl font-semibold text-foreground">1. Data controller</h2>
          <p className="mt-3">
            {COMPANY.name}, CVR {COMPANY.cvr}, {COMPANY.address}, is the data controller for personal data processed through this
            website. Contact: {COMPANY.email}.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">2. What data we collect</h2>
          <p className="mt-3">
            We process the name, email address and message content that you voluntarily submit
            through our contact form or by emailing us. We also process strictly necessary
            technical data required to deliver the website (such as your consent preference stored
            locally in your browser).
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">3. Purpose and legal basis</h2>
          <p className="mt-3">
            Contact data is processed to respond to your enquiry, based on our legitimate interest
            in communicating with partners, investors and other interested parties (GDPR Article
            6(1)(f)), or to take steps at your request prior to entering into a contract (Article
            6(1)(b)). Non-essential cookies, if any are introduced, are used only with your consent
            (Article 6(1)(a)).
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">4. Cookies</h2>
          <p className="mt-3">
            This website uses strictly necessary storage to remember your cookie choice. Embedded
            third-party content (such as Google Maps) may set cookies controlled by the relevant
            provider. [PLACEHOLDER] — full cookie inventory to be added.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">5. Recipients and transfers</h2>
          <p className="mt-3">
            Personal data may be shared with service providers that host this website and handle
            our email, acting as data processors under written agreements. [PLACEHOLDER] — list of
            processors and any transfers outside the EU/EEA, including the safeguards applied.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">6. Retention</h2>
          <p className="mt-3">
            Enquiries are retained only as long as necessary to handle the correspondence and to
            comply with applicable legal obligations. [PLACEHOLDER] — specific retention periods.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">7. Your rights</h2>
          <p className="mt-3">
            You have the right to request access to, rectification of, or erasure of your personal
            data, to restrict or object to processing, and to data portability. Where processing is
            based on consent, you may withdraw it at any time. Requests can be sent to{" "}
            {COMPANY.email}. You may also lodge a complaint with the Danish Data Protection Agency
            (Datatilsynet), Carl Jacobsens Vej 35, 2500 Valby, Denmark.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">8. Changes</h2>
          <p className="mt-3">
            We may update this policy from time to time. The current version is always available on
            this page.
          </p>
        </div>
      </div>
    </section>
  );
}
