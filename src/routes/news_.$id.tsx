import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { supabase, isPublished } from "@/lib/supabase";

export const Route = createFileRoute("/news_/$id")({
  head: () => ({
    meta: [
      { title: "Press Release — PreTT" },
      { name: "description", content: "Press release from PreTT." },
      { property: "og:title", content: "Press Release — PreTT" },
      { property: "og:description", content: "Press release from PreTT." },
    ],
  }),
  component: PressRelease,
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

function formatDate(value: string) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** A paragraph that reads as an executive quote: wrapped in quotation marks. */
function isQuote(text: string): boolean {
  const t = text.trim();
  return (
    (t.startsWith("\u201c") || t.startsWith('"')) &&
    (t.endsWith("\u201d") || t.endsWith('"'))
  );
}

function PressRelease() {
  const { id } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: async (): Promise<Row | null> => {
      for (const name of ["news", "News", "Press releases", "press_releases"]) {
        const { data, error } = await supabase.from(name).select("*").eq("id", id).single();
        if (!error && data) {
          const row = data as Row;
          return isPublished(row) ? row : null;
        }
      }
      return null;
    },
  });

  if (isLoading) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <p className="text-muted-foreground">Loading…</p>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
        <p className="text-muted-foreground">
          This press release is not available. It may be unpublished or no longer exists.
        </p>
        <Link
          to="/news"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
        >
          <ArrowLeft className="size-4" />
          Back to News
        </Link>
      </section>
    );
  }

  const title = pick(data, ["title", "headline", "name"]) || "[PLACEHOLDER]";
  const date = pick(data, ["date", "published_at", "created_at", "publishedat"]);
  const body = pick(data, ["body", "content", "excerpt", "summary", "description"]);
  const paragraphs = body.split(/\n+/).map((p) => p.trim()).filter(Boolean);

  return (
    <section className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <Reveal>
        {date ? (
          <p className="text-sm font-semibold tracking-widest uppercase text-ink">
            {formatDate(date)}
          </p>
        ) : null}
        <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {title}
        </h1>
      </Reveal>

      <div className="mt-10 space-y-6">
        {paragraphs.length === 0 ? (
          <p className="text-muted-foreground">[PLACEHOLDER] — full content not available.</p>
        ) : (
          paragraphs.map((para, i) =>
            isQuote(para) ? (
              <blockquote
                key={i}
                className="border-l-2 border-accent pl-6 italic text-ink/85 leading-relaxed"
              >
                {para}
              </blockquote>
            ) : (
              <p key={i} className="text-lg leading-relaxed text-ink/80">
                {para}
              </p>
            ),
          )
        )}
      </div>

      <div className="mt-12 border-t border-border pt-6">
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
        >
          <ArrowLeft className="size-4" />
          Back to News
        </Link>
      </div>
    </section>
  );
}
