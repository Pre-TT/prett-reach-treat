import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { z } from "zod";
import { Reveal, SectionTitle } from "@/components/Reveal";
import { COMPANY } from "@/lib/content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PreTT ApS, Copenhagen" },
      {
        name: "description",
        content:
          "Get in touch with PreTT ApS — Ole Maaløes Vej 3, 2200 Copenhagen, Denmark. Email info@pre-tt.com or connect with us on LinkedIn.",
      },
      { property: "og:title", content: "Contact — PreTT ApS, Copenhagen" },
      {
        property: "og:description",
        content: "Reach the PreTT team in Copenhagen for partnering and investment enquiries.",
      },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  message: z.string().trim().min(1, "Please enter a message").max(1000),
});

function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        next[String(i.path[0])] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Website enquiry from ${parsed.data.name}`);
    const body = encodeURIComponent(`${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`);
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const mapQuery = encodeURIComponent(`${COMPANY.address}, ${COMPANY.city}, ${COMPANY.country}`);

  return (
    <>
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold sm:text-6xl">
              Let's talk about partnering
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionTitle eyebrow="Write to us">Send a message</SectionTitle>
            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  maxLength={100}
                  className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 outline-none focus:border-accent"
                />
                {errors.name ? (
                  <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  maxLength={255}
                  className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 outline-none focus:border-accent"
                />
                {errors.email ? (
                  <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                ) : null}
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={1000}
                  className="mt-2 w-full resize-y rounded-lg border border-border bg-card px-4 py-3 outline-none focus:border-accent"
                />
                {errors.message ? (
                  <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                ) : null}
              </div>
              <button
                type="submit"
                className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-ink-foreground transition-colors hover:bg-accent hover:text-ink"
              >
                Send message
              </button>
              {sent ? (
                <p className="text-sm text-muted-foreground">
                  Your email client should now open with the message ready to send.
                </p>
              ) : null}
            </form>
          </Reveal>

          <Reveal delay={140}>
            <SectionTitle eyebrow="Find us">Copenhagen, Denmark</SectionTitle>
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                <span>
                  <strong className="block font-semibold">{COMPANY.name}</strong>
                  {COMPANY.address}
                  <br />
                  {COMPANY.city}, {COMPANY.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-accent">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Linkedin className="mt-0.5 size-5 shrink-0 text-accent" />
                <a
                  href={COMPANY.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-accent"
                >
                  PreTT on LinkedIn
                </a>
              </li>
            </ul>
            <div className="mt-8 overflow-hidden rounded-xl border border-border">
              <iframe
                title="PreTT ApS location on Google Maps"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
