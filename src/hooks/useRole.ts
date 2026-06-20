"use client";

import { useUser } from "@clerk/nextjs";

export type Role = "user" | "admin";

export function useRole(): { role: Role; isLoaded: boolean } {
  const { user, isLoaded } = useUser();
  const role = (user?.publicMetadata?.role as Role | undefined) ?? "user";
  return { role, isLoaded };
}