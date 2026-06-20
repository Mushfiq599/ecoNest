"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { TextField, Label, Input, Button, Card, Skeleton } from "@heroui/react";
import { CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isLoaded) {
    return (
      <div className="max-w-xl space-y-4">
        <Skeleton className="h-8 w-1/3 rounded-md" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    );
  }

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaved(false);
    await user.update({ firstName, lastName });
    setIsSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      <p className="text-foreground/70">Manage your personal information.</p>

      <Card variant="default" className="mt-6">
        <Card.Content className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-xl font-semibold text-accent-foreground">
              {firstName?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <p className="font-medium text-foreground">{user?.fullName ?? "Your name"}</p>
              <p className="text-sm text-foreground/60">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField>
              <Label>First name</Label>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </TextField>
            <TextField>
              <Label>Last name</Label>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </TextField>
          </div>

          <TextField isDisabled>
            <Label>Email</Label>
            <Input value={user?.primaryEmailAddress?.emailAddress ?? ""} />
          </TextField>
          <p className="text-xs text-foreground/50">
            Email changes require verification — managed through your account security settings.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Button variant="primary" isPending={isSaving} onPress={handleSave}>
              Save Changes
            </Button>
            {saved && (
              <span className="flex items-center gap-1 text-sm text-success">
                <CheckCircle2 size={16} /> Saved
              </span>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}