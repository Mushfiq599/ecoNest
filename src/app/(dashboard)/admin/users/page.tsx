"use client";

import { useState } from "react";
import { Input, TextField, Select, Label, ListBox, Skeleton, Card } from "@heroui/react";
import { Search } from "lucide-react";
import { useAdminUsers, useUpdateUserRole, useDeleteUser } from "@/hooks/useAdminUsers";
import { useDebounce } from "@/hooks/useDebounce";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";

const roleOptions = [
  { id: "all", label: "All Roles" },
  { id: "user", label: "User" },
  { id: "admin", label: "Admin" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useAdminUsers({ search: debouncedSearch, role });
  const updateRole = useUpdateUserRole();
  const deleteUser = useDeleteUser();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Users</h1>
      <p className="text-foreground/70">Manage roles and accounts.</p>

      <div className="mt-6 flex flex-wrap gap-4">
        <TextField className="w-64" aria-label="Search users">
          <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </TextField>
        <Select className="w-40" placeholder="Role" selectedKey={role} onSelectionChange={(key) => setRole(key as string)}>
          <Label className="sr-only">Role</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {roleOptions.map((r) => (
                <ListBox.Item key={r.id} id={r.id} textValue={r.label}>{r.label}</ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      <Card variant="default" className="mt-6">
        <Card.Content className="overflow-x-auto p-0">
          {isLoading ? (
            <div className="space-y-2 p-4">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)}
            </div>
          ) : !data || data.data.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <Search className="text-foreground/40" size={28} />
              <p className="text-sm text-foreground/60">No users match your filters</p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-foreground/60">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((u) => (
                  <tr key={u._id} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-3 text-foreground">{u.name || "—"}</td>
                    <td className="px-4 py-3 text-foreground/70">{u.email}</td>
                    <td className="px-4 py-3">
                      <Select
  selectedKey={u.role}
  onSelectionChange={(key) => updateRole.mutate({ id: u._id, role: key as "user" | "admin" })}
>
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="user" textValue="User">User</ListBox.Item>
                            <ListBox.Item id="admin" textValue="Admin">Admin</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-foreground/60">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <ConfirmDeleteModal
                        itemName={u.name || u.email}
                        isPending={deleteUser.isPending}
                        onConfirm={(close) => deleteUser.mutate(u._id, { onSuccess: close })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}