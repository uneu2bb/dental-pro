import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ModulePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[hsl(var(--primary))]">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Card className="medical-card">
        <CardContent className="flex flex-col items-center py-16 text-center">
          <Construction className="mb-3 h-12 w-12 text-muted-foreground/30" />
          <p className="font-medium text-muted-foreground">قيد التطوير المتقدم</p>
          <p className="mt-1 max-w-md text-xs text-muted-foreground/70">
            هذه الوحدة مدرجة في القائمة وجاهزة للربط مع قاعدة البيانات في المرحلة
            التالية من البناء.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
