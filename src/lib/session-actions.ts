"use server";

import { getCurrentUser } from "@/lib/session";

export async function getCurrentUserAction() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}
