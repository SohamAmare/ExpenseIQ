"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { registerSchema } from "@/lib/auth/validation";
import { registerAction } from "@/lib/auth/actions";
import { RegisterInput } from "@/types/auth";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./password-input";
import { LoadingButton } from "./loading-button";
import { ValidationMessage } from "./validation-message";
import { AUTH_ROUTES } from "@/constants/auth";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [successInfo, setSuccessInfo] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password field to feed into strength indicator
  const watchedPassword = watch("password");
  useEffect(() => {
    setPasswordValue(watchedPassword || "");
  }, [watchedPassword]);

  // Compute password criteria validation
  const criteria = {
    length: passwordValue.length >= 8,
    uppercase: /[A-Z]/.test(passwordValue),
    lowercase: /[a-z]/.test(passwordValue),
    number: /[0-9]/.test(passwordValue),
    special: /[^a-zA-Z0-9]/.test(passwordValue),
  };

  const metCount = Object.values(criteria).filter(Boolean).length;

  let strengthLabel = "Weak";
  let strengthColor = "bg-status-error";
  let strengthWidth = "w-1/3";

  if (metCount >= 5) {
    strengthLabel = "Strong";
    strengthColor = "bg-brand-primary";
    strengthWidth = "w-full";
  } else if (metCount >= 3) {
    strengthLabel = "Medium";
    strengthColor = "bg-status-warning";
    strengthWidth = "w-2/3";
  } else if (metCount === 0) {
    strengthWidth = "w-0";
  }

  const onSubmit = async (data: RegisterInput) => {
    setLoading(true);
    setSuccessInfo(null);
    try {
      const result = await registerAction(data);
      if (result.success) {
        if (result.data?.emailConfirmationSent) {
          setSuccessInfo(
            "Account created! Please check your email inbox to verify your account before logging in."
          );
          toast.success("Account created successfully!");
        } else {
          toast.success("Successfully registered!");
          router.push(AUTH_ROUTES.DASHBOARD);
          router.refresh();
        }
      } else {
        toast.error(result.error || "Registration failed");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {successInfo ? (
        <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/50 text-xs text-text-secondary leading-relaxed">
          <p className="font-semibold text-status-info mb-1">Verify Your Email</p>
          {successInfo}
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
          {/* Full Name field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary">Full Name</label>
            <Input
              type="text"
              placeholder="Soham Amare"
              disabled={loading}
              className={errors.fullName ? "border-status-error focus-visible:ring-status-error/20" : ""}
              {...register("fullName")}
            />
            <ValidationMessage message={errors.fullName?.message} />
          </div>

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

          {/* Password field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary">Password</label>
            <PasswordInput
              placeholder="••••••••"
              disabled={loading}
              error={!!errors.password}
              {...register("password")}
            />
            <ValidationMessage message={errors.password?.message} />

            {/* Real-time Password Strength Meter */}
            {passwordValue && (
              <div className="space-y-2 pt-1 animate-in fade-in duration-200">
                <div className="flex justify-between items-center text-[10px] font-semibold text-text-muted">
                  <span>Strength: {strengthLabel}</span>
                  <span>{metCount}/5 criteria</span>
                </div>
                <div className="h-1 w-full bg-neutral-secondary-bg rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${strengthWidth} ${strengthColor}`} />
                </div>

                {/* Requirements checkmarks list */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-text-secondary pt-1 bg-neutral-secondary-bg/20 p-2 rounded-md border border-neutral-border/30">
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-block size-1.5 rounded-full ${criteria.length ? "bg-brand-primary" : "bg-text-disabled"}`} />
                    <span className={criteria.length ? "text-brand-primary font-medium" : "text-text-muted"}>Min 8 characters</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-block size-1.5 rounded-full ${criteria.uppercase ? "bg-brand-primary" : "bg-text-disabled"}`} />
                    <span className={criteria.uppercase ? "text-brand-primary font-medium" : "text-text-muted"}>Uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-block size-1.5 rounded-full ${criteria.lowercase ? "bg-brand-primary" : "bg-text-disabled"}`} />
                    <span className={criteria.lowercase ? "text-brand-primary font-medium" : "text-text-muted"}>Lowercase letter</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-block size-1.5 rounded-full ${criteria.number ? "bg-brand-primary" : "bg-text-disabled"}`} />
                    <span className={criteria.number ? "text-brand-primary font-medium" : "text-text-muted"}>Number entry</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <span className={`inline-block size-1.5 rounded-full ${criteria.special ? "bg-brand-primary" : "bg-text-disabled"}`} />
                    <span className={criteria.special ? "text-brand-primary font-medium" : "text-text-muted"}>Special character (e.g. @, $, !, %)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-text-primary">Confirm Password</label>
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
            Create Account
          </LoadingButton>
        </form>
      )}
    </div>
  );
}
