"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb() {
  const pathname = usePathname();
  // Splits path to extract router coordinates
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-text-secondary font-semibold">
      <Link href="/dashboard" className="hover:text-text-primary transition-colors flex items-center gap-1">
        <Home className="size-3.5" />
      </Link>
      {segments.map((segment, index) => {
        const url = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        // Turn kebab-case paths (like 'savings-goals') into readable layouts
        const formattedSegment = segment.replace(/-/g, " ");

        return (
          <React.Fragment key={url}>
            <ChevronRight className="size-3 text-text-muted shrink-0" />
            {isLast ? (
              <span className="font-bold text-text-primary capitalize tracking-wide">{formattedSegment}</span>
            ) : (
              <Link href={url} className="hover:text-text-primary transition-colors capitalize">
                {formattedSegment}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
