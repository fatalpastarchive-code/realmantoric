"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function approveApplication(userId: string, klan: string) {
  const { sessionClaims } = await auth();
  
  // Only admins (or specific rules) can approve
  // In a real application, admin check should be done here
  
  const client = await clerkClient();
  
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      status: "approved",
      klan: klan,
      onboardedAt: new Date().toISOString()
    }
  });

  revalidatePath("/admin/applications");
  revalidatePath("/home");
}

export async function denyApplication(userId: string, reason: string) {
  const client = await clerkClient();
  
  await client.users.updateUserMetadata(userId, {
    publicMetadata: {
      status: "denied",
      denialReason: reason,
      deniedAt: new Date().toISOString()
    }
  });

  revalidatePath("/admin/applications");
}
