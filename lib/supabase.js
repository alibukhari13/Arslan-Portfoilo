import { createClient } from "@supabase/supabase-js";

function make(key) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

export function publicClient() {
  return make(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function serviceClient() {
  return make(process.env.SUPABASE_SERVICE_ROLE_KEY);
}
