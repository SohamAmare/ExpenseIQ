"use client";

import React from "react";
import Link from "next/link";
import { User, Settings, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserProfileMenu() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const getInitials = (email: string) => {
    if (!email) return "U";
    return email.split("@")[0]?.substring(0, 2).toUpperCase() || "U";
  };

  const userEmail = user?.email || "user@expenseiq.com";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="flex items-center justify-center size-9 rounded-full bg-neutral-secondary-bg hover:ring-2 hover:ring-brand-primary/20 transition-all duration-200 outline-none">
            <Avatar className="size-8">
              <AvatarFallback className="bg-brand-primary/10 text-brand-primary font-bold text-xs">
                {getInitials(userEmail)}
              </AvatarFallback>
            </Avatar>
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-bold flex flex-col px-2.5 py-2">
            <span className="text-xs text-text-primary truncate">Active Workspace</span>
            <span className="text-[10px] font-normal text-text-muted truncate">{userEmail}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            render={
              <Link href="/profile" className="flex w-full items-center gap-2">
                <User className="size-4 text-text-secondary" />
                <span>Profile Settings</span>
              </Link>
            }
          />

          <DropdownMenuItem
            render={
              <Link href="/settings" className="flex w-full items-center gap-2">
                <Settings className="size-4 text-text-secondary" />
                <span>System Settings</span>
              </Link>
            }
          />

          <DropdownMenuItem onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? (
              <div className="flex w-full items-center gap-2">
                <Sun className="size-4 text-text-secondary" />
                <span>Light Theme</span>
              </div>
            ) : (
              <div className="flex w-full items-center gap-2">
                <Moon className="size-4 text-text-secondary" />
                <span>Dark Theme</span>
              </div>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            variant="destructive"
            onClick={logout}
          >
            <LogOut className="size-4" />
            <span>Log out Session</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
