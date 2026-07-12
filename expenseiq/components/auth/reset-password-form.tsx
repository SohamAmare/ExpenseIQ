"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { resetPasswordSchema } from "@/lib/auth/validation";
import { clearSessionAction } from "@/lib/auth/actions";
import { supabase } from "@/lib/auth/client";
import { ResetPasswordInput } from "@/types/auth";
import { PasswordInput } from "./password-input";
import { LoadingButton } from "./loading-button";
import { ValidationMessage } from "./validation-message";
import { AUTH_ROUTES } from "@/constants/auth";

export function ResetPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [successReset, setSuccessReset] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setLoading(true);
    setSuccessReset(false);
    try {
      // 1. Update user password directly using the client-side Supabase client instance
      // which automatically carries the recovery session from the URL hash.
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "Failed to update password");
        return;
      }

      // 2. Sign out on the client to destroy the active recovery session.
      await supabase.auth.signOut();

      // 3. Clear session cookies on the server.
      await clearSessionAction();

      setSuccessReset(true);
      toast.success("Password updated successfully! Redirecting to login...");
      setTimeout(() => {
        router.push(AUTH_ROUTES.LOGIN);
      }, 2000);
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {successReset ? (
        <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/50 text-xs text-text-secondary leading-relaxed animate-in fade-in duration-200">
          <p className="font-semibold text-status-info mb-1">Password Reset Complete</p>
          Your password has been updated. You can now log back in using your new credentials.
          <div className="mt-4 pt-4 border-t border-blue-100 flex justify-end">
            <Link
              href={AUTH_ROUTES.LOGIN}
              className="text-xs font-semibold text-brand-primary hover:underline"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* New Password field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary">New Password</label>
            <PasswordInput
              placeholder="••••••••"
              disabled={loading}
              error={!!errors.password}
              {...register("password")}
            />
            <ValidationMessage message={errors.password?.message} />
          </div>

          {/* Confirm Password field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary">Confirm New Password</label>
            <PasswordInput
              placeholder="••••••••"
              disabled={loading}
              error={!!errors.confirmPassword}
              {...register("confirmPassword")}
            />
            <ValidationMessage message={errors.confirmPassword?.message} />
          </div>

          {/* Submit Button */}
          <LoadingButton type="submit" loading={loading} className="w-full mt-2">
            Update Password
          </LoadingButton>
        </form>
      )}
    </div>
  );
}
