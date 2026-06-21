"use client";

import { useState, useEffect } from "react";
import { Switch, Label, Card, Skeleton } from "@heroui/react";
import { CheckCircle2 } from "lucide-react";
import { useSettings, useUpdateSettings } from "@/hooks/useAdmin";
import { SystemSettings } from "@/types";

const toggleConfig: { key: keyof SystemSettings; label: string; description: string }[] = [
  {
    key: "maintenanceMode",
    label: "Maintenance Mode",
    description: "Stored for future use — wiring this into proxy.ts would make it actually gate access.",
  },
  {
    key: "allowNewRegistrations",
    label: "Allow New Registrations",
    description: "Stored for future use — the register page doesn't check this flag yet.",
  },
  {
    key: "emailNotifications",
    label: "Email Notifications",
    description: "Controls whether system emails are sent once an email service is wired up.",
  },
];

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const [local, setLocal] = useState<SystemSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings) setLocal(settings);
  }, [settings]);

  const handleToggle = (key: keyof SystemSettings, value: boolean) => {
    if (!local) return;
    setLocal({ ...local, [key]: value });
    setSaved(false);
    updateSettings.mutate({ [key]: value }, { onSuccess: () => setSaved(true) });
  };

  if (isLoading || !local) {
    return (
      <div className="max-w-xl space-y-3">
        <Skeleton className="h-8 w-1/3 rounded-md" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-foreground/70">System-wide configuration.</p>

      <Card variant="default" className="mt-6">
        <Card.Content className="space-y-6">
          {toggleConfig.map((item) => (
            <div key={item.key} className="flex items-start justify-between gap-4">
              <div>
                <Label className="font-medium text-foreground">{item.label}</Label>
                <p className="text-xs text-foreground/50">{item.description}</p>
              </div>
              <Switch isSelected={local[item.key]} onChange={(value) => handleToggle(item.key, value)}>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            </div>
          ))}
        </Card.Content>
      </Card>

      {saved && (
        <p className="mt-3 flex items-center gap-1 text-sm text-success">
          <CheckCircle2 size={16} /> Saved
        </p>
      )}
    </div>
  );
}