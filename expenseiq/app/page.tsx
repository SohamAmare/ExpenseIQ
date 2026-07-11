import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth/server";
import { AUTH_ROUTES } from "@/constants/auth";

export const metadata = {
  title: "ExpenseIQ",
  description: "AI-Powered Financial Operating System.",
};

export default async function IndexPage() {
  const user = await getAuthenticatedUser();
  if (user) {
    redirect(AUTH_ROUTES.DASHBOARD);
  } else {
    redirect(AUTH_ROUTES.LOGIN);
  }
}
