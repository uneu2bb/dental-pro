"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  setPanelPassword,
  unlockPanel,
  verifyPanelPassword,
  isPanelUnlocked,
} from "@/lib/secret-panel";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function SecretLogoTrigger({ children, className }: Props) {
  const router = useRouter();
  const clicks = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"enter" | "change">("enter");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const resetClicks = useCallback(() => {
    clicks.current = 0;
  }, []);

  const onLogoClick = () => {
    clicks.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(resetClicks, 2500);

    if (clicks.current >= 5) {
      clicks.current = 0;
      if (timer.current) clearTimeout(timer.current);
      if (isPanelUnlocked()) {
        router.push("/secret-panel");
        return;
      }
      setOpen(true);
      setMode("enter");
      setPassword("");
      setError("");
    }
  };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleEnter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyPanelPassword(password)) {
      setError("كلمة السر غير صحيحة");
      return;
    }
    unlockPanel();
    setOpen(false);
    router.push("/secret-panel");
  };

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyPanelPassword(password)) {
      setError("كلمة السر الحالية غير صحيحة");
      return;
    }
    if (newPw.length < 4) {
      setError("كلمة السر الجديدة يجب أن تكون 4 أحرف على الأقل");
      return;
    }
    if (newPw !== confirmPw) {
      setError("كلمتا السر غير متطابقتين");
      return;
    }
    setPanelPassword(newPw);
    setMode("enter");
    setPassword("");
    setNewPw("");
    setConfirmPw("");
    setError("");
    alert("تم تغيير كلمة سر لوحة التحكم بنجاح");
  };

  return (
    <>
      <button type="button" onClick={onLogoClick} className={className}>
        {children}
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-amber-500/30 bg-[#0c0c0c] p-6 shadow-2xl shadow-amber-500/10">
            <h2 className="mb-1 text-center text-lg font-bold text-white">
              لوحة التحكم المخفية
            </h2>
            <p className="mb-5 text-center text-xs text-white/40">
              أدخل كلمة السر للمتابعة
            </p>

            {mode === "enter" ? (
              <form onSubmit={handleEnter} className="space-y-3">
                <input
                  type="password"
                  inputMode="numeric"
                  autoFocus
                  placeholder="كلمة السر"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-center text-lg tracking-widest text-white outline-none focus:border-amber-500/50"
                  dir="ltr"
                />
                {error && (
                  <p className="text-center text-sm text-red-400">{error}</p>
                )}
                <button
                  type="submit"
                  className="h-11 w-full rounded-xl gold-gradient font-bold text-black"
                >
                  دخول
                </button>
                <button
                  type="button"
                  className="w-full text-xs text-white/40 hover:text-amber-300"
                  onClick={() => {
                    setMode("change");
                    setError("");
                    setPassword("");
                  }}
                >
                  تغيير كلمة السر
                </button>
                <button
                  type="button"
                  className="w-full text-xs text-white/25 hover:text-white/50"
                  onClick={() => setOpen(false)}
                >
                  إلغاء
                </button>
              </form>
            ) : (
              <form onSubmit={handleChange} className="space-y-3">
                <input
                  type="password"
                  placeholder="كلمة السر الحالية"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-center text-white outline-none focus:border-amber-500/50"
                  dir="ltr"
                />
                <input
                  type="password"
                  placeholder="كلمة السر الجديدة"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-center text-white outline-none focus:border-amber-500/50"
                  dir="ltr"
                />
                <input
                  type="password"
                  placeholder="تأكيد كلمة السر الجديدة"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  className="h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-center text-white outline-none focus:border-amber-500/50"
                  dir="ltr"
                />
                {error && (
                  <p className="text-center text-sm text-red-400">{error}</p>
                )}
                <button
                  type="submit"
                  className="h-11 w-full rounded-xl gold-gradient font-bold text-black"
                >
                  حفظ كلمة السر
                </button>
                <button
                  type="button"
                  className="w-full text-xs text-white/40"
                  onClick={() => {
                    setMode("enter");
                    setError("");
                  }}
                >
                  رجوع
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
