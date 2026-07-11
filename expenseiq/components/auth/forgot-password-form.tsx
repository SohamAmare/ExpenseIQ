"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { forgotPasswordSchema } from "@/lib/auth/validation";
import { forgotPasswordAction } from "@/lib/auth/actions";
import { ForgotPasswordInput } from "@/types/auth";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "./loading-button";
import { ValidationMessage } from "./validation-message";
import { AUTH_ROUTES } from "@/constants/auth";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [successSent, setSuccessSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setLoading(true);
    setSuccessSent(false);
    try {
      const result = await forgotPasswordAction(data);
      if (result.success) {
        setSuccessSent(true);
        toast.success("Reset link sent!");
      } else {
        toast.error(result.error || "Failed to send reset link");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {successSent ? (
        <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/50 text-xs text-text-secondary leading-relaxed animate-in fade-in duration-200">
          <p className="font-semibold text-status-info mb-1">Check Your Email</p>
          We have sent a secure recovery link to your email address. Please click the link inside to update your password.
          <div className="mt-4 pt-4 border-t border-blue-100 flex justify-end">
            <Link
              href={AUTH_ROUTES.LOGIN}
              className="text-xs font-semibold text-brand-primary hover:underline"
            >
              Return to Login
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary">Email Address</label>
            <Input
              type="email"
              placeholder="name@domain.com"
              disabled={loading}
              className={errors.email ? "border-status-error focus-visible:ring-status-error/20" : ""}
              {...register("email")}
            />
            <ValidationMessage message={errors.email?.message} />
          </div>

          {/* Submit Button */}
          <LoadingButton type="submit" loading={loading} className="w-full mt-2">
            Send Recovery Link
          </LoadingButton>

          {/* Back link */}
          <div className="text-center pt-2">
            <Link
              href={AUTH_ROUTES.LOGIN}
              className="text-xs font-semibold text-text-secondary hover:text-text-primary hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
