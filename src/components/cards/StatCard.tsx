import { Card } from "@heroui/react";
import { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card variant="secondary">
      <Card.Content className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs text-foreground/60">{label}</p>
          <p className="text-xl font-semibold text-foreground">{value}</p>
          {hint && <p className="text-xs text-foreground/50">{hint}</p>}
        </div>
      </Card.Content>
    </Card>
  );
}