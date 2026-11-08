"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Stethoscope,
  FileText,
  Wallet,
  Package,
  BarChart3,
  Settings,
  Smile,
  ClipboardList,
  LogOut,
  UserCog,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const navigation = [
  { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
  { name: "المرضى", href: "/patients", icon: Users },
  { name: "المواعيد", href: "/appointments", icon: Calendar },
  { name: "المخطط السني", href: "/dental-chart", icon: Smile },
  { name: "الخطط العلاجية", href: "/treatment-plans", icon: ClipboardList },
  { name: "العلاجات", href: "/treatments", icon: Stethoscope },
  { name: "الفواتير", href: "/invoices", icon: FileText },
  { name: "المحاسبة", href: "/accounting", icon: Wallet },
  { name: "المخزون", href: "/inventory", icon: Package },
  { name: "التقارير", href: "/reports", icon: BarChart3 },
  { name: "الحسابات", href: "/users", icon: UserCog },
  { name: "الإعدادات", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col border-l border-white/5 bg-[#0a0a0a]">
      <div className="flex h-16 items-center gap-3 border-b border-white/5 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl gold-gradient text-lg font-bold text-black">
          D
        </div>
        <div>
          <h1 className="font-bold leading-none tracking-tight text-white">DENTAL PRO</h1>
          <p className="text-[11px] text-white/40">نظام إدارة العيادات</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-amber-500/15 text-amber-300"
                  : "text-white/50 hover:bg-white/5 hover:text-white/80"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive && "text-amber-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-white/40 hover:bg-red-500/10 hover:text-red-400"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </Button>
      </div>
    </aside>
  );
}
