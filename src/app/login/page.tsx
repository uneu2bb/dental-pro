"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SecretLogoTrigger } from "@/components/secret-panel-gate";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (authError) throw authError;

      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_active")
          .eq("id", data.user.id)
          .maybeSingle();
        if (profile && profile.is_active === false) {
          await supabase.auth.signOut();
          throw new Error("هذا الحساب موقوف مؤقتاً.");
        }
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "بيانات الدخول غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-[hsl(var(--primary))] p-10 text-white lg:flex">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--teal))] text-lg font-bold">
            D
          </div>
          <h2 className="mt-8 text-3xl font-bold leading-tight">
            نظام إدارة
            <br />
            عيادات الأسنان
          </h2>
          <p className="mt-4 max-w-sm text-sm text-white/70">
            منصة طبية متكاملة للمرضى والمواعيد والعلاجات والفواتير والمخزون.
          </p>
        </div>
        <p className="text-xs text-white/40">DENTAL PRO © {new Date().getFullYear()}</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-background px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:text-right">
            <SecretLogoTrigger className="mx-auto mb-4 inline-flex lg:mx-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--primary))] text-lg font-bold text-white lg:hidden">
                D
              </div>
            </SecretLogoTrigger>
            <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">تسجيل الدخول</h1>
            <p className="mt-1 text-sm text-muted-foreground">حسابات الموظفين فقط</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                dir="ltr"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@clinic.com"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                dir="ltr"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[hsl(var(--teal))] hover:bg-[hsl(var(--teal))]/90"
            >
              {loading ? "جاري الدخول..." : "دخول"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <Link href="/" className="hover:text-[hsl(var(--teal))]">
              العودة للرئيسية
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
