import { db } from "@/db";
import { User, accounts, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { UserId } from "@/use-cases/types";
import { getAccountByUserId } from "@/data-access/accounts";
import { hashPassword } from "@/lib/password";

const ITERATIONS = 10000;
// const MAGIC_LINK_TOKEN_TTL = 1000 * 60 * 5; // 5 min

export async function deleteUser(userId: UserId) {
  await db.delete(users).where(eq(users.id, userId));
}

export async function getUser(userId: UserId) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user;
}

export async function createUser(email: string) {
  console.log("createUser: Start");

  const [user] = await db
    .insert(users)
    .values({
      email: email, // Ensure the email field is correctly assigned
    })
    .returning();

  console.log("createUser: End", user);
  return user;
}

export async function createMagicUser(email: string) {
  const [user] = await db
    .insert(users)
    .values({
      email,
      emailVerified: new Date(),
    })
    .returning();

  await db
    .insert(accounts)
    .values({
      userId: user.id,
      accountType: "email",
    })
    .returning();

  return user;
}

export async function verifyPassword(email: string, plainTextPassword: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    console.log("verifyPassword: User not found");
    return false;
  }

  const account = await getAccountByUserId(user.id);

  if (!account) {
    console.log("verifyPassword: Account not found");
    return false;
  }

  // Check if account type is email
  if (account.accountType !== "email") {
    console.log("verifyPassword: Account is not email type");
    return false;
  }

  const salt = account.salt;
  const savedPassword = account.password;

  if (!salt || !savedPassword) {
    console.log("verifyPassword: Missing salt or password");
    return false;
  }

  const hash = await hashPassword(plainTextPassword, salt);
  const isValid = account.password === hash;
  console.log("verifyPassword: Password verification result:", isValid);
  return isValid;
}

export async function getUserByEmail(email: string) {
  console.log("getUserByEmail: Start");

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    console.log("getUserByEmail: End", user);
    return user;
  } catch (error) {
    console.error("getUserByEmail: Error", error);
    throw error;
  }
}

export async function getMagicUserAccountByEmail(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function setEmailVerified(userId: UserId) {
  await db
    .update(users)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(users.id, userId));
}

export async function updateUser(userId: UserId, updatedUser: Partial<User>) {
  await db.update(users).set(updatedUser).where(eq(users.id, userId));
}
