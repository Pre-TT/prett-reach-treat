import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionTitle } from "@/components/Reveal";
import { selectTable } from "@/lib/supabase";
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

function normalize(rows: Row[]): NewsItem[] {
  return rows
    .map((r) => ({
      title: pick(r, ["title", "headline", "name"]) || "[PLACEHOLDER]",
      date: pick(r, ["date", "published_at", "created_at", "publishedat"]),
      excerpt: pick(r, ["excerpt", "summary", "description", "body", "content"]),
      link: pick(r, ["link", "url", "href"]) || null,
    }))
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
      const rows = await selectTable<Row>(["news", "News"]);
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
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((n, i) => (
              <Reveal key={`${n.title}-${i}`} delay={i * 90}>
                <article className="group flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-colors hover:border-accent">
                  {n.date ? (
                    <time className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
                      {formatDate(n.date)}
                    </time>
                  ) : null}
                  <h3 className="mt-3 text-lg font-semibold">{n.title}</h3>
                  {n.excerpt ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {n.excerpt}
                    </p>
                  ) : null}
                  {n.link ? (
                    <a
                      href={n.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
                    >
                      Read more
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
