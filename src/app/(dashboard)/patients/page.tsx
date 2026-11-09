"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Search, Eye, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, getInitials } from "@/lib/utils";

type Patient = {
  id: string;
  file_number?: string;
  full_name: string;
  phone: string;
  email?: string;
  balance?: number;
  status?: string;
  created_at?: string;
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    gender: "",
    date_of_birth: "",
    address: "",
    allergies: "",
    medical_history: "",
    notes: "",
  });

  const load = useCallback(async (q = "") => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/patients${q ? `?q=${encodeURIComponent(q)}` : ""}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل التحميل");
      setPatients(data.patients || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "خطأ");
      setPatients([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const t = setTimeout(() => load(search), 300);
    return () => clearTimeout(t);
  }, [search, load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "فشل الحفظ");
      setShowForm(false);
      setForm({
        full_name: "",
        phone: "",
        email: "",
        gender: "",
        date_of_birth: "",
        address: "",
        allergies: "",
        medical_history: "",
        notes: "",
      });
      load(search);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "فشل الحفظ");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--primary))]">
            المرضى
          </h1>
          <p className="text-sm text-muted-foreground">
            {loading ? "..." : `${patients.length} مريض`}
          </p>
        </div>
        <Button
          className="gap-2 bg-[hsl(var(--teal))] hover:bg-[hsl(var(--teal))]/90"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-4 w-4" />
          مريض جديد
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {showForm && (
        <Card className="medical-card">
          <CardContent className="pt-6">
            <form onSubmit={handleCreate} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label>الاسم الكامل *</Label>
                <Input
                  required
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>الهاتف *</Label>
                <Input
                  required
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>البريد</Label>
                <Input
                  type="email"
                  dir="ltr"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>الجنس</Label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="">—</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>تاريخ الميلاد</Label>
                <Input
                  type="date"
                  dir="ltr"
                  value={form.date_of_birth}
                  onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>العنوان</Label>
                <Input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>الحساسية</Label>
                <Input
                  value={form.allergies}
                  onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label>تاريخ طبي</Label>
                <Input
                  value={form.medical_history}
                  onChange={(e) =>
                    setForm({ ...form, medical_history: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label>ملاحظات</Label>
                <Input
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit" disabled={saving} className="bg-[hsl(var(--teal))]">
                  {saving ? "جاري الحفظ..." : "حفظ المريض"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="medical-card">
        <CardContent className="pt-4">
          <div className="relative mb-4">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="بحث بالاسم أو الهاتف أو رقم الملف..."
              className="pr-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : patients.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <Users className="mb-3 h-12 w-12 text-muted-foreground/30" />
              <p className="font-medium text-muted-foreground">لا يوجد مرضى</p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                اضغط «مريض جديد» لإضافة أول ملف
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {patients.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--mint))] text-sm font-semibold text-[hsl(var(--teal))]">
                      {getInitials(p.full_name)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium">{p.full_name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {p.file_number || "—"} ·{" "}
                        <span dir="ltr">{p.phone}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {(p.balance || 0) > 0 && (
                      <span className="text-xs font-medium text-amber-600">
                        {formatCurrency(p.balance || 0)}
                      </span>
                    )}
                    <Badge variant={p.status === "active" ? "success" : "secondary"}>
                      {p.status === "active" ? "نشط" : p.status || "—"}
                    </Badge>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/patients/${p.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
