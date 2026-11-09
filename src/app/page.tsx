import Link from "next/link";
import {
  Calendar,
  Shield,
  Stethoscope,
  Users,
  BarChart3,
  Package,
} from "lucide-react";
import { SecretLogoTrigger } from "@/components/secret-panel-gate";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F4F8FA] text-[#243746]">
      <header className="sticky top-0 z-50 border-b border-[#12304A]/8 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <SecretLogoTrigger className="flex items-center gap-2.5 outline-none">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#12304A] text-sm font-bold text-white">
              D
            </div>
            <span className="font-bold text-[#12304A]">DENTAL PRO</span>
          </SecretLogoTrigger>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm text-[#243746]/70 hover:text-[#12304A]"
            >
              دخول
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-[#159E9C] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#128a88]"
            >
              لوحة التحكم
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#159E9C]/25 bg-[#E8F5F3] px-4 py-1.5 text-xs font-medium text-[#159E9C]">
          <Stethoscope className="h-3.5 w-3.5" />
          نظام طبي لإدارة عيادات الأسنان
        </div>
        <h1 className="text-4xl font-bold leading-tight text-[#12304A] md:text-5xl">
          عيادتك تحت السيطرة
          <br />
          <span className="text-[#159E9C]">بدقة واحتراف</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[#243746]/65">
          المرضى، المواعيد، المخطط السني، الخطط العلاجية، الفواتير والمخزون — منصة
          واحدة بمستوى الأنظمة الطبية العالمية.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-[#12304A] px-7 py-3 text-sm font-semibold text-white"
          >
            دخول النظام
          </Link>
          <a
            href="#features"
            className="rounded-lg border border-[#12304A]/15 bg-white px-7 py-3 text-sm font-medium text-[#12304A]"
          >
            الميزات
          </a>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Users, title: "ملفات المرضى", desc: "ملف طبي كامل مع تاريخ وتاريخ علاجي." },
            { icon: Calendar, title: "المواعيد", desc: "تقويم ذكي يمنع تعارض مواعيد الأطباء." },
            { icon: Stethoscope, title: "مخطط سني", desc: "FDI تفاعلي لكل سن وحالته." },
            { icon: BarChart3, title: "المالية", desc: "فواتير ومدفوعات وتقارير أرباح." },
            { icon: Package, title: "المخزون", desc: "تنبيهات النفاد والصلاحية." },
            { icon: Shield, title: "الصلاحيات", desc: "أدوار متعددة مع إيقاف الحسابات." },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-[#12304A]/8 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#E8F5F3] text-[#159E9C]">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-[#12304A]">{f.title}</h3>
              <p className="mt-1 text-sm text-[#243746]/55">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#12304A]/8 py-8 text-center text-xs text-[#243746]/40">
        © {new Date().getFullYear()} DENTAL PRO
      </footer>
    </div>
  );
}
