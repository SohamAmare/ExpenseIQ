import { z } from "zod";
import { User, Session } from "@supabase/supabase-js";
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from "@/lib/auth/validation";

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  data?: unknown;
}
