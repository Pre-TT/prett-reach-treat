import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Reveal, SectionTitle } from "@/components/Reveal";
import { selectTable } from "@/lib/supabase";
import { TEAM_FALLBACK, type TeamMember } from "@/lib/content";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — PreTT" },
      {
        name: "description",
        content:
          "Built by leaders in radiopharma and clinical translation: the management, advisors and research team behind PreTT.",
      },
      { property: "og:title", content: "Team — PreTT" },
      {
        property: "og:description",
        content: "Meet the PreTT team — founded in 2022 by renowned experts in radiopharmaceutical translation.",
      },
    ],
  }),
  component: Team,
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

function normalize(rows: Row[]): TeamMember[] {
  return rows.map((r) => ({
    name: pick(r, ["name", "full_name", "fullname"]),
    title: pick(r, ["title", "role", "position"]),
    bio: pick(r, ["bio", "description", "short_bio", "summary"]),
    group: pick(r, ["group", "category", "team", "department"]) || "Team",
    photo_url:
      pick(r, [
        "picture_url",
        "picture",
        "photo_url",
        "photo",
        "image_url",
        "image",
        "avatar_url",
      ]) || null,
  }));
}

function initials(name: string) {
  return name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter((w) => /^[A-Za-zÀ-ÿ]/.test(w) && !/^(prof\.|dr\.|mr\.|ms\.)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Team() {
  const { data } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const rows = await selectTable<Row>(["team", "Team"]);
      if (!rows || rows.length === 0) return null;
      return normalize(rows);
    },
  });

  const members = data ?? TEAM_FALLBACK;
  const groupOrder = [
    "Management",
    "Research & Development",
    "Business Development",
    "Advisors",
    "Team",
  ];
  const groups = Array.from(new Set(members.map((m) => m.group))).sort(
    (a, b) => {
      const ia = groupOrder.indexOf(a);
      const ib = groupOrder.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    },
  );

  return (
    <>
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">The Team of PreTT</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-6xl">
              Built by leaders in radiopharma and clinical translation
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        {groups.map((g, gi) => (
          <div key={g} className={gi > 0 ? "mt-20" : ""}>
            <SectionTitle eyebrow={`0${gi + 1}`}>{g}</SectionTitle>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {members
                .filter((m) => m.group === g)
                .sort((a, b) => preferredOrder(a.name) - preferredOrder(b.name))
                .map((m, i) => (
                  <Reveal key={m.name} delay={i * 90}>
                    <article className="group flex h-full items-center gap-5 rounded-xl border border-border bg-card p-4 transition-colors hover:border-accent">
                      {m.photo_url ? (
                        <img
                          src={m.photo_url}
                          alt={m.name}
                          className="size-24 shrink-0 rounded-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex size-24 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-2xl font-semibold text-foreground">
                          {initials(m.name)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-xl font-semibold">{m.name}</h3>
                        {m.title ? (
                          <p className="mt-1 text-base font-medium text-muted-foreground">{m.title}</p>
                        ) : null}
                        {m.bio ? (
                          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{m.bio}</p>
                        ) : null}
                      </div>
                    </article>
                  </Reveal>
                ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
