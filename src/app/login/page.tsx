"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

      // Check if user is suspended
      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_active, role")
          .eq("id", data.user.id)
          .single();

        if (profile && profile.is_active === false) {
          await supabase.auth.signOut();
          throw new Error("هذا الحساب موقوف مؤقتاً. تواصل مع إدارة العيادة.");
        }
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "بيانات الدخول غير صحيحة";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a1628]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-600/15 blur-[100px]" />
      </div>

      <Card className="relative w-full max-w-md border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-2xl font-bold text-white shadow-lg shadow-cyan-500/30">
            D
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">DENTAL PRO</CardTitle>
          <CardDescription className="text-slate-400">
            نظام إدارة عيادات الأسنان الاحترافي
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@clinic.com"
                dir="ltr"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                dir="ltr"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus-visible:ring-cyan-500/50"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-l from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500"
              disabled={loading}
            >
              {loading ? "جاري الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            الحسابات تُنشأ من لوحة التحكم بواسطة المدير فقط
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
