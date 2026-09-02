import { createClient } from "@supabase/supabase-js";

// Public (anon) credentials — safe to ship in client code.
const SUPABASE_URL = "https://yuygdwvycnwbdcowvvll.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1eWdkd3Z5Y253YmRjb3d2dmxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTA4NzUsImV4cCI6MjEwMzQ4Njg3NX0.c9d7EzTQuSMTswPoUYSJwbywY0TQ3HfQGGdteTxFCqw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/**
 * The live database currently exposes capitalised table names. We try the
 * lowercase name first and fall back, so either naming works.
 */
export async function selectTable<T>(names: string[]): Promise<T[] | null> {
  for (const name of names) {
    const { data, error } = await supabase.from(name).select("*");
    if (!error && data) return data as T[];
  }
  return null;
}
