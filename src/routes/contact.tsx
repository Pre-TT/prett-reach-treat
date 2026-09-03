import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Linkedin, Mail, MapPin } from "lucide-react";
import { z } from "zod";
import emailjs from "@emailjs/browser";
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

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  message: z.string().trim().min(1, "Please enter a message").max(1000),
});

const EMAILJS_SERVICE_ID = "service_ops9uew";
const EMAILJS_TEMPLATE_ID = "template_vwbfl4j";
const EMAILJS_PUBLIC_KEY = "FwPdzFNWKgCHPQHlw";

function Contact() {
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    });
    if (!parsed.success) {
      const next: { name?: string; email?: string; message?: string } = {};
      parsed.error.issues.forEach((i) => {
        next[String(i.path[0]) as "name" | "email" | "message"] = i.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: parsed.data.name,
          email: parsed.data.email,
          message: parsed.data.message,
          from_name: parsed.data.name,
          from_email: parsed.data.email,
          reply_to: parsed.data.email,
          to_email: COMPANY.email,
          subject: `Website enquiry from ${parsed.data.name}`,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      formEl.reset();
    } catch {
      setStatus("error");
    }
  };

  const mapQuery = encodeURIComponent(`${COMPANY.name}, ${COMPANY.address}`);

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
                {errors.name ? <p className="mt-1 text-sm text-destructive">{errors.name}</p> : null}
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
                {errors.email ? <p className="mt-1 text-sm text-destructive">{errors.email}</p> : null}
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
                {errors.message ? <p className="mt-1 text-sm text-destructive">{errors.message}</p> : null}
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-ink px-7 py-3 text-sm font-semibold text-ink-foreground transition-colors hover:bg-accent hover:text-ink disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              {status === "sent" ? (
                <p className="text-sm text-muted-foreground">
                  Thank you — your message has been sent. We'll be in touch shortly.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-destructive">
                  Something went wrong sending your message. Please email {COMPANY.email} directly.
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
                <a href={COMPANY.linkedin} target="_blank" rel="noreferrer noopener" className="hover:text-accent">
                  PreTT on LinkedIn
                </a>
              </li>
            </ul>
            <div className="group relative mt-8 overflow-hidden rounded-2xl border border-primary/15 bg-primary shadow-lg">
              <iframe
                title="PreTT location on Google Maps"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                className="h-[340px] w-full border-0 opacity-80 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-5">
                <div className="text-primary-foreground">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Headquarters</p>
                  <p className="mt-1 text-sm font-medium">{COMPANY.address}</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="pointer-events-auto rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition hover:brightness-110"
                >
                  Open in Maps
                </a>
              </div>
            </div>

          </Reveal>
        </div>
      </section>
    </>
  );
}
