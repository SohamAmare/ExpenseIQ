import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { AUTH_COOKIES, AUTH_ROUTES } from "@/constants/auth";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kaqjtjsfldboposemqci.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_tmQm8mpC6yN0RWjtswFT-w_eWK2DcRb";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Bypass redirection checks for POST, React Server Components (RSC), and Server Action updates
  const isPost = request.method === "POST";
  const isRsc = request.headers.has("rsc");
  const isAction = request.headers.has("next-action");

  if (isPost || isRsc || isAction) {
    return NextResponse.next();
  }

  // Extract access token cookie
  let accessToken = request.cookies.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;

  const isGuestRoute =
    pathname.startsWith(AUTH_ROUTES.LOGIN) ||
    pathname.startsWith(AUTH_ROUTES.REGISTER) ||
    pathname.startsWith(AUTH_ROUTES.FORGOT_PASSWORD) ||
    pathname.startsWith(AUTH_ROUTES.RESET_PASSWORD);

  // Protected paths: Dashboard and any child pages under /dashboard
  const isProtectedRoute = pathname.startsWith(AUTH_ROUTES.DASHBOARD);

  let response = NextResponse.next();
  let sessionRefreshed = false;

  // Auto-refresh the session if access token is missing/expired, but refresh token is present
  if (!accessToken && refreshToken) {
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      });

      const { data: { session }, error } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (!error && session) {
        accessToken = session.access_token;
        sessionRefreshed = true;
        
        // Save new session tokens to cookie response
        response.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60, // 1 hour
        });
        
        response.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, session.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // 30 days
        });
      }
    } catch {
      // Fail silently and treat the request as unauthenticated
    }
  }

  // Case 0: Edge redirect for the index route (/)
  if (pathname === "/") {
    const targetRoute = accessToken ? AUTH_ROUTES.DASHBOARD : AUTH_ROUTES.LOGIN;
    const redirectResponse = NextResponse.redirect(new URL(targetRoute, request.url));
    if (sessionRefreshed) {
      const at = response.cookies.get(AUTH_COOKIES.ACCESS_TOKEN);
      const rt = response.cookies.get(AUTH_COOKIES.REFRESH_TOKEN);
      if (at) redirectResponse.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, at.value, at);
      if (rt) redirectResponse.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, rt.value, rt);
    }
    return redirectResponse;
  }

  // Case 1: Unauthenticated guests trying to access protected dashboards
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL(AUTH_ROUTES.LOGIN, request.url);
    // Append the redirect URL parameter to return back after login
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Case 2: Authenticated users trying to access login, sign up, or recover password forms
  if (isGuestRoute && accessToken) {
    const dashboardUrl = new URL(AUTH_ROUTES.DASHBOARD, request.url);
    const redirectResponse = NextResponse.redirect(dashboardUrl);
    if (sessionRefreshed) {
      const at = response.cookies.get(AUTH_COOKIES.ACCESS_TOKEN);
      const rt = response.cookies.get(AUTH_COOKIES.REFRESH_TOKEN);
      if (at) redirectResponse.cookies.set(AUTH_COOKIES.ACCESS_TOKEN, at.value, at);
      if (rt) redirectResponse.cookies.set(AUTH_COOKIES.REFRESH_TOKEN, rt.value, rt);
    }
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Matches all routes except static files, assets, API routes, and favicon:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - next.svg, vercel.svg (images)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|next.svg|vercel.svg).*)",
  ],
};
