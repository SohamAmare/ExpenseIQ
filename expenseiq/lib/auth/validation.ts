import { z } from "zod";
import { PASSWORD_RULES, NAME_RULES } from "@/constants/auth";

// Full Name regex: letters, spaces, hyphens
const nameRegex = /^[a-zA-Z\s-]+$/;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(NAME_RULES.MIN_LENGTH, `Name must be at least ${NAME_RULES.MIN_LENGTH} characters`)
      .max(NAME_RULES.MAX_LENGTH, `Name must be at most ${NAME_RULES.MAX_LENGTH} characters`)
      .regex(nameRegex, "Full name can only contain letters, spaces, and hyphens")
      .trim(),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format")
      .trim()
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_RULES.MIN_LENGTH, `Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`)
      .max(PASSWORD_RULES.MAX_LENGTH, `Password must be at most ${PASSWORD_RULES.MAX_LENGTH} characters`)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .trim()
    .toLowerCase(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(PASSWORD_RULES.MIN_LENGTH, `Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`)
      .max(PASSWORD_RULES.MAX_LENGTH, `Password must be at most ${PASSWORD_RULES.MAX_LENGTH} characters`)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
