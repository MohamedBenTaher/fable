import crypto from "crypto";

const ITERATIONS = 10000;

export async function hashPassword(plainTextPassword: string, salt: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      ITERATIONS,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString("hex"));
      }
    );
  });
}

export function generateSalt(): string {
  return crypto.randomBytes(128).toString("base64");
}
