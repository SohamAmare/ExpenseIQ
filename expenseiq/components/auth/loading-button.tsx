import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading?: boolean;
  children: React.ReactNode;
}

export function LoadingButton({ loading, children, className, disabled, ...props }: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={`relative flex items-center justify-center gap-2 ${className || ""}`}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin shrink-0" />}
      {children}
    </Button>
  );
}
