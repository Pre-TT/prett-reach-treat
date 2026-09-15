import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Reveal, SectionTitle } from "@/components/Reveal";
import { selectTable } from "@/lib/supabase";
import { PIPELINE_FALLBACK, PIPELINE_STAGES, type PipelineRow } from "@/lib/content";

export const Route = createFileRoute("/pipeline")({
  head: () => ({
    meta: [
      { title: "Pipeline — PreTT" },
      {
        name: "description",
        content:
          "PreTT's oncology pipeline: our roadmap to first-in-human trials across HER2+ breast cancer brain metastases, glioblastoma and HNSCC.",
      },
      { property: "og:title", content: "Pipeline — PreTT" },
      {
        property: "og:description",
        content:
          "Pretargeted alpha radioligand therapy programmes targeting high-unmet-need cancers in the brain and beyond.",
      },
    ],
  }),
  component: Pipeline,
});

type Row = Record<string, unknown>;

function pick(row: Row, keys: string[]): string {
  const lower: Record<string, unknown> = {};
  Object.entries(row).forEach(([k, v]) => (lower[k.toLowerCase()] = v));
  for (const k of keys) {
    const v = lower[k];
    if (v !== null && v !== undefined && String(v).trim() !== "") return String(v);
  }
  return "";
}

function normalize(rows: Row[]): PipelineRow[] {
  return rows.map((r) => {
    const stageLabel = pick(r, ["stage", "phase", "status"]);
    const idx = PIPELINE_STAGES.findIndex((s) => s.toLowerCase() === stageLabel.trim().toLowerCase());
    const numeric = Number(pick(r, ["stage_index", "stageindex", "progress"]));
    return {
      program: pick(r, ["program", "programm", "programme", "asset", "name", "title"]) || "[PLACEHOLDER]",
      indication: pick(r, ["indication", "disease", "description"]) || "[PLACEHOLDER]",
      target: pick(r, ["target"]) || "[PLACEHOLDER]",
      isotope: pick(r, ["isotope", "radionuclide", "nuclide"]) || "[PLACEHOLDER]",
      partners: pick(r, ["partners", "partner", "collaborators", "funding"]),
      stageIndex: Number.isFinite(numeric) && numeric > 0 ? numeric - 1 : idx >= 0 ? idx : 0,
    };
  });
}

function StageBar({ stageIndex }: { stageIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setFilled(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fill to the middle of the "PoC Preclinical" segment (midpoint of the second of 4 stages)
  const pct = 37.5;

  return (
    <div ref={ref} className="relative h-9 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full bg-ink transition-[width] duration-[1400ms] ease-out"
        style={{ width: filled ? `${pct}%` : "0%" }}
      />
    </div>
  );
}

function Pipeline() {
  const { data, isError } = useQuery({
    queryKey: ["pipeline"],
    queryFn: async () => {
      const rows = await selectTable<Row>(["pipeline", "Pipeline"]);
      if (!rows || rows.length === 0) return null;
      return normalize(rows);
    },
  });

  const rows = data ?? PIPELINE_FALLBACK;
  const usingFallback = !data;

  return (
    <>
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">Oncology Pipeline</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-6xl">Our roadmap to first-in-human trials</h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-8 max-w-3xl text-lg text-ink-foreground/75">
              PreTT is expanding its technology to a therapeutic oncology pipeline focused on high-unmet-need oncology
              targets in the brain — primary tumours and brain metastases.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionTitle eyebrow="Programmes">Development status</SectionTitle>

        <div className="mt-12 overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr_2.4fr] gap-6 border-b border-border pb-4 text-xs font-medium tracking-widest uppercase text-muted-foreground">
              <span>Programme / Indication</span>
              <span>Target</span>
              <span>Isotope</span>
              <div className="grid grid-cols-4 gap-0 text-center">
                {PIPELINE_STAGES.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>

            {rows.map((r, i) => (
              <Reveal key={`${r.program}-${i}`} delay={i * 100}>
                <div className="grid grid-cols-[1.5fr_0.7fr_0.7fr_2.4fr] items-center gap-6 border-b border-border py-6">
                  <div>
                    <p className="font-display text-lg font-semibold">{r.program}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.indication}</p>
                    {r.partners ? <p className="mt-2 text-xs text-muted-foreground/80">{r.partners}</p> : null}
                  </div>
                  <span className="text-sm font-medium">{r.target}</span>
                  <span className="text-sm font-medium">{r.isotope}</span>
                  <StageBar stageIndex={r.stageIndex} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {usingFallback && isError ? (
          <p className="mt-8 text-xs text-muted-foreground">
            Live pipeline data is currently unavailable.
          </p>
        ) : null}
      </section>
    </>
  );
}
