"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          🌸 BloomPro
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-muted-foreground sm:flex">
          <Link
            href="/designers"
            className={pathname.startsWith("/designers") ? "text-foreground" : "hover:text-foreground transition-colors"}
          >
            Find Designers
          </Link>
          <Link
            href="/dashboard/designer"
            className={pathname.startsWith("/dashboard/designer") ? "text-foreground" : "hover:text-foreground transition-colors"}
          >
            For Designers
          </Link>
        </nav>
        <div className="flex gap-2">
          <Link href="/auth/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            Log in
          </Link>
          <Link href="/auth/signup" className={cn(buttonVariants({ size: "sm" }))}>
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
