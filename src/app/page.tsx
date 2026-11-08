import Link from "next/link";
import { Calendar, Shield, Stethoscope, Users, BarChart3, Package } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gold-gradient text-sm font-bold text-black">
              D
            </div>
            <span className="text-lg font-bold tracking-tight">DENTAL PRO</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <a href="#features" className="hover:text-[#e8c547]">الميزات</a>
            <a href="#about" className="hover:text-[#e8c547]">عن النظام</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm text-white/80 hover:text-white"
            >
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

      {/* Hero */}
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
            عيادتك تحت السيطرة{