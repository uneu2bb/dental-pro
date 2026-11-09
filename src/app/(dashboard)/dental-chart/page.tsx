"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  UPPER_RIGHT,
  UPPER_LEFT,
  LOWER_LEFT,
  LOWER_RIGHT,
  TOOTH_CONDITIONS,
} from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function DentalChartPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [conditions, setConditions] = useState<Record<number, string>>({});

  const setCondition = (tooth: number, condition: string) => {
    setConditions((prev) => ({ ...prev, [tooth]: condition }));
  };

  const Tooth = ({ n }: { n: number }) => {
    const c = conditions[n] || "healthy";
    const meta = TOOTH_CONDITIONS[c] || TOOTH_CONDITIONS.healthy;
    return (
      <button
        type="button"
        onClick={() => setSelected(n)}
        className={cn(
          "flex h-10 w-8 flex-col items-center justify-center rounded-md border text-[10px] font-semibold transition",
          selected === n
            ? "border-[hsl(var(--teal))] ring-2 ring-[hsl(var(--teal))]/30"
            : "border-border hover:border-[hsl(var(--teal))]/50"
        )}
        style={{ backgroundColor: meta.color + "22", color: meta.color }}
        title={`${n} — ${meta.label_ar}`}
      >
        {n}
      </button>
    );
  };

  const Row = ({ teeth }: { teeth: number[] }) => (
    <div className="flex justify-center gap-1">
      {teeth.map((n) => (
        <Tooth key={n} n={n} />
      ))}
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">المخطط السني</h1>
        <p className="text-sm text-muted-foreground">
          ترقيم FDI — اضغط على سن لتسجيل حالته
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="medical-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">الفك العلوي / السفلي</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-center text-xs text-muted-foreground">علوي</p>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-center sm:gap-4">
                <Row teeth={UPPER_RIGHT} />
                <Row teeth={UPPER_LEFT} />
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="mb-2 text-center text-xs text-muted-foreground">سفلي</p>
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-center sm:gap-4">
                <Row teeth={LOWER_RIGHT} />
                <Row teeth={LOWER_LEFT} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-card">
          <CardHeader>
            <CardTitle className="text-base">
              {selected ? `السن ${selected}` : "اختر سناً"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selected ? (
              <p className="text-sm text-muted-foreground">اضغط على أي سن من المخطط</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(TOOTH_CONDITIONS).map(([key, val]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCondition(selected, key)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm transition",
                      conditions[selected] === key
                        ? "border-[hsl(var(--teal))] bg-[hsl(var(--mint))]"
                        : "hover:bg-muted"
                    )}
                  >
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: val.color }}
                    />
                    {val.label_ar}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
