"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/5 bg-[#0a0a0a]/80 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden text-white/60">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
          <input
            type="search"
            placeholder="بحث عن مريض، موعد..."
            className="h-9 w-64 rounded-full border border-white/10 bg-white/5 pr-10 pl-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-amber-500/40"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative text-white/60">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 left-1.5 h-2 w-2 rounded-full bg-amber-400" />
        </Button>

        <div className="mr-2 flex items-center gap-3 border-r border-white/10 pr-4">
          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-white">مدير العيادة</p>
            <p className="text-xs text-white/40">clinic_admin</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full gold-gradient text-sm font-bold text-black">
            م
          </div>
        </div>
      </div>
    </header>
  );
}
