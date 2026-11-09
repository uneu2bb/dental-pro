"use client";

import { Bell, Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4 md:px-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="بحث عن مريض، موعد، فاتورة..."
            className="h-9 w-72 rounded-lg border bg-background pr-10 pl-3 text-sm outline-none focus:ring-2 focus:ring-[hsl(var(--teal))]/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition dark:rotate-0 dark:scale-100" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--teal))]" />
        </Button>
        <div className="mr-2 flex items-center gap-2.5 border-r pr-3">
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium">مدير العيادة</p>
            <p className="text-[11px] text-muted-foreground">clinic_admin</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-xs font-semibold text-white">
            م
          </div>
        </div>
      </div>
    </header>
  );
}
