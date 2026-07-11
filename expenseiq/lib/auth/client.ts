import { createClient } from "@supabase/supabase-js";

// Uses process.env variables, falling back to the configured project credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kaqjtjsfldboposemqci.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_tmQm8mpC6yN0RWjtswFT-w_eWK2DcRb";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
