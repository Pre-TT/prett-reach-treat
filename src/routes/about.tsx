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
