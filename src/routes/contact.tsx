import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { Reveal, SectionTitle } from "@/components/Reveal";
import { COMPANY } from "@/lib/content";


export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PreTT, Copenhagen" },
      {
        name: "description",
        content:
          "Get in touch with PreTT — Ole Maaløes Vej 3, 2200 Copenhagen, Denmark. Email info@pre-tt.com or connect with us on LinkedIn.",
      },
      { property: "og:title", content: "Contact — PreTT, Copenhagen" },
      {
        property: "og:description",
        content: "Reach the PreTT team in Copenhagen for partnering and investment enquiries.",
      },
    ],
  }),
  component: Contact,
});

const mapHref = "https://maps.google.com/?q=Ole+Maaløes+Vej+3,+2200+Copenhagen,+Denmark";

function Contact() {
  return (
    <>
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold sm:text-6xl">Let's talk!</h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <SectionTitle eyebrow="Find us">Copenhagen, Denmark</SectionTitle>
          <ul className="mt-8 space-y-5 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
              <a href={mapHref} target="_blank" rel="noreferrer noopener" className="hover:text-accent">
                <strong className="block font-semibold">{COMPANY.name}</strong>
                {COMPANY.address}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-accent">
                {COMPANY.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Linkedin className="mt-0.5 size-5 shrink-0 text-accent" />
              <a href={COMPANY.linkedin} target="_blank" rel="noreferrer noopener" className="hover:text-accent">
                PreTT on LinkedIn
              </a>
            </li>
          </ul>

        </Reveal>
      </section>
    </>
  );
}
