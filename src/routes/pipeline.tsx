import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Reveal, SectionTitle } from "@/components/Reveal";
import { loadInfography, type InfographyRow } from "@/components/DbImage";
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

function stageToPct(label: string): number {
  const key = label.trim().toLowerCase();
  // Match "PoC Preclinical" / "Preclinical" etc.
  if (key.includes("preclinical")) return 35;
  switch (key) {
    case "discovery":
      return 15;
    case "cmc":
    case "phase 1":
      return 60;
    case "ind":
    case "phase 2":
      return 85;
    case "approved":
      return 100;
    default:
      return 10;
  }
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
      stagePct: stageLabel ? stageToPct(stageLabel) : 10,
    };
  });
}

function StageBar({ stagePct }: { stagePct: number }) {
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

  const pct = stagePct;

  return (
    <div ref={ref} className="relative h-9 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full bg-ink transition-[width] duration-[1400ms] ease-out"
        style={{ width: filled ? `${pct}%` : "0%" }}
      />
    </div>
  );
}

const normName = (v: string | null | undefined) => (v ?? "").trim().toLowerCase();

function PartnerLogos({ partners }: { partners: string }) {
  const [logos, setLogos] = useState<InfographyRow[]>([]);

  const names = partners
    .split(/\r?\n|,/)
    .map((n) => n.trim())
    .filter(Boolean);

  useEffect(() => {
    let active = true;
    loadInfography().then((all) => {
      if (!active) return;
      const matched = names
        .map((n) => all.find((r) => normName(r.description) === normName(n) && r.picture_link))
        .filter((r): r is InfographyRow => Boolean(r));
      setLogos(matched);
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partners]);

  if (logos.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {logos.map((l) => (
        <img
          key={l.id}
          src={l.picture_link as string}
          alt={l.description ?? ""}
          title={l.description ?? ""}
          loading="lazy"
          className="h-7 max-h-7 w-auto max-w-[95px] object-contain"
        />
      ))}
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
          <div className="min-w-[1050px]">
            <div className="grid grid-cols-[1.4fr_0.6fr_0.6fr_2fr_1.4fr] gap-6 border-b border-border pb-4 text-xs font-medium tracking-widest uppercase text-muted-foreground">
              <span>Programme / Indication</span>
              <span>Target</span>
              <span>Isotope</span>
              <div className="grid grid-cols-4 gap-0 text-center">
                {PIPELINE_STAGES.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
              <span>Partners</span>
            </div>

            {rows.map((r, i) => (
              <Reveal key={`${r.program}-${i}`} delay={i * 100}>
                <div className="grid grid-cols-[1.4fr_0.6fr_0.6fr_2fr_1.4fr] items-center gap-6 border-b border-border py-6">
                  <div>
                    <p className="font-display text-lg font-semibold">{r.program}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.indication}</p>
                  </div>
                  <span className="text-sm font-medium">{r.target}</span>
                  <span className="text-sm font-medium">{r.isotope}</span>
                  <StageBar stagePct={r.stagePct} />
                  {r.partners ? <PartnerLogos partners={r.partners} /> : <span />}
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
