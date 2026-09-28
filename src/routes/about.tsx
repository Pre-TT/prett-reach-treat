import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionTitle } from "@/components/Reveal";
import { MILESTONES } from "@/lib/content";
import { DbImage } from "@/components/DbImage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — PreTT" },
      {
        name: "description",
        content:
          "PreTT was spun out of the University of Copenhagen in 2022 to break two walls: the blood-brain barrier and systemic toxicity in radioligand therapy.",
      },
      { property: "og:title", content: "About Us — PreTT" },
      {
        property: "og:description",
        content:
          "Founded in 2022 as a spin-out of the University of Copenhagen, PreTT develops pretargeted radiotheranostics for high-unmet-need cancers.",
      },
    ],
  }),
  component: About,
});

const IMPACT = [
  {
    stat: ">300,000",
    label: "patients diagnosed with primary brain tumours per year",
  },
  { stat: ">2.5M", label: "patients affected by brain metastases" },
  { stat: "<35%", label: "5-year survival rate for these patients today" },
  { stat: ">150,000", label: "people affected by glioblastoma globally each year (7% 5-year survival)" },
];

function About() {
  return (
    <>
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">About Us</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-6xl">
              A spin-out of the University of Copenhagen
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionTitle eyebrow="Our story">Who we are</SectionTitle>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">
              PreTT was founded in 2022 as a spin-out of the University of Copenhagen by renowned experts in
              radiopharmaceutical translation. Today the company develops pretargeted radiotheranostics designed for
              high-precision, low-toxicity cancer care.
            </p>
            <DbImage
              name="KU_logo"
              page="About"
              section="Our story"
              alt="University of Copenhagen"
              className="mx-auto mt-6 h-16 w-auto opacity-80"
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Our team is built by leaders in radiopharma and clinical translation. PreTT has been incubated at the
              BioInnovation Institute (BII Venture Lab and
              Venture House), where it was selected for further funding to develop its platform and assets.
            </p>
            <DbImage
              name="BII_logo"
              page="About"
              section="Our story"
              alt="BioInnovation Institute"
              className="mx-auto mt-6 h-14 w-auto opacity-80"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionTitle eyebrow="Our mission">Where treatment runs out, we begin</SectionTitle>
          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Brain tumours and metastases remain among the hardest cancers to treat, not because the science isn't there, but because existing therapies simply can't get there.&nbsp;
              <br />
              PreTT is built for these patients.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((i, idx) => (
              <Reveal key={i.stat} delay={idx * 100}>
                <div className="h-full rounded-xl border border-border bg-card p-7">
                  <p className="font-display text-3xl font-semibold text-foreground">{i.stat}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionTitle eyebrow="Our vision">Process to date</SectionTitle>
        <ol className="mt-12 space-y-10 border-l border-border pl-8">
          {MILESTONES.map((m, i) => (
            <Reveal as="li" key={m.year} delay={i * 80} className="relative">
              <span className="absolute -left-[41px] mt-2 size-3 rounded-full bg-accent" />
              <p className="font-display text-2xl font-semibold">{m.year}</p>
              <ul className="mt-3 space-y-2">
                {m.items.map((item) => (
                  <li key={item} className="text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
