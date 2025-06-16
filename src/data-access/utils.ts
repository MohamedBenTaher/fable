import { db } from "@/db";
import crypto from "crypto";

export async function generateRandomToken(length: number) {
  const buf = await new Promise<Buffer>((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });

  return buf.toString("hex").slice(0, length);
}

export async function createTransaction<T>(
  cb: (trx: typeof db) => Promise<T>
): Promise<T> {
  return await db.transaction(cb);
}
