import { createClient } from "@supabase/supabase-js";

function make(key, cached) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          ...(cached
            ? { next: { revalidate: 120, tags: ["site"] } }
            : { cache: "no-store" }),
        }),
    },
  });
}

export function publicClient() {
  return make(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, true);
}

export function serviceClient() {
  return make(process.env.SUPABASE_SERVICE_ROLE_KEY, false);
}
