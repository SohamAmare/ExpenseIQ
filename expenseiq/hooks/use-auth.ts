"use client";

import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/auth/client";
import { syncSessionAction, clearSessionAction, getServerSessionAction } from "@/lib/auth/actions";
import { AUTH_ROUTES } from "@/constants/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches initial active session from Supabase Client SDK or Server-Assisted Sync
    const getInitialSession = async () => {
      try {
        // 1. Check browser session
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
          // Sync with server cookies
          await syncSessionAction(initialSession.access_token, initialSession.refresh_token);
          setLoading(false);
          return;
        }

        // 2. If browser session is missing, verify whether a valid server-side session exists
        const serverResult = await getServerSessionAction();
        if (
          serverResult.success &&
          serverResult.session &&
          serverResult.session.access_token &&
          serverResult.session.refresh_token
        ) {
          // Restore browser client using tokens from cookies
          const { data: { session: restoredSession }, error } = await supabase.auth.setSession({
            access_token: serverResult.session.access_token,
            refresh_token: serverResult.session.refresh_token,
          });

          if (!error && restoredSession) {
            setSession(restoredSession);
            setUser(restoredSession.user);
            setLoading(false);
            return;
          }
        }

        // 3. Only if both report no valid session, clean up
        setSession(null);
        setUser(null);
        await clearSessionAction();
      } catch {
        // Silently capture errors
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen to Supabase authorization status events (Logins, Refresh, Signout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);

      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        if (currentSession) {
          await syncSessionAction(currentSession.access_token, currentSession.refresh_token);
        }
      } else if (event === "SIGNED_OUT") {
        await clearSessionAction();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      await clearSessionAction();
      window.location.href = AUTH_ROUTES.LOGIN;
    } catch {
      setLoading(false);
    }
  };

  return {
    user,
    session,
    loading,
    logout,
  };
}
