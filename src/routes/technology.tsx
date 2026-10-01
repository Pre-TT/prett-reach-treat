import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DbImage } from "@/components/DbImage";
import { Reveal, SectionTitle } from "@/components/Reveal";
import { selectTable } from "@/lib/supabase";

import { AT211_POINTS, CLICK_CHEMISTRY_POINTS, PATENTS, STEPS } from "@/lib/content";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology — PreTT Pretargeting Platform" },
      {
        name: "description",
        content:
          "PreTT's pretargeting platform uses tetrazine ligation click chemistry (IEDDA) and proprietary At-211 chemistry to deliver alpha radioligand therapy across the blood-brain barrier.",
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

type Row = Record<string, unknown>;
type Patent = { number: string; title: string; priority: string; status: string };

function pick(row: Row, keys: string[]): string {
  const lower: Record<string, unknown> = {};
  Object.entries(row).forEach(([k, v]) => (lower[k.toLowerCase().replace(/[\s_-]/g, "")] = v));
  for (const k of keys) {
    const v = lower[k];
    if (v !== null && v !== undefined && String(v).trim() !== "") return String(v);
  }
  return "";
}

function normalizePatents(rows: Row[]): Patent[] {
  return rows.map((r) => ({
    number:
      pick(r, ["number", "patentcode", "patentnumber", "patentno", "publicationnumber", "code", "id"]).trim() ||
      "[PLACEHOLDER]",
    title: pick(r, ["title", "name", "description"]).trim() || "[PLACEHOLDER]",
    priority: pick(r, ["priority", "prioritydate", "filingdate"]).trim(),
    status: pick(r, ["status", "state"]).trim() || "[PLACEHOLDER]",
  }));
}

function usePatents() {
  return useQuery({
    queryKey: ["patents"],
    queryFn: async () => {
      const data = await selectTable<Row>(["patents", "Patents"]);
      if (!data) throw new Error("unavailable");
      return normalizePatents(data);
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}

function Technology() {
  const { data: livePatents } = usePatents();
  const patents = livePatents && livePatents.length > 0 ? livePatents : PATENTS;
  const showPriority = patents.some((p) => p.priority && p.priority !== "[PLACEHOLDER]");
  return (
    <>
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Technology</p>
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
                <div className="group relative h-full overflow-hidden rounded-xl border border-border bg-card p-8 transition-colors hover:border-accent">
                  <span className="font-display text-5xl font-semibold text-accent/30 transition-colors group-hover:text-accent">
                    {s.number}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 block">
            <figure className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-border bg-card p-4">
              <DbImage
                name="radiotheranostics in three steps"
                page="Technology"
                section="Pretargeting in action"
                alt="Three-step pretargeting: mAb-TCO targets tumour cells, radioactive tetrazine clicks in vivo, radiation treats the tumour"
                className="w-full"
              />
            </figure>
          </Reveal>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
            <Reveal delay={140}>
              <figure className="overflow-hidden rounded-xl border border-border bg-card p-5">
                <DbImage
                  name="Tetrazine ligation"
                  page="Technology"
                  section="Pretargeting in action"
                  alt="Tetrazine ligation click chemistry (IEDDA) reaction scheme between tetrazine and trans-cyclooctene"
                  className="w-full"
                />
                <figcaption className="pt-3 text-xs text-muted-foreground">
                  Tetrazine ligation click chemistry (IEDDA).
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={120}>
              <ul className="grid gap-4 content-start">
                {CLICK_CHEMISTRY_POINTS.map((p) => (
                  <li key={p} className="flex gap-4 rounded-lg border border-border bg-card p-5">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-accent" />
                    <span className="leading-relaxed">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>


      {/* At-211 */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionTitle eyebrow="α-pretargeted RLT in the brain">Unique At-211 chemistry</SectionTitle>
        <Reveal delay={120}>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Our unique At-211 chemistry enables α-pretargeted RLT, for higher therapeutic efficacy through the power of
            alpha radiation.
          </p>
        </Reveal>
        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid gap-6 sm:grid-cols-3">
            {AT211_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <div className="h-full rounded-xl border border-border bg-card p-7">
                  <p className="font-display text-2xl font-semibold text-accent">{p.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <figure className="rounded-xl border border-border bg-card p-5">
              <figcaption className="mb-3 font-display text-2xl font-semibold text-accent">
                At-211 decay chain
              </figcaption>
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


      {/* IP */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionTitle eyebrow="Our IP">Unique and strong protection with late expiry</SectionTitle>
        <Reveal delay={120}>
          <div className="mt-12 overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-ink text-ink-foreground">
                <tr>
                  <th className="px-5 py-4 font-medium">Patent number</th>
                  <th className="px-5 py-4 font-medium">Title</th>
                  {showPriority && <th className="px-5 py-4 font-medium">Priority date</th>}
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {patents.map((p) => (
                  <tr key={p.number} className="border-t border-border align-top">
                    <td className="px-5 py-4 font-medium whitespace-nowrap">{p.number}</td>
                    <td className="px-5 py-4 text-muted-foreground">{p.title}</td>
                    {showPriority && (
                      <td className="px-5 py-4 whitespace-nowrap text-muted-foreground">{p.priority}</td>
                    )}
                    <td className="px-5 py-4 text-muted-foreground">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>
    </>
  );
}
