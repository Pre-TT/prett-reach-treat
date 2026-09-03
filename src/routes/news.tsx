import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionTitle } from "@/components/Reveal";
import { selectTable, isPublished } from "@/lib/supabase";
import type { NewsItem } from "@/lib/content";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — PreTT" },
      {
        name: "description",
        content:
          "Latest news and announcements from PreTT, the Copenhagen-based radiotheranostics company behind the target-click-treat pretargeting platform.",
      },
      { property: "og:title", content: "News — PreTT" },
      {
        property: "og:description",
        content: "Announcements, grants and milestones from PreTT.",
      },
    ],
  }),
  component: News,
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

function truncate(text: string, max = 220): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max).replace(/\s+\S*$/, "") + "…";
}

function normalize(rows: Row[]): NewsItem[] {
  return rows
    .map((r) => {
      const full = pick(r, ["body", "content", "excerpt", "summary", "description"]);
      return {
        id: pick(r, ["id", "slug", "uid"]) || pick(r, ["title"]),
        title: pick(r, ["title", "headline", "name"]) || "[PLACEHOLDER]",
        date: pick(r, ["date", "published_at", "created_at", "publishedat"]),
        excerpt: truncate(pick(r, ["summary", "excerpt", "description"]) || full),
        full,
        link: pick(r, ["link", "url", "href"]) || null,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function formatDate(value: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function News() {
  const { data, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const rows = await selectTable<Row>([
        "news",
        "News",
        "Press releases",
        "press_releases",
      ]);
      if (!rows) return null;
      return normalize(rows);
    },
  });

  const items = data ?? [];

  return (
    <>
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow">News</p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold sm:text-6xl">
              Latest from PreTT
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <SectionTitle eyebrow="Announcements">Company updates</SectionTitle>

        {isLoading ? (
          <p className="mt-10 text-muted-foreground">Loading news…</p>
        ) : items.length === 0 ? (
          <p className="mt-10 max-w-2xl text-muted-foreground">
            [PLACEHOLDER] — no news items are published yet. Entries added to the connected
            database will appear here automatically.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {items.map((n, i) => (
              <Reveal key={n.id} delay={i * 90}>
                <Link
                  to="/news/$id"
                  params={{ id: n.id }}
                  className="group flex h-full flex-col rounded-xl border border-border bg-cream p-7 transition-all hover:border-accent hover:shadow-[0_12px_32px_-12px_rgba(2,48,71,0.25)]"
                >
                  {n.date ? (
                    <time className="text-xs font-semibold tracking-widest uppercase text-accent">
                      {formatDate(n.date)}
                    </time>
                  ) : null}
                  <h3 className="mt-3 text-xl font-semibold text-ink">{n.title}</h3>
                  {n.excerpt ? (
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {n.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                    Read more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
