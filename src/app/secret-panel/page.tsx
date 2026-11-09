"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  isPanelUnlocked,
  lockPanel,
  getPanelPassword,
  setPanelPassword,
  verifyPanelPassword,
} from "@/lib/secret-panel";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Settings,
  LogOut,
  KeyRound,
  Shield,
} from "lucide-react";

export default function SecretPanelPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const [showChange, setShowChange] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const ok = isPanelUnlocked();
    setAllowed(ok);
    setReady(true);
    if (!ok) router.replace("/");
  }, [router]);

  const handleLogout = () => {
    lockPanel();
    router.push("/");
  };

  const handleChangePw = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    if (!verifyPanelPassword(current)) {
      setErr("كلمة السر الحالية غير صحيحة");
      return;
    }
    if (next.length < 4) {
      setErr("الحد الأدنى 4 أحرف");
      return;
    }
    if (next !== confirm) {
      setErr("التأكيد غير مطابق");
      return;
    }
    setPanelPassword(next);
    setMsg("تم تحديث كلمة سر اللوحة المخفية");
    setCurrent("");
    setNext("");
    setConfirm("");
    setShowChange(false);
  };

  if (!ready || !allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white/40">
        جاري التحقق...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/5 bg-black/60 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gold-gradient text-xs font-bold text-black">
              D
            </div>
            <div>
              <p className="text-sm font-bold">لوحة التحكم المخفية</p>
              <p className="text-[10px] text-white/35">وصول سري — جلسة مؤقتة</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            إغلاق القفل
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-4 py-8">
        <div className="glass-card flex items-start gap-3 p-4">
          <Shield className="mt-0.5 h-5 w-5 text-amber-400" />
          <div>
            <p className="font-medium">تم فتح اللوحة المخفية</p>
            <p className="mt-1 text-sm text-white/45">
              كلمة السر الافتراضية كانت 0000 — يمكنك تغييرها من هنا. هذه الجلسة
              تبقى مفتوحة حتى تغلق المتصفح أو تضغط «إغلاق القفل».
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/login"
            className="glass-card flex items-center gap-3 p-4 transition hover:border-amber-500/40"
          >
            <LayoutDashboard className="h-5 w-5 text-amber-400" />
            <div>
              <p className="font-medium">دخول النظام</p>
              <p className="text-xs text-white/40">صفحة تسجيل الدخول العادية</p>
            </div>
          </Link>
          <Link
            href="/dashboard"
            className="glass-card flex items-center gap-3 p-4 transition hover:border-amber-500/40"
          >
            <Users className="h-5 w-5 text-amber-400" />
            <div>
              <p className="font-medium">لوحة العيادة</p>
              <p className="text-xs text-white/40">يتطلب تسجيل دخول Supabase</p>
            </div>
          </Link>
          <Link
            href="/users"
            className="glass-card flex items-center gap-3 p-4 transition hover:border-amber-500/40"
          >
            <UserCog className="h-5 w-5 text-amber-400" />
            <div>
              <p className="font-medium">إدارة الحسابات</p>
              <p className="text-xs text-white/40">إنشاء / إيقاف / حذف مستخدمين</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setShowChange(!showChange)}
            className="glass-card flex items-center gap-3 p-4 text-right transition hover:border-amber-500/40"
          >
            <KeyRound className="h-5 w-5 text-amber-400" />
            <div>
              <p className="font-medium">تغيير كلمة سر اللوحة</p>
              <p className="text-xs text-white/40">الحالية محفوظة على هذا الجهاز</p>
            </div>
          </button>
        </div>

        {msg && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {msg}
          </div>
        )}

        {showChange && (
          <form onSubmit={handleChangePw} className="glass-card space-y-3 p-5">
            <h3 className="font-semibold">تغيير كلمة سر اللوحة المخفية</h3>
            <input
              type="password"
              placeholder="كلمة السر الحالية"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-center text-white outline-none focus:border-amber-500/50"
              dir="ltr"
              required
            />
            <input
              type="password"
              placeholder="كلمة السر الجديدة"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-center text-white outline-none focus:border-amber-500/50"
              dir="ltr"
              required
              minLength={4}
            />
            <input
              type="password"
              placeholder="تأكيد الجديدة"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-center text-white outline-none focus:border-amber-500/50"
              dir="ltr"
              required
            />
            {err && <p className="text-sm text-red-400">{err}</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-xl gold-gradient px-5 py-2 text-sm font-bold text-black"
              >
                حفظ
              </button>
              <button
                type="button"
                onClick={() => setShowChange(false)}
                className="rounded-xl border border-white/10 px-5 py-2 text-sm text-white/50"
              >
                إلغاء
              </button>
            </div>
            <p className="text-[11px] text-white/30">
              تلميح: الافتراضي 0000 إن لم تغيّرها من قبل على هذا المتصفح.
            </p>
          </form>
        )}

        <p className="text-center text-xs text-white/25">
          للفتح مجدداً: 5 ضغطات متتالية على شعار الموقع
        </p>
      </main>
    </div>
  );
}
