import { createClient } from "@supabase/supabase-js";
import { getSessionTokens, setSessionCookies, clearSessionCookies } from "./session";

const supabaseUrl = process.env.SUPABASE_URL || "https://kaqjtjsfldboposemqci.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_tmQm8mpC6yN0RWjtswFT-w_eWK2DcRb";

export async function getServerSupabaseClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // Session managed manually via cookies on the server
      autoRefreshToken: false,
    },
  });
}

export async function getAuthenticatedUser() {
  const { accessToken, refreshToken } = await getSessionTokens();
  
  const supabase = await getServerSupabaseClient();

  if (!accessToken) {
    // If access token is missing/expired, attempt to refresh using the refresh token
    if (refreshToken) {
      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (!refreshError && session) {
        // Sync the refreshed access/refresh tokens back to cookies
        await setSessionCookies(session.access_token, session.refresh_token);
        return session.user;
      }
    }
    return null;
  }

  // Verify access token with Supabase Auth
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user) {
    // If access token has expired, attempt to refresh using the refresh token
    if (refreshToken) {
      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (!refreshError && session) {
        // Sync the refreshed access/refresh tokens back to cookies
        await setSessionCookies(session.access_token, session.refresh_token);
        return session.user;
      }
    }
    
    // Refresh token is also invalid or missing, clear invalid cookies
    await clearSessionCookies();
    return null;
  }

  return user;
}

export async function getServerSession() {
  const { accessToken, refreshToken } = await getSessionTokens();
  const supabase = await getServerSupabaseClient();

  if (!accessToken) {
    if (refreshToken) {
      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (!refreshError && session) {
        await setSessionCookies(session.access_token, session.refresh_token);
        return {
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          user: session.user,
        };
      }
    }
    return null;
  }

  // Verify access token with Supabase Auth
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  
  if (error || !user) {
    if (refreshToken) {
      const { data: { session }, error: refreshError } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (!refreshError && session) {
        await setSessionCookies(session.access_token, session.refresh_token);
        return {
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          user: session.user,
        };
      }
    }
    
    await clearSessionCookies();
    return null;
  }

  return { accessToken, refreshToken, user };
}
