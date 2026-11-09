import {
  Users,
  UserPlus,
  Calendar,
  CalendarCheck,
  Stethoscope,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Activity,
  Package,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "إجمالي المرضى", value: "—", sub: "من قاعدة البيانات", icon: Users },
  { title: "مرضى جدد", value: "—", sub: "هذا الشهر", icon: UserPlus },
  { title: "مواعيد اليوم", value: "—", sub: "اليوم", icon: Calendar },
  { title: "قادمة", value: "—", sub: "7 أيام", icon: CalendarCheck },
  { title: "علاجات منجزة", value: "—", sub: "هذا الشهر", icon: Stethoscope },
  { title: "إيرادات اليوم", value: "—", sub: "USD", icon: DollarSign },
  { title: "إيرادات الشهر", value: "—", sub: "USD", icon: TrendingUp },
  { title: "ديون المرضى", value: "—", sub: "متبقي", icon: AlertCircle },
  { title: "صافي الربح", value: "—", sub: "تقديري", icon: Activity },
  { title: "تنبيهات مخزون", value: "—", sub: "منخفض", icon: Package },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--primary))]">
          لوحة التحكم
        </h1>
        <p className="text-sm text-muted-foreground">مركز قيادة العيادة — نظرة يومية</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((s) => (
          <Card key={s.title} className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {s.title}
              </CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--mint))] text-[hsl(var(--teal))]">
                <s.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="stat-value">{s.value}</div>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-base">مواعيد اليوم</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Calendar className="mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">لا مواعيد معروضة بعد</p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                أضف مواعيد من قسم المواعيد لعرضها هنا
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-base">آخر المرضى</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Users className="mb-3 h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">لا مرضى مسجلين بعد</p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                ابدأ بإضافة مريض من قسم المرضى
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
