import React from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AUTH_ROUTES } from "@/constants/auth";

export const metadata = {
  title: "Recover Password - ExpenseIQ",
  description: "Reset your ExpenseIQ account password.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard
        title="Recover Password"
        description="Enter your registered email address and we will send you a password reset link."
        footer={
          <p className="text-text-secondary">
            Remembered your password?{" "}
            <Link
              href={AUTH_ROUTES.LOGIN}
              className="font-semibold text-brand-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        }
      >
        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}
