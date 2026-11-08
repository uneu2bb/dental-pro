"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useRouter } from "next/navigation";

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
    <aside className="hidden lg:flex lg:w-64 lg:flex-col border-l bg-card/80 backdrop-blur-sm">
      <div className="flex h-16 items-center gap-3 border-b px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-bold text-white shadow-md shadow-cyan-500/20">
          D
        </div>
        <div>
          <h1 className="font-bold leading-none tracking-tight">DENTAL PRO</h1>
          <p className="text-[11px] text-muted-foreground">نظام إدارة العيادات</p>
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
                  ? "bg-gradient-to-l from-cyan-500/15 to-blue-600/10 text-cyan-700 dark:text-cyan-300 shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className={cn("h-4.5 w-4.5", isActive && "text-cyan-600 dark:text-cyan-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </Button>
      </div>
    </aside>
  );
}
