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
  const [mode, setMode] = useState<"login" | "register">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      if (mode === "login") {
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (authError) throw authError;
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (authError) throw authError;

        // Create profile + clinic for new user (first admin)
        if (data.user) {
          const clinicName = "عيادتي";
          const slug = `clinic-${data.user.id.slice(0, 8)}`;

          const { data: clinic, error: clinicError } = await supabase
            .from("clinics")
            .insert({ name: clinicName, slug, currency: "USD", timezone: "Asia/Damascus" })
            .select("id")
            .single();

          if (!clinicError && clinic) {
            await supabase.from("profiles").insert({
              id: data.user.id,
              clinic_id: clinic.id,
              full_name: email.split("@")[0],
              role: "clinic_admin",
            });

            await supabase.from("clinic_settings").insert({
              clinic_id: clinic.id,
            });
          }
        }
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "حدث خطأ، حاول مرة أخرى";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-medical-50 to-medical-100 dark:from-background dark:to-muted p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl font-bold">
            D
          </div>
          <CardTitle className="text-2xl">DENTAL PRO</CardTitle>
          <CardDescription>نظام إدارة عيادات الأسنان المتقدم</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@clinic.com"
                dir="ltr"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                dir="ltr"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "جاري المعالجة..."
                : mode === "login"
                ? "تسجيل الدخول"
                : "إنشاء حساب"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                ليس لديك حساب؟{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => {
                    setMode("register");
                    setError("");
                  }}
                >
                  سجّل الآن
                </button>
              </>
            ) : (
              <>
                لديك حساب؟{" "}
                <button
                  type="button"
                  className="text-primary font-medium hover:underline"
                  onClick={() => {
                    setMode("login");
                    setError("");
                  }}
                >
                  تسجيل الدخول
                </button>
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
