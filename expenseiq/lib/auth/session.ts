import { cookies } from "next/headers";
import { AUTH_COOKIES } from "@/constants/auth";

export async function setSessionCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  // Set access token cookie (typically expires in 1 hour in Supabase)
  cookieStore.set(AUTH_COOKIES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  // Set refresh token cookie (typically expires in 30 days)
  cookieStore.set(AUTH_COOKIES.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearSessionCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIES.ACCESS_TOKEN);
  cookieStore.delete(AUTH_COOKIES.REFRESH_TOKEN);
}

export async function getSessionTokens() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(AUTH_COOKIES.ACCESS_TOKEN)?.value;
  const refreshToken = cookieStore.get(AUTH_COOKIES.REFRESH_TOKEN)?.value;
  return { accessToken, refreshToken };
}
