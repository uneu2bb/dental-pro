import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserPlus,
  Calendar,
  CalendarCheck,
  CalendarX,
  Stethoscope,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Activity,
} from "lucide-react";

const stats = [
  { title: "إجمالي المرضى", value: "1,248", change: "+12%", icon: Users, color: "text-blue-600" },
  { title: "مرضى جدد هذا الشهر", value: "87", change: "+23%", icon: UserPlus, color: "text-emerald-600" },
  { title: "مواعيد اليوم", value: "24", change: "8 مكتملة", icon: Calendar, color: "text-indigo-600" },
  { title: "المواعيد القادمة", value: "56", change: "خلال 7 أيام", icon: CalendarCheck, color: "text-cyan-600" },
  { title: "مواعيد ملغاة", value: "5", change: "هذا الأسبوع", icon: CalendarX, color: "text-rose-600" },
  { title: "علاجات منجزة", value: "312", change: "هذا الشهر", icon: Stethoscope, color: "text-violet-600" },
  { title: "إيرادات اليوم", value: "$1,850", change: "+8%", icon: DollarSign, color: "text-green-600" },
  { title: "إيرادات الشهر", value: "$28,400", change: "+15%", icon: TrendingUp, color: "text-teal-600" },
  { title: "المبالغ المتبقية", value: "$4,320", change: "12 مريض", icon: AlertCircle, color: "text-amber-600" },
  { title: "صافي الأرباح", value: "$19,870", change: "بعد المصاريف", icon: Activity, color: "text-sky-600" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">لوحة التحكم</h1>
        <p className="text-muted-foreground">نظرة عامة على أداء العيادة اليوم</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>آخر المواعيد</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { patient: "محمد العلي", time: "09:00", treatment: "تنظيف أسنان", status: "مكتمل" },
                { patient: "سارة خالد", time: "10:30", treatment: "حشوة", status: "جاري" },
                { patient: "أحمد يوسف", time: "11:45", treatment: "فحص", status: "مؤكد" },
                { patient: "نور حسن", time: "14:00", treatment: "تبييض", status: "قيد الانتظار" },
              ].map((apt, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{apt.patient}</p>
                    <p className="text-sm text-muted-foreground">{apt.treatment}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{apt.time}</p>
                    <span className="text-xs text-muted-foreground">{apt.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>آخر المرضى المسجلين</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "ليلى محمود", phone: "0944 123 456", date: "اليوم" },
                { name: "كريم سعد", phone: "0933 987 654", date: "أمس" },
                { name: "هبة فادي", phone: "0955 456 789", date: "منذ يومين" },
                { name: "عمر رامي", phone: "0966 321 654", date: "منذ 3 أيام" },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {p.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-muted-foreground">{p.phone}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{p.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
