"use client";

import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/auth/client";
import { syncSessionAction, clearSessionAction } from "@/lib/auth/actions";
import { AUTH_ROUTES } from "@/constants/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetches initial active session from Supabase Client SDK
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        if (initialSession) {
          await syncSessionAction(initialSession.access_token, initialSession.refresh_token);
        } else {
          await clearSessionAction();
        }
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
