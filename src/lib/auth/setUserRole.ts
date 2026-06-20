import { clerkClient } from "@clerk/nextjs/server";

export async function setUserRole(userId: string, role: "user" | "admin") {
  const client = await clerkClient();
  await client.users.updateUserMetadata(userId, { publicMetadata: { role } });
}