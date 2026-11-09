"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  CalendarDays,
  FolderOpen,
  Smile,
  ClipboardList,
  Stethoscope,
  UserRound,
  UserCog,
  FileText,
  CreditCard,
  Wallet,
  Receipt,
  Package,
  FlaskConical,
  BarChart3,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const groups = [
  {
    label: "الرئيسية",
    items: [
      { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "العيادة",
    items: [
      { name: "المرضى", href: "/patients", icon: Users },
      { name: "المواعيد", href: "/appointments", icon: Calendar },
      { name: "التقويم", href: "/calendar", icon: CalendarDays },
      { name: "الملفات الطبية", href: "/records", icon: FolderOpen },
      { name: "المخطط السني", href: "/dental-chart", icon: Smile },
      { name: "الخطط العلاجية", href: "/treatment-plans", icon: ClipboardList },
      { name: "الخدمات", href: "/treatments", icon: Stethoscope },
    ],
  },
  {
    label: "الفريق",
    items: [
      { name: "الأطباء", href: "/doctors", icon: UserRound },
      { name: "الموظفون", href: "/users", icon: UserCog },
    ],
  },
  {
    label: "المالية",
    items: [
      { name: "الفواتير", href: "/invoices", icon: FileText },
      { name: "المدفوعات", href: "/payments", icon: CreditCard },
      { name: "المحاسبة", href: "/finance", icon: Wallet },
      { name: "المصاريف", href: "/expenses", icon: Receipt },
    ],
  },
  {
    label: "التشغيل",
    items: [
      { name: "المخزون", href: "/inventory", icon: Package },
      { name: "المختبرات", href: "/labs", icon: FlaskConical },
      { name: "التقارير", href: "/reports", icon: BarChart3 },
      { name: "الإشعارات", href: "/notifications", icon: Bell },
      { name: "الإعدادات", href: "/settings", icon: Settings },
    ],
  },
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
    <aside className="hidden w-64 shrink-0 flex-col border-l bg-[hsl(var(--sidebar))] text-[hsl(var(--sidebar-fg))] lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--teal))] text-sm font-bold text-white">
          D
        </div>
        <div>
          <h1 className="text-sm font-bold leading-none text-white">DENTAL PRO</h1>
          <p className="mt-0.5 text-[10px] text-white/50">إدارة عيادات الأسنان</p>
        </div>
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto p-3">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-wider text-white/35">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors",
                      active
                        ? "bg-[hsl(var(--teal))] text-white"
                        : "text-white/65 hover:bg-white/8 hover:text-white"
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-white/50 transition hover:bg-white/8 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}
