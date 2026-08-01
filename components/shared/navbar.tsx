"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Command,
  LayoutDashboard,
  Folder,
  BarChart3,
  Users,
  User,
  Settings,
  CreditCard,
  LogOut,
  Menu,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/service/logout";
import { useEffect, useState } from "react";
import { toast } from "sonner";


type NavLink = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: Folder },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Team", href: "/team", icon: Users },
];

const userMenuItems: NavLink[] = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Billing", href: "/billing", icon: CreditCard },
];

type IUser = {
  success: boolean;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
    meta?: {
      profile: IUser["data"]["profile"];
    };
  };
};

type NavbarProps = {
  user?: IUser;
};

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()
  const handleUserMenuAction = async (action: string) => {
    console.log(`user menu action : ${action}`);

    if (action === "logout") {
      await logout();
      
      toast.success("User logged out successfully");
      router.push("/login")
    }
  };

  

  const pathname = usePathname();
  console.log("navbar user", user);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Command className="h-4 w-4" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            NextJS Press
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: mobile menu + user dropdown */}
        <div className="flex items-center gap-2">
          {/* Mobile nav links */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User dropdown */}
         {
          user?.success ? (          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Open user menu"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/thoughtful-artist.png" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex flex-col gap-0.5 px-1.5 py-1">
                <span className="text-sm font-medium text-foreground">
                  {user?.data?.profile?.name}
                </span>

                <span className="text-xs font-normal text-muted-foreground">
                  {user?.data?.profile?.email}
                </span>
              </div>
              <DropdownMenuSeparator />
              {userMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                );
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await handleUserMenuAction("logout");
                }}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>) : <Link href={"/login"}>
        <Button>   Login </Button>
        </Link>
         }
        </div>
      </div>
    </header>
  );
}
