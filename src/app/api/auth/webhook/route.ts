import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "CLERK_WEBHOOK_SECRET is not set" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.text();
  const wh = new Webhook(WEBHOOK_SECRET);

  let event: any;
  try {
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const eventType = event.type as string;
  const data = event.data;

  if (eventType === "user.created" || eventType === "user.updated" || eventType === "user.deleted") {
    const primaryEmail = data.email_addresses?.find(
      (e: any) => e.id === data.primary_email_address_id
    )?.email_address;

    await fetch(`${process.env.BACKEND_INTERNAL_URL}/api/users/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": process.env.INTERNAL_API_SECRET ?? "",
      },
      body: JSON.stringify({
        clerkId: data.id,
        email: primaryEmail ?? data.email,
        name: [data.first_name, data.last_name].filter(Boolean).join(" "),
        imageUrl: data.image_url,
        eventType,
      }),
    });
  }

  return NextResponse.json({ received: true });
}