"use client";

import { useEffect, useState } from "react";
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { formatDateTime, APPOINTMENT_STATUS } from "@/lib/utils";

type Apt = {
  id: string;
  start_time: string;
  end_time?: string;
  status: string;
  notes?: string;
  patients?: { full_name: string; phone?: string } | null;
};

export default function AppointmentsPage() {
  const [items, setItems] = useState<Apt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data, error: err } = await supabase
          .from("appointments")
          .select("id, start_time, end_time, status, notes, patients(full_name, phone)")
          .order("start_time", { ascending: true })
          .limit(50);
        if (err) throw err;
        setItems((data as unknown as Apt[]) || []);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "تعذر التحميل");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">المواعيد</h1>
          <p className="text-sm text-muted-foreground">جدولة وإدارة مواعيد العيادة</p>
        </div>
        <Button className="gap-2 bg-[hsl(var(--teal))]">
          <Plus className="h-4 w-4" />
          موعد جديد
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="text-base">قائمة المواعيد</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center py-12">
              <Calendar className="mb-3 h-12 w-12 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">لا توجد مواعيد بعد</p>
            </div>
          ) : (
            <div className="divide-y">
              {items.map((a) => {
                const st = APPOINTMENT_STATUS[a.status] || {
                  label_ar: a.status,
                  color: "",
                };
                return (
                  <div key={a.id} className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium">
                        {a.patients?.full_name || "مريض"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(a.start_time)}
                      </p>
                    </div>
                    <Badge className={st.color}>{st.label_ar}</Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
