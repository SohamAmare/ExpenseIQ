import React from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AUTH_ROUTES } from "@/constants/auth";

export const metadata = {
  title: "Update Password - ExpenseIQ",
  description: "Set a new password for your ExpenseIQ account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard
        title="Update Password"
        description="Please choose a strong, secure new password for your account."
        footer={
          <p className="text-text-secondary">
            Never mind?{" "}
            <Link
              href={AUTH_ROUTES.LOGIN}
              className="font-semibold text-brand-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        }
      >
        <ResetPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}
