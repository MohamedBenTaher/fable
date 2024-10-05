import {
  integer,
  text,
  pgTableCreator,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";

export const accountTypeEnum = ["email", "google", "github"] as const;
export enum UploadStatus {
  Pending = "pending",
  Processing = "processing",
  Complete = "complete",
  Failed = "failed",
}

function enumToArray(enumObj: any): string[] {
  return Object.values(enumObj).filter((value) => typeof value === "string");
}
function enumToTuple(enumObj: any): [string, ...string[]] {
  const array = enumToArray(enumObj);
  if (array.length === 0) {
    throw new Error("Enum must have at least one value");
  }
  return array as [string, ...string[]];
}

const pgTable = pgTableCreator((name) => `app_${name}`);

export const users = pgTable("user", {
  id: serial("id").primaryKey(),
  role: text("role").$default(() => "user"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("email_verified"),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  accountType: text("account_type", { enum: accountTypeEnum }).notNull(),
  githubId: text("github_id").unique(),
  googleId: text("google_id").unique(),
  password: text("password"),
  salt: text("salt"),
});

export const magicLinks = pgTable("magic_links", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  token: text("token"),
  tokenExpiresAt: timestamp("token_expires_at").notNull(),
});

export const resetTokens = pgTable("reset_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  token: text("token"),
  tokenExpiresAt: timestamp("token_expires_at").notNull(),
});

export const verifyEmailTokens = pgTable("verify_email_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  token: text("token"),
  tokenExpiresAt: timestamp("token_expires_at").notNull(),
});

export const profiles = pgTable("profile", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  displayName: text("display_name"),
  country: text("country"),
  imageId: text("image_id"),
  image: text("image"),
  bio: text("bio").notNull().default(""),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  status: text("status", { enum: enumToTuple(UploadStatus) }).notNull(),
  key: text("key").notNull(),
  url: text("url").notNull(),
  fileName: text("file_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull(),
});

export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type MagicLink = typeof magicLinks.$inferSelect;
export type ResetToken = typeof resetTokens.$inferSelect;
export type VerifyEmailToken = typeof verifyEmailTokens.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type File = typeof files.$inferSelect;
export type UploadStatusType = UploadStatus;
