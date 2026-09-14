import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/6.png.asset.json";
import stratification from "@/assets/Patient_Stratification.png.asset.json";
import bbbCrossing from "@/assets/BBB_crossing_PreTT.png.asset.json";

import { Reveal, SectionTitle } from "@/components/Reveal";
import { COMPANY, MISSION_QUOTE, NUTSHELL, SHORT_DESCRIPTION, STEPS } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PreTT — See it. Reach it. Treat it." },
      {
        name: "description",
        content:
          "PreTT develops next generation radiotheranostics: a target-click-treat pretargeting platform for high-precision, low-toxicity cancer care across the blood-brain barrier.",
      },
      { property: "og:title", content: "PreTT — See it. Reach it. Treat it." },
      {
        property: "og:description",
        content:
          "Next generation radiotheranostics. High-precision, low-toxicity cancer care from PreTT, Copenhagen.",
      },
    ],
  }),
  component: Home,
});

const TEASERS = [
  {
    to: "/technology" as const,
    eyebrow: "Technology",
    title: "Target. Click. Treat.",
    body: "A two-step system built on tetrazine ligation click chemistry — the engine behind our platform.",
  },
  {
    to: "/pipeline" as const,
    eyebrow: "Pipeline",
    title: "Our roadmap to first-in-human trials",
    body: "An oncology pipeline focused on high-unmet-need targets in the brain — primary tumours and brain metastases.",
  },
  {
    to: "/team" as const,
    eyebrow: "Team",
    title: "Built by leaders in radiopharma",
    body: "Founded in 2022 by renowned experts in radiopharmaceutical translation and clinical development.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden bg-ink text-ink-foreground">
        <img
          src={logo.url}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 w-[min(120vw,900px)] -translate-y-1/2 opacity-[0.07] select-none"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
          <Reveal>
            <p className="eyebrow">Next Generation Radiotheranostics</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] font-semibold sm:text-7xl">
              See it. <span className="text-accent">Reach it.</span> Treat it.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg text-ink-foreground/75">
              High-precision, low-toxicity cancer care. {SHORT_DESCRIPTION}
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/technology"
                className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:-translate-y-0.5"
              >
                Explore our technology
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-ink-foreground/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink-foreground/10"
              >
                Get in touch
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Radiotheranostics */}
      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionTitle eyebrow="Radiotheranostics">See what you treat, treat what you see</SectionTitle>
          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Radiotheranostics are radioactive molecules that consist of a targeting vector (mAb, peptide, small
              molecule), an optional linker, a radionuclide and — for radiometals — an optional chelator. Imaging
              enables patient stratification and dosimetry; therapy then delivers what imaging revealed.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <figure className="mt-12 max-w-5xl">
              <img
                src={stratification.url}
                alt="Workflow from cancer patients through PET/SPECT imaging to stratification, dosimetry, treatment and monitoring"
                className="w-full"
                loading="lazy"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Two barriers. One solution. */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionTitle eyebrow="The challenge">Two barriers. One solution.</SectionTitle>
        <Reveal delay={120}>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground">{MISSION_QUOTE}</p>
        </Reveal>

        {/* 1. The therapeutic index */}
        <div className="mt-16">
          <Reveal>
            <p className="eyebrow">01 · Systemic toxicity</p>
            <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">Redefining the therapeutic index</h3>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{NUTSHELL}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="h-full rounded-xl border border-border bg-card p-7">
                  <span className="font-display text-4xl font-semibold text-accent">{s.number}</span>
                  <h4 className="mt-4 text-xl font-semibold">{s.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 2. The BBB crossing */}
        <div className="mt-20 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">02 · The blood-brain barrier</p>
            <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">Crossing the blood-brain barrier</h3>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              The blood-brain barrier keeps medicines out. Our covalent labeling chemistry supports brain
              penetration — and we have demonstrated blood-brain barrier crossing in a proof of concept in
              partnership with Roche.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <img
              src={bbbCrossing.url}
              alt="PreTT pretargeting platform crossing the blood-brain barrier"
              loading="lazy"
              className="w-full rounded-2xl bg-white shadow-md ring-1 ring-border"
            />
          </Reveal>
        </div>
      </section>

      {/* Teasers */}
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold sm:text-4xl">Explore {COMPANY.name}</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TEASERS.map((t, i) => (
              <Reveal key={t.to} delay={i * 120}>
                <Link
                  to={t.to}
                  className="group flex h-full flex-col rounded-xl border border-ink-foreground/15 p-7 transition-colors hover:border-accent"
                >
                  <p className="eyebrow">{t.eyebrow}</p>
                  <h3 className="mt-4 text-xl font-semibold">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-foreground/70">{t.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
