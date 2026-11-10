import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DbImage } from "@/components/DbImage";


import { Reveal, SectionTitle } from "@/components/Reveal";
import { COMPANY, MISSION_QUOTE, NUTSHELL, NUTSHELL_BBB, SHORT_DESCRIPTION } from "@/lib/content";

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
        <DbImage
          name="Background logo"
          page="Home"
          section="Next Generation Radiotheranostics"
          ariaHidden
          loading="eager"
          className="pointer-events-none absolute -right-24 top-1/2 w-[min(120vw,900px)] -translate-y-1/2 opacity-[0.07] select-none"
        />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
          <Reveal>
            <p className="eyebrow text-accent">Next Generation Radiotheranostics</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 max-w-4xl text-5xl leading-[1.05] font-semibold sm:text-7xl">
              Target. <span className="text-accent">Click.</span> Treat.
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-2xl text-lg text-ink-foreground/75">
              High-precision, low-toxicity cancer care.
              <br />
              The promise of radioligand therapy is targeted radiation. The reality has always been a compromise. PreTT changes the equation.
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
          <SectionTitle eyebrow="RADIOTHERANOSTICS: PRECISION IMAGING AND TARGETED THERAPY">See what you treat, treat what you see</SectionTitle>
          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Radiotheranostics combine imaging and therapy using radioactive molecules composed of a targeting molecule (such as an antibody, peptide, or small molecule), a radionuclide, and, when needed, a linker or chelator. Imaging radionuclides enable tumor visualization, patient stratification, radiation dosimetry, and monitoring of treatment response, while therapeutic radionuclides deliver cell-killing radiation to cancer cells. This combination of imaging and therapy enable a more precise and personalized approach to cancer treatment.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <figure className="mt-12 max-w-5xl">
              <DbImage
                name="Radiotheranostics"
                page="Home"
                section="Radiotheranostics"
                alt="Workflow from cancer patients through PET/SPECT imaging to stratification, dosimetry, treatment and monitoring"
                className="w-full"
              />
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Two barriers. One solution. */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionTitle eyebrow="The challenge">The challenge of conventional Radioligand Therapy</SectionTitle>
        <Reveal delay={120}>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground">{MISSION_QUOTE}</p>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed font-medium text-foreground italic">
            What if the targeting molecule did not have to carry the radioactive payload while searching for the tumour?
          </p>
        </Reveal>

        {/* 1. The therapeutic index */}
        <div className="mt-6">
          <Reveal>
            <p className="eyebrow text-ink">{"\n"}</p>
            <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">
              {"\n"}
            </h3>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{NUTSHELL}</p>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{NUTSHELL_BBB}</p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {"\n"}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <DbImage
              name="target click treat"
              page="Home"
              section="Systemic toxcicity"
              subSection="Redefining the therapeutic index"
              alt="Target. Click. Treat."
              className="mx-auto mt-10 w-[70%]"
            />
          </Reveal>
        </div>

      </section>

      {/* Teasers */}
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-4xl font-semibold sm:text-5xl">Explore {COMPANY.name}</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TEASERS.map((t, i) => (
              <Reveal key={t.to} delay={i * 120}>
                <Link
                  to={t.to}
                  className="group flex h-full flex-col rounded-xl border border-ink-foreground/15 p-7 transition-colors hover:border-accent"
                >
                  <p className="eyebrow text-accent">{t.eyebrow}</p>
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
