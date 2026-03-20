const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseStorageBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "property-images";

export function getSupabaseEnv() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
    serviceRoleKey: supabaseServiceKey,
  };
}

export function hasSupabaseEnv() {
  return Boolean(getSupabaseEnv());
}

export function getSupabaseStorageBucket() {
  return supabaseStorageBucket;
}