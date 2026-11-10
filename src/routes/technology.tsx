import { createFileRoute } from "@tanstack/react-router";
import { DbImage } from "@/components/DbImage";
import { Reveal, SectionTitle } from "@/components/Reveal";

import { AT211_GROUPS, CLICK_CHEMISTRY_POINTS, STEPS } from "@/lib/content";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — PreTT Pretargeting Platform" },
      {
        name: "description",
        content:
          "PreTT's pretargeting platform uses tetrazine ligation click chemistry (IEDDA) and proprietary At-211 chemistry to deliver α radioligand therapy across the blood-brain barrier.",
      },
      { property: "og:title", content: "Technology — PreTT Pretargeting Platform" },
      {
        property: "og:description",
        content:
          "Target, click, treat: high specificity and rapid clearance — the only pretargeting platform capable of crossing the BBB.",
      },
    ],
  }),
  component: Technology,
});

function Technology() {
  return (
    <>
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-accent">Technology</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-6xl">
              Long enough in the tumour.
              <br />
              Short enough everywhere else.
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-8 max-w-3xl text-lg text-ink-foreground/75">
              Current radioligand therapies are limited by a suboptimal pharmacokinetic profile. The trade-off between
              binding specificity and off-target clearance creates a “therapeutic ceiling”, where systemic toxicity
              prevents the delivery of curative doses. Our proprietary pretargeting platform separates tumour targeting
              from radioactive delivery, ensuring maximum dose to the tumour while sparing healthy tissue.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Modules: target - click - treat + click chemistry */}
      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionTitle eyebrow="Pretargeting in action">Decoupling radiotheranostics in three steps</SectionTitle>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="group relative h-full">
                  <span className="font-display text-5xl font-semibold text-ink/30 transition-colors group-hover:text-ink/60">
                    {s.number}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 block">
            <figure className="mx-auto max-w-[62.4rem]">
              <DbImage
                name="radiotheranostics in three steps"
                page="Technology"
                section="Pretargeting in action"
                alt="Three-step pretargeting: mAb-TCO targets tumour cells, radioactive tetrazine clicks in vivo, radiation treats the tumour"
                className="w-full"
              />
            </figure>
          </Reveal>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            <Reveal delay={140}>
              <figure className="flex h-full flex-col rounded-xl border border-accent p-5">
                <DbImage
                  name="Tetrazine ligation"
                  page="Technology"
                  section="Pretargeting in action"
                  alt="Tetrazine ligation click chemistry (IEDDA) reaction scheme between tetrazine and trans-cyclooctene"
                  className="mx-auto my-auto w-[64%]"
                />
                <figcaption className="pt-3 text-xs text-muted-foreground">
                  Inverse electron-demand Diels–Alder reaction (IEDDA).
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={120}>
              <ul className="grid h-full grid-rows-4 gap-3">
                {CLICK_CHEMISTRY_POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-4 rounded-lg border border-accent p-3.5">
                    <span className="size-2 shrink-0 rounded-full bg-accent" />
                    <span className="text-sm leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>


      {/* At-211 */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionTitle eyebrow={<><span className="normal-case">α</span>-pretargeted RLT in the brain</>}>
          Astatine-211: The Ideal Properties
        </SectionTitle>
        <Reveal delay={120}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Astatine-211 combines favorable nuclear and chemical properties for pretargeted alpha radioligand therapy,
            with the potential to improve therapeutic efficacy while reducing healthy-tissue exposure.
          </p>
        </Reveal>
        <div className="mt-12 grid items-stretch gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-10">
            {AT211_GROUPS.map((g, gi) => (
              <div key={g.label}>
                <Reveal>
                  <p className="eyebrow mb-4 text-ink">{g.label}</p>
                </Reveal>
                <div className="grid gap-6 sm:grid-cols-3">
                  {g.cards.map((p, i) => (
                    <Reveal key={p.title} delay={(gi * 3 + i) * 100}>
                      <div className="h-full rounded-xl border border-accent p-6">
                        <p className="font-display text-lg font-semibold text-ink">{p.title}</p>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Reveal delay={200} className="h-full">
            <figure className="flex h-full flex-col justify-center">
              <DbImage
                name="At-211 decay chain"
                page="Technology"
                section="α-pretargeted RLT in the brain"
                subSection="At-211 decay chain"
                alt="At-211 decay chain diagram showing decay via Po-211 and Bi-207 to stable Pb-207"
                className="mx-auto max-h-[420px] w-auto"
              />
            </figure>
          </Reveal>
        </div>
      </section>


    </>
  );
}
