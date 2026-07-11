import React from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { AUTH_ROUTES } from "@/constants/auth";

export const metadata = {
  title: "Sign In - ExpenseIQ",
  description: "Sign in to your ExpenseIQ account to manage your cash ledgers.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthCard
        title="Sign In"
        description="Enter your email and password below to access your workspace."
        footer={
          <p className="text-text-secondary">
            Don&apos;t have an account?{" "}
            <Link
              href={AUTH_ROUTES.REGISTER}
              className="font-semibold text-brand-primary hover:underline"
            >
              Create one
            </Link>
          </p>
        }
      >
        <LoginForm />
      </AuthCard>
    </AuthLayout>
  );
}
