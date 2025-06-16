import "server-only";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { validateRequest } from "@/lib/auth";
import { cache } from "react";
import { AuthenticationError } from "../use-cases/errors";
import { UserId } from "@/use-cases/types";
import { getUser } from "@/data-access/users";

export const getCurrentUser = cache(async () => {
  const session = await validateRequest();
  if (!session.user) {
    return undefined;
  }

  // Get the complete user data from the database
  const fullUser = await getUser(session.user.id);
  return fullUser;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};

export async function setSession(userId: UserId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
