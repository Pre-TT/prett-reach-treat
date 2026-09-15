import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type InfographyRow = {
  id: number;
  picture_name: string | null;
  page: string | null;
  section: string | null;
  sub_section: string | null;
  picture_link: string | null;
  description: string | null;
  published: boolean | null;
};

let cache: Promise<InfographyRow[]> | undefined;

function loadInfography(): Promise<InfographyRow[]> {
  if (!cache) {
    cache = (async () => {
      const { data, error } = await supabase
        .from("Infography")
        .select("*")
        .eq("published", true);
      return error || !data ? [] : (data as InfographyRow[]);
    })();
  }
  return cache;
}

const norm = (v: string | null | undefined) => (v ?? "").trim().toLowerCase();

export type DbImageProps = {
  /** picture_name of the row in the Infography table */
  name: string;
  page?: string;
  section?: string;
  subSection?: string;
  /** Fallback alt text when the row has no description */
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
  ariaHidden?: boolean;
};

/**
 * Renders an image sourced from the published rows of the Infography table.
 * Renders nothing when no matching row exists.
 */
export function DbImage({
  name,
  page,
  section,
  subSection,
  alt = "",
  className,
  loading = "lazy",
  ariaHidden,
}: DbImageProps) {
  const [row, setRow] = useState<InfographyRow | null>(null);

  useEffect(() => {
    let active = true;
    loadInfography().then((rows) => {
      if (!active) return;
      const match =
        rows.find(
          (r) =>
            norm(r.picture_name) === norm(name) &&
            (page === undefined || norm(r.page) === norm(page)) &&
            (section === undefined || norm(r.section) === norm(section)) &&
            (subSection === undefined || norm(r.sub_section) === norm(subSection)),
        ) ?? null;
      setRow(match && match.picture_link ? match : null);
    });
    return () => {
      active = false;
    };
  }, [name, page, section, subSection]);

  if (!row?.picture_link) return null;

  return (
    <img
      src={row.picture_link}
      alt={ariaHidden ? "" : row.description || alt}
      aria-hidden={ariaHidden || undefined}
      className={className}
      loading={loading}
    />
  );
}
