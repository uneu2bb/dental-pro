"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { formatCurrency, formatDate, getInitials } from "@/lib/utils";

type Patient = {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  file_number?: string;
  gender?: string;
  date_of_birth?: string;
  address?: string;
  allergies?: string;
  medical_history?: string;
  notes?: string;
  balance?: number;
  status?: string;
  created_at?: string;
};

export default function PatientDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data, error: err } = await supabase
          .from("patients")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        if (err) throw err;
        setPatient(data);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "خطأ");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <div className="h-40 animate-pulse rounded-xl bg-muted" />;
  }

  if (error || !patient) {
    return (
      <div className="space-y-4">
        <Link href="/patients" className="text-sm text-[hsl(var(--teal))]">
          ← العودة للمرضى
        </Link>
        <p className="text-destructive">{error || "المريض غير موجود"}</p>
      </div>
    );
  }

  const fields = [
    { label: "رقم الملف", value: patient.file_number },
    { label: "الهاتف", value: patient.phone },
    { label: "البريد", value: patient.email },
    { label: "الجنس", value: patient.gender === "male" ? "ذكر" : patient.gender === "female" ? "أنثى" : patient.gender },
    { label: "تاريخ الميلاد", value: patient.date_of_birth ? formatDate(patient.date_of_birth) : null },
    { label: "العنوان", value: patient.address },
    { label: "الحساسية", value: patient.allergies },
    { label: "تاريخ طبي", value: patient.medical_history },
    { label: "ملاحظات", value: patient.notes },
    { label: "تاريخ التسجيل", value: patient.created_at ? formatDate(patient.created_at) : null },
  ];

  return (
    <div className="space-y-5">
      <Link
        href="/patients"
        className="inline-flex items-center gap-1 text-sm text-[hsl(var(--teal))] hover:underline"
      >
        <ArrowRight className="h-4 w-4" />
        المرضى
      </Link>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--mint))] text-lg font-bold text-[hsl(var(--teal))]">
          {getInitials(patient.full_name)}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">
            {patient.full_name}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Badge variant="success">{patient.status || "active"}</Badge>
            {(patient.balance || 0) > 0 && (
              <span className="text-sm text-amber-600">
                متبقي: {formatCurrency(patient.balance || 0)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-base">البيانات الشخصية والطبية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {fields.map((f) =>
              f.value ? (
                <div key={f.label} className="flex justify-between gap-4 text-sm">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="text-left font-medium">{f.value}</span>
                </div>
              ) : null
            )}
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-base">الجدول الزمني</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              ستظهر هنا الزيارات والعلاجات والفواتير المرتبطة بهذا المريض عند
              تسجيلها.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
