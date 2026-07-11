/**
 * Translates Supabase authentication exceptions into friendly, user-readable feedback.
 */
export function getFriendlyErrorMessage(error: unknown): string {
  if (!error) return "An unexpected error occurred. Please try again.";

  let message = "";
  let status: number | undefined;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "object" && error !== null) {
    const errObj = error as Record<string, unknown>;
    message = typeof errObj.message === "string" ? errObj.message : String(error);
    status = typeof errObj.status === "number" ? errObj.status : undefined;
  } else {
    message = String(error);
  }

  // Rate Limiting
  if (status === 429 || message.toLowerCase().includes("rate limit") || message.toLowerCase().includes("too many requests")) {
    return "Too many attempts. Please wait a few minutes before trying again.";
  }

  // Credentials
  if (message.includes("Invalid login credentials") || message.toLowerCase().includes("invalid credentials")) {
    return "Incorrect email or password. Please verify your entries.";
  }

  // Email check
  if (message.includes("User already exists") || message.toLowerCase().includes("email already exists") || message.toLowerCase().includes("email in use")) {
    return "An account with this email address already exists.";
  }

  // Sane password
  if (message.toLowerCase().includes("password should be")) {
    return "Password does not meet security requirements.";
  }

  // Link expired
  if (message.toLowerCase().includes("token expired") || message.toLowerCase().includes("expired reset")) {
    return "The password reset link has expired. Please request a new one.";
  }

  // Email confirmation
  if (message.toLowerCase().includes("email not confirmed")) {
    return "Please confirm your email address before logging in.";
  }

  // Network problems
  if (message.toLowerCase().includes("fetch") || message.toLowerCase().includes("network")) {
    return "Network error. Please check your internet connection and try again.";
  }

  // Fallback
  return message || "An unexpected error occurred. Please try again.";
}
