"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, getInitials } from "@/lib/utils";

const mockPatients = [
  { id: "1", file_number: "P-00124", full_name: "محمد أحمد العلي", phone: "0944123456", balance: 450, status: "active" },
  { id: "2", file_number: "P-00125", full_name: "سارة خالد محمود", phone: "0933987654", balance: 0, status: "active" },
  { id: "3", file_number: "P-00126", full_name: "أحمد يوسف حسن", phone: "0955456789", balance: 1200, status: "active" },
  { id: "4", file_number: "P-00127", full_name: "نور فادي الخطيب", phone: "0966321654", balance: 0, status: "active" },
  { id: "5", file_number: "P-00128", full_name: "ليلى محمود سعيد", phone: "0944789123", balance: 320, status: "active" },
];

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockPatients.filter(
    (p) => p.full_name.includes(search) || p.phone.includes(search) || p.file_number.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">إدارة المرضى</h1>
          <p className="text-muted-foreground">إجمالي {mockPatients.length} مريض مسجل</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" />إضافة مريض جديد</Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="بحث بالاسم أو رقم الهاتف..." className="pr-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filtered.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {getInitials(patient.full_name)}
                  </div>
                  <div>
                    <p className="font-medium">{patient.full_name}</p>
                    <p className="text-sm text-muted-foreground font-mono">{patient.file_number} · <span dir="ltr">{patient.phone}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {patient.balance > 0 && (
                    <span className="font-medium text-amber-600">{formatCurrency(patient.balance)}</span>
                  )}
                  <Badge variant="success">نشط</Badge>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/patients/${patient.id}`}><Eye className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
