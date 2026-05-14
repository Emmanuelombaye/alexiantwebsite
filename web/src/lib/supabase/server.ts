import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "@/lib/supabase/config";

export async function createSupabaseServerClient() {
  const env = getSupabaseEnv();

  if (!env) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Cookie writes can be unavailable in some server-render paths.
        }
      },
    },
  });
}

export async function createSupabasePublicClient() {
  const env = getSupabaseEnv();

  if (!env) {
    return null;
  }

  // A public client without cookies, ideal for use inside Next.js caching (unstable_cache)
  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() { return []; },
      setAll() { },
    },
  });
}

export async function createSupabaseAdminClient() {
  const env = getSupabaseEnv();

  if (!env || !env.serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY. Admin operations cannot be performed.");
  }

  return createServerClient(env.url, env.serviceRoleKey, {
    cookies: {
      getAll() { return []; },
      setAll() { },
    },
  });
}

export async function getSupabaseUser() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}