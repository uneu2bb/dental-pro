"use client";

import { useEffect, useState } from "react";
import { Plus, UserX, UserCheck, Trash2, KeyRound, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type UserRow = {
  id: string;
  full_name: string;
  role: string;
  is_active: boolean;
  phone?: string;
  created_at: string;
};

const ROLE_LABELS: Record<string, string> = {
  super_admin: "مدير النظام",
  clinic_admin: "مدير العيادة",
  doctor: "طبيب",
  receptionist: "استقبال",
  accountant: "محاسب",
  assistant: "مساعد",
};

export default function UsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "receptionist",
    phone: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUsers(data.users || []);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : "فشل التحميل");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error || "فشل الإنشاء");
      return;
    }
    setMsg("تم إنشاء الحساب بنجاح");
    setShowForm(false);
    setForm({ full_name: "", email: "", password: "", role: "receptionist", phone: "" });
    load();
  };

  const toggleActive = async (userId: string, is_active: boolean) => {
    setErr("");
    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, is_active }),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error);
      return;
    }
    setMsg(is_active ? "تم تفعيل الحساب" : "تم إيقاف الحساب");
    load();
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الحساب نهائياً؟")) return;
    const res = await fetch(`/api/users?userId=${userId}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error);
      return;
    }
    setMsg("تم حذف الحساب");
    load();
  };

  const updateCredentials = async (userId: string) => {
    setErr("");
    const body: Record<string, string> = { userId };
    if (editForm.email) body.email = editForm.email;
    if (editForm.password) body.password = editForm.password;
    const res = await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      setErr(data.error);
      return;
    }
    setMsg("تم تحديث بيانات الدخول");
    setEditId(null);
    setEditForm({ email: "", password: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">إدارة الحسابات</h1>
          <p className="text-muted-foreground">إنشاء وإيقاف وحذف حسابات موظفي العيادة</p>
        </div>
        <Button className="gap-2" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />
          إنشاء حساب جديد
        </Button>
      </div>

      {msg && (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
          {msg}
        </div>
      )}
      {err && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
          {err}
        </div>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>حساب موظف جديد</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createUser} className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>الاسم الكامل</Label>
                <Input
                  required
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>البريد الإلكتروني</Label>
                <Input
                  type="email"
                  dir="ltr"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>كلمة المرور</Label>
                <Input
                  type="password"
                  dir="ltr"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>الدور</Label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="doctor">طبيب</option>
                  <option value="receptionist">استقبال</option>
                  <option value="accountant">محاسب</option>
                  <option value="assistant">مساعد</option>
                  <option value="clinic_admin">مدير العيادة</option>
                </select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>الهاتف (اختياري)</Label>
                <Input
                  dir="ltr"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit">حفظ الحساب</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <p className="p-6 text-muted-foreground">جاري التحميل...</p>
          ) : users.length === 0 ? (
            <p className="p-6 text-muted-foreground">لا يوجد حسابات بعد</p>
          ) : (
            <div className="divide-y">
              {users.map((u) => (
                <div key={u.id} className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">{u.full_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {ROLE_LABELS[u.role] || u.role}
                        {u.phone ? ` · ${u.phone}` : ""}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={u.is_active ? "success" : "destructive"}>
                        {u.is_active ? "نشط" : "موقوف"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() => toggleActive(u.id, !u.is_active)}
                      >
                        {u.is_active ? (
                          <>
                            <UserX className="h-3.5 w-3.5" /> إيقاف
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-3.5 w-3.5" /> تفعيل
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1"
                        onClick={() =>
                          setEditId(editId === u.id ? null : u.id)
                        }
                      >
                        <KeyRound className="h-3.5 w-3.5" />
                        تعديل الدخول
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-1"
                        onClick={() => deleteUser(u.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        حذف
                      </Button>
                    </div>
                  </div>

                  {editId === u.id && (
                    <div className="mt-4 grid gap-3 rounded-lg border bg-muted/30 p-4 sm:grid-cols-3">
                      <div className="space-y-1">
                        <Label className="flex items-center gap-1 text-xs">
                          <Mail className="h-3 w-3" /> بريد جديد (اختياري)
                        </Label>
                        <Input
                          type="email"
                          dir="ltr"
                          placeholder="new@email.com"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm({ ...editForm, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="flex items-center gap-1 text-xs">
                          <KeyRound className="h-3 w-3" /> كلمة مرور جديدة
                        </Label>
                        <Input
                          type="password"
                          dir="ltr"
                          placeholder="••••••••"
                          value={editForm.password}
                          onChange={(e) =>
                            setEditForm({ ...editForm, password: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex items-end gap-2">
                        <Button size="sm" onClick={() => updateCredentials(u.id)}>
                          حفظ
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditId(null)}
                        >
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
