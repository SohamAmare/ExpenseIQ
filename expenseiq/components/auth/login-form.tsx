"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "@/lib/auth/validation";
import { loginAction } from "@/lib/auth/actions";
import { supabase } from "@/lib/auth/client";
import { LoginInput } from "@/types/auth";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./password-input";
import { LoadingButton } from "./loading-button";
import { ValidationMessage } from "./validation-message";
import { AUTH_ROUTES } from "@/constants/auth";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    try {
      const result = await loginAction(data);
      if (result.success) {
        if (result.session) {
          await supabase.auth.setSession({
            access_token: result.session.access_token,
            refresh_token: result.session.refresh_token,
          });
        }
        toast.success("Successfully logged in!");
        router.push(AUTH_ROUTES.DASHBOARD);
        router.refresh();
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
      {/* Email input field */}
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

      {/* Password input field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-text-primary">Password</label>
          <Link
            href={AUTH_ROUTES.FORGOT_PASSWORD}
            className="text-[11px] font-semibold text-brand-primary hover:underline hover:text-brand-primary-hover"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          placeholder="••••••••"
          disabled={loading}
          error={!!errors.password}
          {...register("password")}
        />
        <ValidationMessage message={errors.password?.message} />
      </div>

      {/* Primary Submit Button */}
      <LoadingButton type="submit" loading={loading} className="w-full mt-2">
        Sign In to Account
      </LoadingButton>
    </form>
  );
}
