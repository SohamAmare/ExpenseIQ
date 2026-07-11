"use client";

import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Binds standard Ctrl+K and Cmd+K hooks to focus search input
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-[180px] md:max-w-[280px] animate-in fade-in duration-200">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-text-muted pointer-events-none" />
      <Input
        ref={searchInputRef}
        type="search"
        placeholder="Search ledgers... (Ctrl + K)"
        className="w-full pl-9 pr-12 text-xs h-9 bg-neutral-secondary-bg border-neutral-border focus-visible:bg-white focus-visible:ring-brand-primary/20 transition-all duration-200"
      />
      <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden md:inline-flex h-5 select-none items-center gap-0.5 rounded border border-neutral-border bg-white px-1.5 font-mono text-[9px] font-semibold text-text-muted shadow-2xs">
        <span className="text-[8px]">⌘</span>K
      </kbd>
    </div>
  );
}
