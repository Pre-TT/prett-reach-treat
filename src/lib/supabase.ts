import { createClient } from "@supabase/supabase-js";

// Public (anon) credentials — safe to ship in client code.
const SUPABASE_URL = "https://yuygdwvycnwbdcowvvll.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1eWdkd3Z5Y253YmRjb3d2dmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTA4NzUsImV4cCI6MjEwMzQ4Njg3NX0.c9d7EzTQuSMTswPoUYSJwbywY0TQ3HfQGGdteTxFCqw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/**
 * Draft / published support.
 *
 * A row is hidden from the public site when it carries an explicit
 * "not published" marker, e.g. `published = false`, `is_published = false`,
 * `draft = true`, `visible = false`, or `status = 'draft'`.
 * Rows without any such column are always shown, so tables that don't use
 * the workflow keep working unchanged.
 */
export function isPublished(row: Record<string, unknown>): boolean {
  const norm: Record<string, unknown> = {};
  Object.entries(row).forEach(
    ([k, v]) => (norm[k.toLowerCase().replace(/[\s_-]/g, "")] = v),
  );

  for (const key of ["published", "ispublished", "live", "visible", "isvisible"]) {
    if (key in norm && norm[key] !== null && norm[key] !== undefined) {
      return norm[key] === true || String(norm[key]).toLowerCase() === "true";
    }
  }
  for (const key of ["draft", "isdraft"]) {
    if (key in norm && norm[key] !== null && norm[key] !== undefined) {
      return !(norm[key] === true || String(norm[key]).toLowerCase() === "true");
    }
  }
  // `status` is also used for pipeline phases, so only act on draft/published values.
  for (const key of ["status", "publicationstatus", "state"]) {
    const v = String(norm[key] ?? "").toLowerCase();
    if (v === "draft" || v === "unpublished" || v === "hidden" || v === "archived")
      return false;
  }
  return true;
}

/**
 * The live database currently exposes capitalised table names. We try the
 * lowercase name first and fall back, so either naming works.
 * Draft rows are filtered out automatically.
 */
export async function selectTable<T>(names: string[]): Promise<T[] | null> {
  for (const name of names) {
    const { data, error } = await supabase.from(name).select("*");
    if (!error && data) {
      return (data as Record<string, unknown>[]).filter(isPublished) as T[];
    }
  }
  return null;
}

