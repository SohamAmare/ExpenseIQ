import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <Card className="border border-neutral-border shadow-xs bg-white overflow-hidden">
      <CardHeader className="space-y-1 pb-4 pt-6">
        <CardTitle className="text-xl font-bold tracking-tight text-text-primary">{title}</CardTitle>
        <CardDescription className="text-xs text-text-secondary leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="py-4 text-center justify-center border-t border-neutral-border bg-neutral-secondary-bg/30 text-xs">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
