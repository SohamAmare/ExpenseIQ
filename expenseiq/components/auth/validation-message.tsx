import React from "react";
import { XCircle } from "lucide-react";

interface ValidationMessageProps {
  message?: string;
}

export function ValidationMessage({ message }: ValidationMessageProps) {
  if (!message) return null;
  return (
    <p className="text-[11px] font-medium text-status-error flex items-center gap-1 mt-1 animate-in fade-in-50 duration-150">
      <XCircle className="size-3 shrink-0" />
      {message}
    </p>
  );
}
