import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIES, AUTH_ROUTES } from "@/constants/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Bypass redirection checks for POST, React Server Components (RSC), and Server Action updates
  const isPost = request.method === "POST";
  const isRsc = request.headers.has("rsc");
  const isAction = request.headers.has("next-action");

  if (isPost || isRsc || isAction) {
    return NextResponse.next();
  }

  // Extract access token cookie
  const accessToken = request.cookies.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;

  const isGuestRoute =
    pathname.startsWith(AUTH_ROUTES.LOGIN) ||
    pathname.startsWith(AUTH_ROUTES.REGISTER) ||
    pathname.startsWith(AUTH_ROUTES.FORGOT_PASSWORD) ||
    pathname.startsWith(AUTH_ROUTES.RESET_PASSWORD);

  // Protected paths: Dashboard and any child pages under /dashboard
  const isProtectedRoute = pathname.startsWith(AUTH_ROUTES.DASHBOARD);

  // Case 0: Edge redirect for the index route (/)
  if (pathname === "/") {
    const targetRoute = accessToken ? AUTH_ROUTES.DASHBOARD : AUTH_ROUTES.LOGIN;
    return NextResponse.redirect(new URL(targetRoute, request.url));
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
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
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
