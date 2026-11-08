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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  { name: "الإعدادات", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col border-l bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
          D
        </div>
        <div>
          <h1 className="font-bold text-lg leading-none">DENTAL PRO</h1>
          <p className="text-xs text-muted-foreground">نظام إدارة العيادات</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
          <LogOut className="h-5 w-5" />
          تسجيل الخروج
        </Button>
      </div>
    </aside>
  );
}
