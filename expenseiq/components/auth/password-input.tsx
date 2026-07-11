import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordInputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

export function PasswordInput({ className, error, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <Input
        type={showPassword ? "text" : "password"}
        className={`pr-10 ${error ? "border-status-error focus-visible:ring-status-error/20" : ""} ${className || ""}`}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={toggleVisibility}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary h-6 w-6 rounded-md"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? (
          <EyeOff className="size-4" />
        ) : (
          <Eye className="size-4" />
        )}
      </Button>
    </div>
  );
}
