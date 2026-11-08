import Link from "next/link";
import { Calendar, Shield, Stethoscope, Users, BarChart3, Package } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gold-gradient text-sm font-bold text-black">
              D
            </div>
            <span className="text-lg font-bold tracking-tight">DENTAL PRO</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#features" className="hover:text-[#e8c547]">
              الميزات
            </a>
            <a href="#about" className="hover:text-[#e8c547]">
              عن النظام
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className="rounded-full px-4 py-2 text-sm text-white/80 hover:text-white">
              دخول
            </Link>
            <Link
              href="/login"
              className="rounded-full gold-gradient px-5 py-2 text-sm font-semibold text-black shadow-lg shadow-amber-500/20"
            >
              لوحة التحكم
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-20 pt-16 md:pt-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs text-amber-200">
            <Stethoscope className="h-3.5 w-3.5" />
            نظام إدارة عيادات الأسنان الاحترافي
          </div>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            عيادتك تحت السيطرة
            <br />
            <span className="gold-text">بضغطة زر</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 md:text-lg">
            إدارة المرضى والمواعيد والعلاجات والفواتير والمخزون من شاشة واحدة.
            نظام طبي فاخر بمستوى البرامج العالمية.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full gold-gradient px-8 py-3 text-sm font-bold text-black shadow-xl shadow-amber-500/25"
            >
              دخول لوحة التحكم
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-3 text-sm text-white/80 hover:border-amber-500/40 hover:text-amber-200"
            >
              استكشف الميزات
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
          كل شغلك في <span className="gold-text">مكان واحد</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Users,
              title: "إدارة المرضى",
              desc: "ملفات كاملة، تاريخ علاجي، مخطط أسنان تفاعلي.",
            },
            {
              icon: Calendar,
              title: "المواعيد بدون تضارب",
              desc: "تقويم ذكي يمنع تعارض مواعيد الأطباء.",
            },
            {
              icon: Stethoscope,
              title: "خطط علاجية",
              desc: "متابعة التقدم والدفعات الجزئية بسهولة.",
            },
            {
              icon: BarChart3,
              title: "فواتير وأرباح",
              desc: "فواتير، مدفوعات، وتقارير يومية وشهرية.",
            },
            {
              icon: Package,
              title: "المخزون",
              desc: "تنبيهات النفاد وتتبع الاستهلاك.",
            },
            {
              icon: Shield,
              title: "صلاحيات الفريق",
              desc: "حسابات منفصلة مع إيقاف أو حذف فوري.",
            },
          ].map((f) => (
            <div key={f.title} className="glass-card p-6 transition hover:border-amber-500/50">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-semibold">{f.title}</h3>
              <p className="text-sm text-white/50">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="border-t border-white/5 px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold">جاهز لإدارة عيادتك؟</h2>
          <p className="mb-8 text-white/55">
            ادخل بحساب المدير وابدأ بإضافة المرضى والمواعيد والموظفين.
          </p>
          <Link
            href="/login"
            className="inline-flex rounded-full gold-gradient px-8 py-3 text-sm font-bold text-black"
          >
            تسجيل الدخول
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/35">
        © {new Date().getFullYear()} DENTAL PRO — نظام إدارة عيادات الأسنان
      </footer>
    </div>
  );
}
