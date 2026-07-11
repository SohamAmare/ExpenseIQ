import React from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";
import { AUTH_ROUTES } from "@/constants/auth";

export const metadata = {
  title: "Create Account - ExpenseIQ",
  description: "Register a new account on ExpenseIQ to manage your finances.",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthCard
        title="Create Account"
        description="Fill out the details below to register your dashboard workspace."
        footer={
          <p className="text-text-secondary">
            Already have an account?{" "}
            <Link
              href={AUTH_ROUTES.LOGIN}
              className="font-semibold text-brand-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        }
      >
        <RegisterForm />
      </AuthCard>
    </AuthLayout>
  );
}
