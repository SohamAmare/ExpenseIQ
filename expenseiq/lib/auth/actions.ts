"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSupabaseClient, getServerSession } from "./server";
import { setSessionCookies, clearSessionCookies } from "./session";
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from "./validation";
import { getFriendlyErrorMessage } from "./error-handler";
import { AUTH_ROUTES } from "@/constants/auth";

export async function loginAction(formData: unknown) {
  try {
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid input";
      return { success: false, error: errorMsg };
    }

    const { email, password } = validation.data;
    const supabase = await getServerSupabaseClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: getFriendlyErrorMessage(error) };
    }

    if (data.session) {
      await setSessionCookies(data.session.access_token, data.session.refresh_token);
      return {
        success: true,
        session: {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        },
      };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: getFriendlyErrorMessage(err) };
  }
}

export async function registerAction(formData: unknown) {
  try {
    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid input";
      return { success: false, error: errorMsg };
    }

    const { fullName, email, password } = validation.data;
    const supabase = await getServerSupabaseClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { success: false, error: getFriendlyErrorMessage(error) };
    }

    // If session is returned (immediate login enabled on Supabase)
    if (data.session) {
      await setSessionCookies(data.session.access_token, data.session.refresh_token);
      return {
        success: true,
        data: {
          sessionActive: true,
          session: {
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
          },
        },
      };
    }

    return {
      success: true,
      data: {
        sessionActive: false,
        emailConfirmationSent: true,
      },
    };
  } catch (err) {
    return { success: false, error: getFriendlyErrorMessage(err) };
  }
}

export async function logoutAction() {
  try {
    const supabase = await getServerSupabaseClient();
    await supabase.auth.signOut();
  } catch {
    // Silently continue to clear cookies even if API call fails
  } finally {
    await clearSessionCookies();
  }
  
  revalidatePath("/", "layout");
  redirect(AUTH_ROUTES.LOGIN);
}

export async function forgotPasswordAction(formData: unknown) {
  try {
    const validation = forgotPasswordSchema.safeParse(formData);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid input";
      return { success: false, error: errorMsg };
    }

    const { email } = validation.data;
    const supabase = await getServerSupabaseClient();
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    
    // Direct link to the reset password page containing recovery tokens
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}${AUTH_ROUTES.RESET_PASSWORD}`,
    });

    if (error) {
      return { success: false, error: getFriendlyErrorMessage(error) };
    }

    return { success: true };
  } catch (err) {
    return { success: false, error: getFriendlyErrorMessage(err) };
  }
}

export async function resetPasswordAction(formData: unknown) {
  try {
    const validation = resetPasswordSchema.safeParse(formData);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid input";
      return { success: false, error: errorMsg };
    }

    const { password } = validation.data;
    const supabase = await getServerSupabaseClient();

    // Updates password for the currently logged-in recovery session user
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return { success: false, error: getFriendlyErrorMessage(error) };
    }

    // Force sign out to clean session, forcing login with the new credentials
    await supabase.auth.signOut();
    await clearSessionCookies();

    return { success: true };
  } catch (err) {
    return { success: false, error: getFriendlyErrorMessage(err) };
  }
}

export async function syncSessionAction(accessToken: string, refreshToken: string) {
  await setSessionCookies(accessToken, refreshToken);
  return { success: true };
}

export async function clearSessionAction() {
  await clearSessionCookies();
  return { success: true };
}

export async function getServerSessionAction() {
  try {
    const session = await getServerSession();
    if (session) {
      return {
        success: true,
        session: {
          access_token: session.accessToken,
          refresh_token: session.refreshToken,
        },
        user: session.user,
      };
    }
    return { success: false };
  } catch {
    return { success: false };
  }
}
