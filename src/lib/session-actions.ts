"use server";

import { getCurrentUser } from "@/lib/session";

export async function getCurrentUserAction() {
  return await getCurrentUser();
}
